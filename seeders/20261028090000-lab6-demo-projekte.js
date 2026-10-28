'use strict';

const teamName = 'Lab 6 Demo-Team';
const email = 'lab6-demo@example.test';
const titles = ['Lab 6: Digitale Bibliothek', 'Lab 6: Schulveranstaltungsplaner'];
const criterionNames = ['Lab 6: Technische Umsetzung', 'Lab 6: Benutzerfreundlichkeit'];

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async transaction => {
      const ensure = async (table, where, values) => {
        const options = { where, transaction, raw: true, limit: 1 };
        const existing = await queryInterface.select(null, table, options);
        if (existing.length) return existing[0];
        const now = new Date();
        await queryInterface.bulkInsert(table, [{ ...where, ...values, createdAt: now, updatedAt: now }], { transaction });
        return (await queryInterface.select(null, table, options))[0];
      };
      const team = await ensure('Teams', { name: teamName, klasse: '4aAPC' }, {});
      const juror = await ensure('Jurors', { email }, { name: 'Demo-Jury' });
      const firstCriterion = await ensure('Criteria', { name: criterionNames[0] }, { maxScore: 10, weight: 1 });
      const secondCriterion = await ensure('Criteria', { name: criterionNames[1] }, { maxScore: 10, weight: 1 });
      const project = await ensure('Projects', { teamId: team.id, titel: titles[0] }, {
        beschreibung: 'Demoprojekt: Eine digitale Bibliothek mit Buchverwaltung, Ausleihen und einer Ionic-Oberflaeche.',
        praesentiertAm: new Date('2026-10-28T09:00:00')
      });
      await ensure('Projects', { teamId: team.id, titel: titles[1] }, {
        beschreibung: 'Demoprojekt: Veranstaltungen planen, Teams koordinieren und Termine im Blick behalten.',
        praesentiertAm: null
      });
      await ensure('Evaluations', { projectId: project.id, criterionId: firstCriterion.id, jurorId: juror.id }, {
        score: 9, comment: 'Die API-Anbindung und die Aufteilung in Services und Seiten sind gut nachvollziehbar.'
      });
      await ensure('Evaluations', { projectId: project.id, criterionId: secondCriterion.id, jurorId: juror.id }, {
        score: 8, comment: 'Die Projektliste stellt die Daten aus dem Backend uebersichtlich dar.'
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async transaction => {
      const teams = await queryInterface.select(null, 'Teams', { where: { name: teamName, klasse: '4aAPC' }, transaction, raw: true });
      const teamIds = teams.map(team => team.id);
      if (!teamIds.length) return;
      const projects = await queryInterface.select(null, 'Projects', {
        where: { teamId: { [Sequelize.Op.in]: teamIds }, titel: { [Sequelize.Op.in]: titles } }, transaction, raw: true
      });
      const projectIds = projects.map(project => project.id);
      if (projectIds.length) {
        await queryInterface.bulkDelete('Evaluations', { projectId: { [Sequelize.Op.in]: projectIds } }, { transaction });
        await queryInterface.bulkDelete('Projects', { id: { [Sequelize.Op.in]: projectIds } }, { transaction });
      }
      await queryInterface.bulkDelete('Jurors', { email }, { transaction });
      await queryInterface.bulkDelete('Criteria', { name: { [Sequelize.Op.in]: criterionNames } }, { transaction });
      await queryInterface.bulkDelete('Teams', { id: { [Sequelize.Op.in]: teamIds } }, { transaction });
    });
  }
};