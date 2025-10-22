const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('requisitos-tramites');

// CREATE con ID personalizado
router.post('/', async (req, res) => {
  try {
    const { id, reqDocId, TramiteId } = req.body;

    if (!id || !reqDocId || !TramiteId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: id, reqDocId o TramiteId' });
    }

    await collection.doc(id).set({ reqDocId, TramiteId });
    res.status(201).json({ message: 'Relación requisito-trámite creada', id, reqDocId, TramiteId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (todos)
router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE por ID personalizado
router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ message: `Relación requisito-trámite ${req.params.id} actualizada` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE por ID personalizado
router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ message: `Relación requisito-trámite ${req.params.id} eliminada correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

