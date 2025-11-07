const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const oficinas = require('./routes/oficinas');
const requisitos = require('./routes/requisitos');
const requisitosTramites = require('./routes/requisitosTramites');
const tramites = require('./routes/tramites');
const chatRoutes = require('./routes/chat');

console.log("🔑 Gemini API Key detectada:", process.env.PORT ? "✅ Sí" : "❌ No");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/oficinas', oficinas);
app.use('/requisitos', requisitos);
app.use('/requisitos-tramites', requisitosTramites);
app.use('/tramites', tramites);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => res.send('Backend Chatbot Guanajuato funcionando.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

