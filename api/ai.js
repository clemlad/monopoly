export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, max_tokens } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'invalid body' });

  const prompt = messages.map(m => m.content).join('\n');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: max_tokens || 1000 }
      })
    }
  );

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Retourne le même format qu'Anthropic pour ne pas toucher au reste du code
  res.status(200).json({ content: [{ text }] });
}
