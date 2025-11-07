const express = require('express');
const router = express.Router();
const db = require('../src/config/firebase');
const collection = db.collection('oficinas');

// CREATE con ID personalizado
router.post('/', async (req, res) => {
  try {
    const { id, oficina, titular, horarioAtencion, diasAtencionTramites, domicilio, diasNoLaborales, telefonoCitas, telefonoAsesoria, recepcion, horarioSinCita } = req.body;

    if (!id || !oficina || !titular) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: id, oficina o titular' });
    }

    const data = { oficina, titular, horarioAtencion, diasAtencionTramites, domicilio, diasNoLaborales, telefonoCitas, telefonoAsesoria, recepcion, horarioSinCita };

    await collection.doc(id).set(data);
    res.status(201).json({ message: 'Oficina creada', id, ...data });
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

// READ por ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Oficina no encontrada' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE por ID
router.put('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ message: `Oficina ${req.params.id} actualizada correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE por ID
router.delete('/:id', async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ message: `Oficina ${req.params.id} eliminada correctamente` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


