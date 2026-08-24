import 'dotenv/config';
import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT) || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json({ limit: '10kb' }));
app.use(express.static('.'));

app.post('/api/contacts', async (request, response) => {
  const { nom, prenom, email, gsm } = request.body;

  if (![nom, prenom, email, gsm].every((value) => typeof value === 'string' && value.trim())) {
    return response.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return response.status(400).json({ error: 'L’adresse email est invalide.' });
  }

  try {
    await pool.query(
      'INSERT INTO contacts (nom, prenom, email, gsm) VALUES ($1, $2, $3, $4)',
      [nom.trim(), prenom.trim(), normalizedEmail, gsm.trim()]
    );
    return response.status(201).json({ message: 'Contact enregistré avec succès.' });
  } catch (error) {
    if (error.code === '23505') {
      return response.status(409).json({ error: 'Cette adresse email existe déjà.' });
    }
    console.error(error);
    return response.status(500).json({ error: 'Impossible d’enregistrer le contact.' });
  }
});

app.listen(port, () => {
  console.log(`Application disponible sur http://localhost:${port}`);
});
