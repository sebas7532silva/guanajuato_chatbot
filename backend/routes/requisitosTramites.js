const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('requisitos-tramites');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { reqDocId, tramiteId, reqId } = req.body;

    if (!reqDocId || !tramiteId || !reqId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: reqDocId, tramiteId o reqId' });
    }

    const data = { tramiteId, reqId };
    await collection.doc(reqDocId).set(data);
    res.status(201).json({ message: 'Relación creada', reqDocId, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (todas)
router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ por trámite
router.get('/:tramiteId', async (req, res) => {
  try {
    const tId = Number(req.params.tramiteId); // convierte a número por seguridad
    const snapshot = await collection.where('TramiteId', '==', tId).get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (items.length === 0) {
      return res.status(404).json({ error: "No se encontraron requisitos para este trámite" });
    }

    res.json(items);
  } catch (err) {
    console.error("Error en GET /requisitos-tramites/:tramiteId", err);
    res.status(500).json({ error: err.message });
  }
});


// DELETE por reqDocId
router.delete('/:reqDocId', async (req, res) => {
  try {
    await collection.doc(req.params.reqDocId).delete();
    res.json({ message: `Relación ${req.params.reqDocId} eliminada correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

