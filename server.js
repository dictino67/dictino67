import 'dotenv/config';
import express from 'express';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT) || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json({ limit: '10kb' }));
app.use(express.static('.'));

app.get('/api/contacts', async (request, response) => {
  const page = Math.max(1, Number.parseInt(request.query.page ?? '1', 10) || 1);
  const limit = Math.max(1, Math.min(10, Number.parseInt(request.query.limit ?? '10', 10) || 10));
  const offset = (page - 1) * limit;
  const search = String(request.query.search ?? '').trim();
  const sortBy = String(request.query.sortBy ?? '').trim();
  const sortDir = String(request.query.sortDir ?? 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  try {
    // Build WHERE clause and params dynamically to keep parameter indexing correct
    const whereClauses = [];
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      whereClauses.push(`LOWER(nom) LIKE LOWER($${params.length})`);
    }

    const whereSql = whereClauses.length ? ` WHERE ${whereClauses.join(' AND ')}` : '';

    // Count
    const countQuery = `SELECT COUNT(*) AS total FROM contacts${whereSql}`;
    const countResult = await pool.query(countQuery, params);
    const total = Number(countResult.rows[0].total ?? 0);

    // Ordering
    let orderSql = 'ORDER BY id DESC';
    if (sortBy === 'nom') {
      orderSql = `ORDER BY LOWER(nom) ${sortDir}`;
    }

    // Add limit/offset params (they come after existing params)
    params.push(limit, offset);
    const baseQuery = `SELECT id, nom, prenom, email, gsm, created_at FROM contacts${whereSql} ${orderSql} LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const result = await pool.query(baseQuery, params);
    const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

    return response.json({
      page,
      limit,
      total,
      totalPages,
      items: result.rows,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Impossible de lire les contacts.' });
  }
});

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

app.delete('/api/contacts/:id', async (request, response) => {
  const id = Number.parseInt(request.params.id, 10);
  if (!Number.isFinite(id) || id <= 0) {
    return response.status(400).json({ error: 'Identifiant invalide.' });
  }

  try {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return response.status(404).json({ error: 'Contact non trouvé.' });
    }
    return response.status(204).end();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Impossible de supprimer le contact.' });
  }
});

app.listen(port, () => {
  console.log(`Application disponible sur http://localhost:${port}`);
});
