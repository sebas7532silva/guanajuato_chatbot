const express = require("express");
const fetch = require("node-fetch");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const API_BASE = "http://localhost:3000";

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Mensaje vacío" });

    console.log("📩 Mensaje recibido:", message);

    const [tramitesRes, oficinasRes, requisitosRes, reqTramitesRes] = await Promise.all([
      fetch(`${API_BASE}/tramites`).then(r => r.json()),
      fetch(`${API_BASE}/oficinas`).then(r => r.json()),
      fetch(`${API_BASE}/requisitos`).then(r => r.json()),
      fetch(`${API_BASE}/requisitos-tramites`).then(r => r.json()),
    ]);

    const contexto = `
Eres un asistente virtual del sistema de Trámites Vehiculares del Estado de Guanajuato.
Ayuda al usuario de forma clara, amable y profesional.

=== Trámites ===
${JSON.stringify(tramitesRes, null, 2)}

=== Requisitos ===
${JSON.stringify(requisitosRes, null, 2)}

=== Requisitos-Trámites ===
${JSON.stringify(reqTramitesRes, null, 2)}

=== Oficinas ===
${JSON.stringify(oficinasRes, null, 2)}

Usuario pregunta: ${message}
`;

    console.log("🧠 Enviando mensaje a Gemini...");

    const result = await model.generateContent([
      {
        text: contexto,
      },
    ]);

    // Leer la respuesta (dependiendo de la versión)
    const reply = result.response.text() || "No hubo respuesta";
    console.log("📝 Respuesta de Gemini:", result);

    console.log("✅ Gemini respondió correctamente.");
    res.json({ reply });

  } catch (error) {
    console.error("❌ Error en /chat:", error);
    res.status(500).json({ error: error.message || "Error al comunicarse con Gemini" });
  }
});

module.exports = router;
