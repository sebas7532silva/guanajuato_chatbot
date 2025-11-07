const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('requisitos');

// CREATE con ID personalizado
router.post('/', async (req, res) => {
  try {
    const { id, reqNombre, reqDescripcion } = req.body;

    if (!id || !reqNombre || !reqDescripcion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: id, reqNombre o reqDescripcion' });
    }

    // Usa el "id" del body como ID del documento
    await collection.doc(id).set({ reqNombre, reqDescripcion });

    res.status(201).json({ message: 'Requisito creado', id, reqNombre, reqDescripcion });
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

// UPDATE por ID personalizado
router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ message: `Requisito ${req.params.id} actualizado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE por ID personalizado
router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ message: `Requisito ${req.params.id} eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

