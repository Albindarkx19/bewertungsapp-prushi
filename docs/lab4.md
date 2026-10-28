# Lab 4 - Express-Routen und Sequelize-Abfragen

## Ziel

Die Bibliotheksmodelle aus Lab 3 werden ueber eine REST-API angesprochen. Express nimmt HTTP-Anfragen entgegen, Sequelize liest und veraendert die Daten in MySQL. Die Antworten werden als JSON zurueckgegeben.

## Routenordner und Einstiegspunkt

Der Ordner fuer die Router kann mit folgendem Befehl angelegt werden und ist im Projekt bereits vorhanden:

```bash
mkdir routes
```

Die Implementierungen liegen in [routes/buecher.js](../routes/buecher.js), [routes/autoren.js](../routes/autoren.js) und [routes/ausleihen.js](../routes/ausleihen.js).

Die zentrale [index.js](../index.js) erstellt die Express-App und bindet die Router ein:

```javascript
const express = require('express');
const buecherRouter = require('./routes/buecher');
const autorenRouter = require('./routes/autoren');
const ausleihenRouter = require('./routes/ausleihen');

const app = express();
app.use(express.json());
app.use('/buecher', buecherRouter);
app.use('/autoren', autorenRouter);
app.use('/ausleihen', ausleihenRouter);
```

`express.json()` liest JSON-Anfragekoerper in `req.body` ein. Die Router verwenden `express.Router()` und exportieren diesen mit `module.exports = router`. Express 5 leitet Fehler aus asynchronen Routen an die zentrale Fehlerbehandlung weiter.

## CRUD fuer Buecher

| Methode | Pfad | Funktion | Erfolg |
|---|---|---|---|
| GET | `/buecher` | Alle Buecher inklusive Autor | 200 |
| GET | `/buecher/:id` | Ein Buch inklusive Autor | 200 |
| POST | `/buecher` | Neues Buch anlegen | 201 |
| PUT | `/buecher/:id` | Buch aktualisieren | 200 |
| DELETE | `/buecher/:id` | Buch loeschen | 204 |

Die Leseabfragen nutzen `Buch.findAll({ include: Autor })` beziehungsweise `Buch.findByPk(req.params.id, { include: Autor })`. Durch die Assoziation `Buch.belongsTo(Autor)` wird der Autor mitgeladen.

Beim Anlegen sind `titel` und `autorId` Pflichtfelder. Fehlen sie, antwortet die API mit Status 400. Nicht gefundene Buecher ergeben Status 404 mit `{ "error": "Buch nicht gefunden" }`. Updates beschraenken sich auf die fachlichen Felder `titel`, `isbn`, `erscheinungsjahr` und `autorId`.

Beispiel fuer `POST /buecher`, mit `Content-Type: application/json`:

```json
{
  "titel": "Reise zum Mittelpunkt der Erde",
  "isbn": "9783120000001",
  "erscheinungsjahr": 1864,
  "autorId": 1
}
```

Die `autorId` muss zu einem vorhandenen Autor gehoeren. Zum Aktualisieren kann beispielsweise `{ "titel": "Neuer Titel" }` an `PUT /buecher/1` gesendet werden. Beim Loeschen enthaelt die erfolgreiche Antwort keinen Body. Bestehende Fremdschluessel koennen das Loeschen eines ausgeliehenen Buches verhindern.

## Verschachtelte Route: Buecher eines Autors

`GET /autoren/:id/buecher` laedt einen Autor und seine Buecher:

```javascript
router.get('/:id/buecher', async (req, res) => {
  const autor = await Autor.findByPk(req.params.id, { include: Buch });
  if (!autor) return res.status(404).json({ error: 'Autor nicht gefunden' });
  res.json(autor[Buch.options.name.plural]);
});
```

Sequelize verwendet im vorhandenen Modell den Assoziationsnamen `Buches`, nicht `Buchs`. Deshalb liest die Route den Pluralnamen aus den Modelloptionen aus. Ein vorhandener Autor ohne Buecher liefert eine leere Liste; ein unbekannter Autor liefert Status 404.

## Assoziationsentitaet Ausleihe

Eine Ausleihe verbindet Buch und Leser und speichert zusaetzlich `ausgeliehenAm` und `zurueckAm`.

| Methode | Pfad | Funktion |
|---|---|---|
| POST | `/ausleihen` | Ausleihe anlegen, Status 201 |
| PUT | `/ausleihen/:id/rueckgabe` | Rueckgabedatum setzen, Status 200 |
| GET | `/ausleihen/leser/:leserId` | Ausleihen eines Lesers inklusive Buch, Status 200 |

Beispiel fuer `POST /ausleihen`:

```json
{
  "buchId": 1,
  "leserId": 1
}
```

Beide IDs sind Pflichtfelder und muessen in der Datenbank vorhanden sein. Leser werden in diesem Lab nicht ueber eine eigene Route angelegt.

Vor dem Anlegen prueft die Route mit `Ausleihe.findOne({ where: { buchId, zurueckAm: null } })`, ob bereits eine offene Ausleihe besteht. In diesem Fall antwortet sie mit Status 409 und `{ "error": "Buch ist bereits ausgeliehen" }`. Andernfalls setzt sie das aktuelle Ausleihdatum und `zurueckAm: null`.

Die Rueckgaberoute setzt `zurueckAm` auf das aktuelle Datum. Eine unbekannte Ausleihe ergibt Status 404. Die Leserroute liefert auch bereits abgeschlossene Ausleihen.

Die Abfolge aus Pruefen und Anlegen ist nicht atomar. Gleichzeitige Ausleihanfragen koennen diese einfache Pruefung umgehen; fuer einen produktiven Einsatz ist eine transaktionale Absicherung erforderlich.

## Aggregation mit Sequelize

`GET /autoren/:id/statistik` berechnet das durchschnittliche Erscheinungsjahr der Buecher eines Autors:

```javascript
const { fn, col } = require('sequelize');

router.get('/:id/statistik', async (req, res) => {
  const ergebnis = await Buch.findOne({
    where: { autorId: req.params.id },
    attributes: [[fn('AVG', col('erscheinungsjahr')), 'durchschnittsjahr']]
  });
  res.json(ergebnis);
});
```

`fn('AVG', col('erscheinungsjahr'))` erzeugt SQL `AVG(erscheinungsjahr)`. Der Alias `durchschnittsjahr` ist der Feldname der JSON-Antwort. Ohne passende Jahreswerte ist der Durchschnitt `null`; diese Route prueft nicht gesondert, ob der Autor existiert.

Dasselbe Prinzip kann spaeter fuer `AVG(score)` der Bewertungsapp verwendet werden. Mit `group: ['projectId']` oder `group: ['criterionId']` lassen sich Ergebnisse nach Projekt oder Kriterium gruppieren. Diese Bewertungsrouten sind in Lab 4 noch nicht implementiert.

## Start und manuelle Kontrolle

MySQL muss laufen und die Verbindung in [config/config.json](../config/config.json) passen. Im Projektordner:

```bash
npx sequelize-cli db:migrate
npm start
```

Standardadresse: `http://localhost:3000`. Ueber die Umgebungsvariable `PORT` kann ein anderer Port gewaehlt werden.

Die Anfragen koennen mit Postman getestet werden. Fuer POST und PUT den Body als JSON senden. Eine sinnvolle Reihenfolge ist:

1. Mit einer vorhandenen Autoren-ID ein Buch anlegen und die zurueckgegebene ID notieren.
2. Alle Buecher, das neue Buch und die Buecher des Autors abrufen.
3. Das Buch aktualisieren und die Autorenstatistik abrufen.
4. Mit einer vorhandenen Leser-ID eine Ausleihe anlegen und eine zweite offene Ausleihe desselben Buches versuchen: erwartet wird 409.
5. Die Ausleihen des Lesers abrufen und die Ausleihe ueber die Rueckgaberoute abschliessen.
6. Fehlende Pflichtfelder und unbekannte IDs pruefen: erwartet werden 400 beziehungsweise 404.
7. Ein Buch ohne abhaengige Ausleihen loeschen: erwartet wird 204 ohne Antwortinhalt.

## Ergebnis und Testumfang

Die API besitzt Buch-CRUD, verschachtelte Autorenabfragen, Ausleihverwaltung und eine AVG-Aggregation. Die Router-Einbindung, Fehlerstatus und der Assoziationsname wurden mit simulierten Modellabfragen ueber HTTP geprueft. Ein vollstaendiger Integrationstest gegen MySQL ist damit nicht ersetzt.
