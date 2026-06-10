export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { model, max_tokens, messages } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'invalid body' });

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model || 'claude-sonnet-4-20250514',
      max_tokens: max_tokens || 1000,
      messages
    })
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
