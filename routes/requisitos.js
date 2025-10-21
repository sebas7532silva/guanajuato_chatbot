const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('requisitos');

router.post('/', async (req, res) => {
  try {
    const ref = await collection.add(req.body);
    res.status(201).json({ id: ref.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const requisitos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(requisitos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ message: 'Requisito actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ message: 'Requisito eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
