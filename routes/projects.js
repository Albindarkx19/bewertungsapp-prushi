const express = require('express');
const router = express.Router();
const { Project, Team, Evaluation, Criterion, Juror } = require('../models');

router.get('/', async (req, res) => {
  const projects = await Project.findAll({
    include: Team,
    order: [['id', 'ASC']]
  });
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: [Team, { model: Evaluation, include: [Criterion, Juror] }]
  });
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  res.json(project);
});

module.exports = router;