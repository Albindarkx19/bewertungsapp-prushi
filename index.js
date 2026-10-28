const express = require('express');
const buecherRouter = require('./routes/buecher');
const autorenRouter = require('./routes/autoren');
const ausleihenRouter = require('./routes/ausleihen');

const app = express();
app.use(express.json());
app.use('/buecher', buecherRouter);
app.use('/autoren', autorenRouter);
app.use('/ausleihen', ausleihenRouter);

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