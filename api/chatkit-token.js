export default async function handler(req, res) {
  const gateKey = process.env.SHARED_GATE_KEY;
  if (!gateKey || req.query.key !== gateKey) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const workflow = "wf_68e69fbdd8708190aeb81cb76e797f310182485198f3a26e";
  const version = "1";

const r = await fetch("https://api.openai.com/v1/chatkit/sessions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
    "OpenAI-Beta": "chatkit_beta=v1"   // 👈 add this line
  },
  body: JSON.stringify({
  user: "guest",   // 👈 Add this line — can be any string ID, like "guest", "wife", or "allister"
  workflow,
  version
})

  const data = await r.json();
  return res.status(r.ok ? 200 : 500).json(data);
}
