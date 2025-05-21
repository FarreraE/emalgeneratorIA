import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Sirve index.html y script.js desde raíz

app.post("emalgeneratoria-production.up.railway.app", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Puedes usar "gpt-4" si tienes acceso
     messages: [
  {
    role: "system",
    content: `Eres un experto en redacción profesional. Tu tarea es tomar el mensaje del usuario y reescribirlo para que sea claro, directo, profesional, cordial, y bien estructurado. No inventes nueva información, solo mejora la redacción.`,
  },
  {
    role: "user",
    content: `Mensaje original:\n\n${userMessage}`,
  },
],
    });

    res.json({ response: chat.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Error al conectar con OpenAI." });
  }
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
