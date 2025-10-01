export async function POST(req) {
  const { message } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // 🔥 dùng key server-side
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout:free",
      messages: [
        { role: "system", content: "Bạn là trợ lý triết học. Trả lời ngắn gọn 1–2 câu." },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await response.json();
  return Response.json(data);
}
