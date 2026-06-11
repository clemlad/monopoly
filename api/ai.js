export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, max_tokens, json_mode } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'invalid body' });

  // Convert Anthropic-style messages to Gemini multi-turn format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
  }));

  const generationConfig = {
    maxOutputTokens: max_tokens || 1000,
    temperature: 0.7,
  };

  // Force JSON output when the caller needs it (botInitiateTrade)
  if (json_mode) {
    generationConfig.responseMimeType = 'application/json';
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents, generationConfig })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Gemini API error', detail: data });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Return Anthropic-compatible format so frontend code doesn't need changes
    res.status(200).json({ content: [{ type: 'text', text }] });
  } catch (e) {
    console.error('Handler error:', e);
    res.status(500).json({ error: e.message });
  }
}
