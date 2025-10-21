const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('oficinas');

// CREATE
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const ref = await collection.add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ message: 'Oficina actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ message: 'Oficina eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
