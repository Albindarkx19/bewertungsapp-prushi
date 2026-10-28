const express = require('express');
const cors = require('cors');
const buecherRouter = require('./routes/buecher');
const autorenRouter = require('./routes/autoren');
const ausleihenRouter = require('./routes/ausleihen');
const projectsRouter = require('./routes/projects');

const app = express();
app.use(cors({ origin: /^http:\/\/localhost:(8100|8101)$/ }));
app.use(express.json());
app.use('/buecher', buecherRouter);
app.use('/autoren', autorenRouter);
app.use('/ausleihen', ausleihenRouter);
app.use('/projects', projectsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Interner Serverfehler' : err.message
  });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API erreichbar unter http://localhost:${port}`);
  });
}

module.exports = app;