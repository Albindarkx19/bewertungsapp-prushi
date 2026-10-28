const express = require('express');
const router = express.Router();
const { Ausleihe, Buch } = require('../models');

router.post('/', async (req, res) => {
  const { buchId, leserId } = req.body;
  if (!buchId || !leserId) {
    return res.status(400).json({ error: 'buchId und leserId sind Pflichtfelder' });
  }
  const offen = await Ausleihe.findOne({ where: { buchId, zurueckAm: null } });
  if (offen) {
    return res.status(409).json({ error: 'Buch ist bereits ausgeliehen' });
  }
  const ausleihe = await Ausleihe.create({
    buchId, leserId, ausgeliehenAm: new Date(), zurueckAm: null
  });
  res.status(201).json(ausleihe);
});

router.put('/:id/rueckgabe', async (req, res) => {
  const ausleihe = await Ausleihe.findByPk(req.params.id);
  if (!ausleihe) return res.status(404).json({ error: 'Ausleihe nicht gefunden' });
  await ausleihe.update({ zurueckAm: new Date() });
  res.json(ausleihe);
});

router.get('/leser/:leserId', async (req, res) => {
  const ausleihen = await Ausleihe.findAll({
    where: { leserId: req.params.leserId },
    include: Buch
  });
  res.json(ausleihen);
});

module.exports = router;