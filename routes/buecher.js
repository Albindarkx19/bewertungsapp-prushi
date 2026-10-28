const express = require('express');
const router = express.Router();
const { Buch, Autor } = require('../models');

router.get('/', async (req, res) => {
  const buecher = await Buch.findAll({ include: Autor });
  res.json(buecher);
});

router.get('/:id', async (req, res) => {
  const buch = await Buch.findByPk(req.params.id, { include: Autor });
  if (!buch) return res.status(404).json({ error: 'Buch nicht gefunden' });
  res.json(buch);
});

router.post('/', async (req, res) => {
  const { titel, isbn, erscheinungsjahr, autorId } = req.body;
  if (!titel || !autorId) {
    return res.status(400).json({ error: 'titel und autorId sind Pflichtfelder' });
  }
  const buch = await Buch.create({ titel, isbn, erscheinungsjahr, autorId });
  res.status(201).json(buch);
});

router.put('/:id', async (req, res) => {
  const buch = await Buch.findByPk(req.params.id);
  if (!buch) return res.status(404).json({ error: 'Buch nicht gefunden' });
  const { titel, isbn, erscheinungsjahr, autorId } = req.body;
  await buch.update({ titel, isbn, erscheinungsjahr, autorId });
  res.json(buch);
});

router.delete('/:id', async (req, res) => {
  const buch = await Buch.findByPk(req.params.id);
  if (!buch) return res.status(404).json({ error: 'Buch nicht gefunden' });
  await buch.destroy();
  res.status(204).send();
});

module.exports = router;