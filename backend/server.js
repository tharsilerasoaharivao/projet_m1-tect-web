const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sun-co",
    dateStrings: "date"
});

// Connexion à la base de données
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err.message);
        process.exit(1);
    }
    console.log('Connecté à MySQL');
});

// Affichage de tous les produits
app.get('/api/produits', (req, res) => {
    const sql = "SELECT * FROM produit";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Ajout d'un produit
app.post('/api/produitAjout', (req, res) => {
    const { nomProd, prixUnit } = req.body;
    const sql = "INSERT INTO produit (nomProd, prixUnit) VALUES (?, ?)";
    db.query(sql, [nomProd, prixUnit], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Modification d'un produit
app.put('/api/produitModifier/:id', (req, res) => {
    const { nomProd, prixUnit } = req.body;
    const { id } = req.params;
    const sql = "UPDATE produit SET nomProd = ?, prixUnit = ? WHERE id = ?";
    db.query(sql, [nomProd, prixUnit, id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Suppression d'un produit
app.delete('/api/produitSupprimer/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM produit WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Affichage d'un produit avant modification
app.get('/api/produitAvantModification/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM produit WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Affichage de tous les éléments du panier
app.get('/api/panier', (req, res) => {
    const sql = "SELECT panier.id, produit.nomProd, produit.prixUnit, panier.quantite FROM panier JOIN produit ON panier.produit_id = produit.id";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Ajout d'un élément au panier
app.post('/api/panierAjout', (req, res) => {
    const { produitId, quantite } = req.body;
    const sql = "INSERT INTO panier (produit_id, quantite) VALUES (?, ?)";
    db.query(sql, [produitId, quantite], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Modification d'un élément du panier
app.put('/api/panierModifier/:id', (req, res) => {
    const { quantite } = req.body;
    const { id } = req.params;
    const sql = "UPDATE panier SET quantite = ? WHERE id = ?";
    db.query(sql, [quantite, id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Suppression d'un élément du panier
app.delete('/api/panierSupprimer/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM panier WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Affichage d'un élément du panier avant modification
app.get('/api/panierAvantModification/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT panier.id, produit.nomProd, produit.prixUnit, panier.quantite FROM panier JOIN produit ON panier.produit_id = produit.id WHERE panier.id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Affichage de toutes les commandes
app.get('/api/commandes', (req, res) => {
    const sql = "SELECT * FROM commande";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Ajout d'une commande
app.post('/api/commandeAjout', (req, res) => {
    const { dateCmd, nomProdCmd, prixProdCmd, qteCmd } = req.body;
    const sql = "INSERT INTO commande (dateCmd, nomProdCmd, prixProdCmd, qteCmd) VALUES (?, ?, ?, ?)";
    db.query(sql, [dateCmd, nomProdCmd, prixProdCmd, qteCmd], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Modification d'une commande
app.put('/api/commandeModifier/:id', (req, res) => {
    const { dateCmd, nomProdCmd, prixProdCmd, qteCmd } = req.body;
    const { id } = req.params;
    const sql = "UPDATE commande SET dateCmd = ?, nomProdCmd = ?, prixProdCmd = ?, qteCmd = ? WHERE id = ?";
    db.query(sql, [dateCmd, nomProdCmd, prixProdCmd, qteCmd, id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Suppression d'une commande
app.delete('/api/commandeSupprimer/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM commande WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Affichage d'une commande avant modification
app.get('/api/commandeAvantModification/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM commande WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: err.message });
        }
        return res.json(data);
    });
});

// Démarrer le serveur
app.listen(3030, () => {
    console.log("Serveur démarré sur le port 3030");
});