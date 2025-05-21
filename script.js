async function sendMessage() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const userText = input.value.trim();
  if (!userText) return;

  output.value = "Reformulando...";

  try {
    const response = await fetch("https://emalgeneratoria-production.up.railway.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await response.json();
    output.value = data.response;
  } catch (error) {
    output.value = "Ocurrió un error al conectar con el servidor.";
  }
}
