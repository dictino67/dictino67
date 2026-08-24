# Formulaire de contact PostgreSQL

Petite application Node.js permettant d'enregistrer un nom, un prenom, une adresse email et un GSM dans PostgreSQL.

## Installation

```bash
npm install
cp .env.example .env
```

Modifiez `DATABASE_URL` dans `.env`, puis créez la table :

```bash
psql "$DATABASE_URL" -f schema.sql
```

## Demarrage

```bash
npm start
```

Ouvrez ensuite <http://localhost:3000> dans votre navigateur.

Le formulaire envoie ses données à `POST /api/contacts`. La connexion PostgreSQL et les identifiants restent côté serveur.
