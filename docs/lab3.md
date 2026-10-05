# Lab 3 – Sequelize-Beziehungen, Bewertungsmodelle und Testdaten

## Ziel

In Lab 3 wurden die bestehenden Bibliotheksmodelle erweitert und das Datenmodell der Bewertungsapp aus dem ER-Diagramm in Sequelize umgesetzt. Dabei wurden Models, Assoziationen, Migrationen und Seeder verwendet.

## Was wurde gemacht?

### Bibliotheksmodelle erweitert

Zusätzlich zu `Autor` und `Buch` gibt es jetzt die Models `Leser`, `Bibliothekar` und `Ausleihe`. Eine Ausleihe verbindet ein Buch mit einem Leser und speichert außerdem das Ausleih- und Rückgabedatum.

Die Beziehungen sind:

- Ein Autor kann mehrere Bücher haben. Jedes Buch gehört zu einem Autor.
- Ein Leser kann mehrere Ausleihen haben. Jede Ausleihe gehört zu einem Leser und einem Buch.

Die Verknüpfung steht in den `associate`-Methoden der Models. `models/index.js` ruft diese Methoden beim Laden der Models automatisch auf.

### Models der Bewertungsapp erstellt

Das ER-Diagramm enthält sechs Entitäten. Die Models `Team`, `Member` und `Project` waren im Projekt noch nicht angelegt und wurden als Grundlage ebenfalls ergänzt. Dazu kommen die drei Modelle der Bewertungsaufgabe:

| Model | Fachliche Attribute | Bedeutung |
|---|---|---|
| `Team` | `name`, `klasse` | Gruppe, die Projekte erstellt |
| `Member` | `teamId`, `vorname`, `nachname` | Person in einem Team |
| `Project` | `teamId`, `titel`, `beschreibung`, `praesentiertAm` | Bewertetes Projekt |
| `Criterion` | `name`, `maxScore`, `weight` | Bewertungskriterium mit Maximalpunktzahl und Gewichtung |
| `Juror` | `name`, `email` | Bewertende Person; die E-Mail-Adresse ist eindeutig |
| `Evaluation` | `projectId`, `criterionId`, `jurorId`, `score`, `comment` | Bewertung eines Projekts für ein Kriterium durch einen Juror |

Eine Evaluation ist eine **Assoziationsentität**: Sie verbindet Project, Criterion und Juror, besitzt aber mit `score` und `comment` auch eigene fachliche Daten.

Die Beziehungen der Bewertungsapp sind:

- Ein Team hat mehrere Members und Projects.
- Ein Project, Criterion und Juror können jeweils mehreren Evaluations zugeordnet sein.
- Jede Evaluation gehört genau zu einem Project, einem Criterion und einem Juror.

### Migrationen und Schutz vor doppelten Bewertungen

Die Migrationen legen die Tabellen und Fremdschlüssel in der MySQL-Datenbank an. Für `Evaluation` gibt es zusätzlich einen zusammengesetzten Unique-Constraint über `projectId`, `criterionId` und `jurorId`. Damit kann ein Juror dasselbe Kriterium eines Projekts nicht versehentlich mehrfach bewerten.

## Testdaten

Es gibt zwei Seeder:

- `demo-autoren` fügt Marie Curie und Jules Verne in die Tabelle `Autors` ein.
- `standard-bewertungskriterien` fügt drei Kriterien in `Criteria` ein.

Migrationen und Seeder können mit diesen Befehlen ausgeführt werden:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

Die Migrationen wurden bereits auf die in `config/config.json` eingestellte Entwicklungsdatenbank `bibliothek_db` angewendet. Die Seeder wurden ebenfalls ausgeführt. Bei erneutem Ausführen von `db:seed:all` können die Beispieldaten mehrfach eingetragen werden.

## Wo finde ich die Änderungen?

Im VS-Code-Explorer:

- Models und ihre Beziehungen: Ordner `models/`, insbesondere `autor.js`, `buch.js`, `ausleihe.js`, `criterion.js`, `juror.js` und `evaluation.js`.
- Tabellen und Constraints: Ordner `migrations/`; die Migration `20261005080727-create-evaluation.js` enthält die Evaluation-Fremdschlüssel und den Unique-Index.
- Testdaten: Ordner `seeders/`; dort liegen `20261005080728-demo-autoren.js` und `20261005080729-standard-bewertungskriterien.js`.
- Diagramm und Tabellenübersicht: `docs/Bewertungsapp_ER_Diagramm.html`.
- Datenbankverbindung und Datenbankname: `config/config.json`.

## Ergebnis

Die Models der Bibliotheksübung und der Bewertungsapp sind vorhanden und über Sequelize-Assoziationen verbunden. Die Datenbank besitzt die zugehörigen Tabellen, Fremdschlüssel und den Schutz vor doppelten Bewertungen. Mit den Seedern stehen Beispieldaten zum Kontrollieren der Tabellen bereit.
