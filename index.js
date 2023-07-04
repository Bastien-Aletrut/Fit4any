const express = require('express');
const db = require('./db.json');
const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur mon API !' });
});

app.get('/items', (req, res) => {
    res.json({ message: db });
});

const fs = require('fs');

// Charger les données depuis le fichier JSON
const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
const items = data.items;

// Route pour récupérer un item par son ID
app.get('/item/:id', (req, res) => {
  const itemId = parseInt(req.params.id);

  // Rechercher l'item correspondant à l'ID
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item non trouvé' });
  }

  res.json(item);
});
// Autres routes et logique de votre API

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`L'API est en cours d'exécution sur le port ${port}`);
});