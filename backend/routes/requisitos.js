const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('requisitos');

// CREATE
router.post('/', async (req, res) => {
  try {
    const { reqId, reqNombre, reqDescripcion } = req.body;

    if (!reqId || !reqNombre) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: reqId o reqNombre' });
    }

    const data = { reqNombre, reqDescripcion };
    await collection.doc(reqId).set(data);
    res.status(201).json({ message: 'Requisito creado', reqId, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (todos)
router.get('/', async (req, res) => {
  try {
    const snapshot = await collection.get();
    const requisitos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(requisitos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ por ID
router.get('/:reqId', async (req, res) => {
  try {
    const doc = await collection.doc(req.params.reqId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Requisito no encontrado' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:reqId', async (req, res) => {
  try {
    await collection.doc(req.params.reqId).update(req.body);
    res.json({ message: `Requisito ${req.params.reqId} actualizado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:reqId', async (req, res) => {
  try {
    await collection.doc(req.params.reqId).delete();
    res.json({ message: `Requisito ${req.params.reqId} eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


