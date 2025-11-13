const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');

// 📍 GET /banners
// Devuelve todos los banners desde Firestore
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('banners').get();

    // Si no hay documentos
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No hay banners disponibles.' });
    }

    // Convertimos los documentos a un arreglo
    const banners = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(banners);
  } catch (error) {
    console.error('❌ Error al obtener banners:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
