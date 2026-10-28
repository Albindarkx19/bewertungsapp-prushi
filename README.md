# Bewertungsapp

Repository für die Bewertungsapp und die Datenbankübungen im Unterricht an der **LBS Eibiswald**.

## Labs

- [Lab 1 – Installation und allgemeine Fragen](docs/lab1.md)
- [Lab 2 – Datenbank-Grundlagen und Sequelize-CLI](docs/lab2.md)
- [Lab 3 – Sequelize-Beziehungen, Bewertungsmodelle und Testdaten](docs/lab3.md)
- [Lab 4 – Express-Routen und Sequelize-Abfragen](docs/lab4.md)

## Aufgabenübersicht

### Lab 1

- Node.js, npm und Ionic CLI installieren
- Datenbank `bibliothek_db` mit Laragon erstellen
- Screenshots der Versionen und der leeren Datenbank erstellen
- Fragen zu Capacitor, Cordova, Sequelize, npm, npx und REST beantworten
- GitHub-Repository erstellen und mit dem Tag `lab1` abgeben

### Lab 2

- Node-Projekt mit Sequelize und der Sequelize-CLI einrichten
- Models und Migrationen für `Autor` und `Buch` erstellen
- Migrationen auf die bestehende Datenbank `bibliothek_db` anwenden
- Tabellen `Autors` und `Buchs` kontrollieren
- ER-Diagramm der Bewertungsapp mit den Entitäten Team, Member, Project, Criterion, Juror und Evaluation dokumentieren

### Lab 3

- Assoziationen zwischen Autor und Buch sowie Leser, Buch und Ausleihe in den Models ergänzen
- Models und Migrationen für Leser, Bibliothekar und Ausleihe erstellen
- Bewertungsmodelle für Team, Member, Project, Criterion, Juror und Evaluation umsetzen
- Fremdschlüssel und den zusammengesetzten Unique-Constraint für Evaluation einrichten
- Seeder für Demo-Autoren und Standard-Bewertungskriterien anlegen und ausführen
- Migrationen und Testdaten mit `npx sequelize-cli db:migrate` und `npx sequelize-cli db:seed:all` in MySQL kontrollieren

### Lab 4

- Express-API mit JSON-Verarbeitung und separatem Routenordner erstellen
- CRUD-Routen für Bücher inklusive Autor implementieren
- Bücher eines Autors über eine verschachtelte Route abfragen
- Ausleihen anlegen, zurückgeben und nach Leser abfragen
- Durchschnittliches Erscheinungsjahr mit Sequelize berechnen

## API starten

Die MySQL-Datenbank aus `config/config.json` muss erreichbar sein. Zuerst bei Bedarf die Migrationen ausführen, anschließend den Server starten:

```bash
npx sequelize-cli db:migrate
npm start
```

Die API ist standardmäßig unter `http://localhost:3000` erreichbar. Die Endpunkte und Beispielanfragen stehen in [Lab 4](docs/lab4.md).

## Projektstruktur

```text
README.md
index.js
docs/
├── lab1.md
├── lab2.md
├── lab3.md
├── lab4.md
├── Bewertungsapp_ER_Diagramm.html
└── screenshots/
    ├── Versions.png
    ├── dbEmpty.png
    └── ERDIAGRAMM.png
models/
routes/
├── buecher.js
├── autoren.js
└── ausleihen.js
migrations/
seeders/
```

Die Bibliothekstabellen sind eine Sequelize-Übung aus Lab 2 und Lab 3 und werden in Lab 4 über eine REST-API angesprochen. Das ER-Diagramm beschreibt das Datenmodell der Bewertungsapp.
