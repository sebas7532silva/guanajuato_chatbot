const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('tramites');

// CREATE con ID personalizado
router.post('/', async (req, res) => {
  try {
    const { id, tramiteIdSAP, tramiteNombre, categoriaId, categoriaNombre, tipoTramite } = req.body;

    if (!id || !tramiteIdSAP || !tramiteNombre) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: id, tramiteIdSAP o tramiteNombre' });
    }

    const data = { tramiteIdSAP, tramiteNombre, categoriaId, categoriaNombre, tipoTramite };

    await collection.doc(id).set(data);
    res.status(201).json({ message: 'Trámite creado', id, ...data });
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

// UPDATE por ID personalizado
router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ message: `Trámite ${req.params.id} actualizado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE por ID personalizado
router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ message: `Trámite ${req.params.id} eliminado correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

