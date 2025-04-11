// server.js
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // Puerto de la aplicación

// Middleware para manejar datos JSON en las solicitudes
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos (HTML, CSS, JS)

// Endpoint para manejar el formulario de contacto
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message; // Obtener el mensaje del usuario

  // Verificar que se haya enviado un mensaje
  if (!userMessage) {
    return res.status(400).json({ error: 'Se debe enviar un mensaje' });
  }

  try {
    // Solicitar respuesta de ChatGPT (OpenAI) usando la clave de API
    const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo', // Modelo de GPT que deseas usar
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 150, // Tamaño máximo de la respuesta
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Usar la clave API de OpenAI
        'Content-Type': 'application/json'
      }
    });

    // Enviar la respuesta de OpenAI al cliente
    res.json({ reply: openaiResponse.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la respuesta de ChatGPT' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
