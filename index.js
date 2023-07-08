


const express = require('express');
const app = express();
const fs = require('fs');

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Classe Item
class Item {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur mon API !' });
});

app.get('/items', (req, res) => {
    res.json({ message: db });
});

// Charger les données depuis le fichier JSON
const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
const items = data.items;

// Route pour récupérer un item par son ID
app.get('/item/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
  const itemId = parseInt(req.params.id);

  // Rechercher l'item correspondant à l'ID
  const item = data.items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item non trouvé' });
  }

  res.json(item);
});

// Route pour ajouter un nouvel item
app.post('/item', (req, res) => {
    const data2 = JSON.parse(fs.readFileSync('./db.json', 'utf8'));
    const items = data2.items;
    const maxId = items.reduce((max, item) => {
        return item.id > max ? item.id : max;
      }, 0);
  const newId = maxId+1;
  const newItem = new Item(newId, req.body.name, req.body.description);

  // Charger les données depuis le fichier JSON
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

  // Ajouter le nouvel item à la liste des items
  data.items.push(newItem);

  // Enregistrer les modifications dans le fichier JSON
  fs.writeFileSync('./db.json', JSON.stringify(data, null,2));

  res.status(201).json(newItem);
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
