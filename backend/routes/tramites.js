const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('tramites');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { tramiteId, tramiteIdSAP, categoriaId, categoriaNombre, tipoTramite } = req.body;

    if (!tramiteId || !tipoTramite) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: tramiteId, tipoTramite' });
    }

    const data = { tramiteIdSAP, categoriaId, categoriaNombre, tipoTramite };
    await collection.doc(tramiteId).set(data);
    res.status(201).json({ message: 'Trámite creado', tramiteId, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (todos)
router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const tramites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tramites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ por ID
router.get('/:tramiteId', async (req, res) => {
  try {
    const doc = await collection.doc(req.params.tramiteId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Trámite no encontrado' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:tramiteId', async (req, res) => {
  try {
    await collection.doc(req.params.tramiteId).update(req.body);
    res.json({ message: `Trámite ${req.params.tramiteId} actualizado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:tramiteId', async (req, res) => {
  try {
    await collection.doc(req.params.tramiteId).delete();
    res.json({ message: `Trámite ${req.params.tramiteId} eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


