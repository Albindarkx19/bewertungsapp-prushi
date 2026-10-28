const express = require('express');
const { fn, col } = require('sequelize');
const router = express.Router();
const { Autor, Buch } = require('../models');

router.get('/:id/buecher', async (req, res) => {
  const autor = await Autor.findByPk(req.params.id, { include: Buch });
  if (!autor) return res.status(404).json({ error: 'Autor nicht gefunden' });
  res.json(autor[Buch.options.name.plural]);
});

router.get('/:id/statistik', async (req, res) => {
  const ergebnis = await Buch.findOne({
    where: { autorId: req.params.id },
    attributes: [[fn('AVG', col('erscheinungsjahr')), 'durchschnittsjahr']]
  });
  res.json(ergebnis);
});

module.exports = router;