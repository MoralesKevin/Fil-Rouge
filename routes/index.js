/* eslint-disable */
import express from 'express';

const router = express.Router();
const connection = require('./conf');

connection.connect( err => {
  if(err) {
    console.log('Error : ', err);
  }else{
    console.log('Connecté');
  }
});

/* Tout recuperer */
router.get('/', (request, response) => {
  connection.query('SELECT * from jeux', (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la récupération des jeux');
      } else {
          response.json(results);
      }
  });
})

/* recupere tous les noms */
router.get('/nom', (request, response) => {
  connection.query('SELECT nom from jeux', (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la récupération des noms');
      } else {
          response.json(results);
      }
  });
})

/* recupere toutes les sorties */
router.get('/sortie', (request, response) => {
  connection.query('SELECT sortie from jeux', (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la récupération des sorties');
      } else {
          response.json(results);
      }
  });
})

/* recupre un nom de jeu */
router.get('/:nom', (request, response) => {
  connection.query(`SELECT * from jeux WHERE nom = '${request.params.nom}'`, (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la récupération du nom du jeu');
      } else {
          response.json(results);
      }
  });
})

/* recupere nom de jeu qui commence par ... */
router.get('/jeu/:nom', (request, response) => {
  connection.query(`SELECT * from jeux WHERE nom LIKE '${request.params.nom}%' `, (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la récupération du nom du jeu');
      } else {
          response.json(results);
      }
  });
})

/* filtre prix inferieur mais fonctionne que sur phpmyadmin */
router.get('/prix', (request, response) => {
  connection.query(`SELECT * from jeux WHERE prix > 50`, (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la récupération du prix inferieur à 50 €');
      } else {
          response.json(results);
      }
  });
})

/* tri jeux par sorties ascendante */
router.get('/sortie', (request, response) => {
  connection.query(`SELECT * from jeux ORDER BY sortie ASC`, (err, results) => {
      if (err) {
          response.status(500).send('Erreur lors de la tentative de tri par sortie');
      } else {
          response.json(results);
      }
  });
})

/* ajouter un jeu dans la base de donnée */
router.post('/ajouter', (request, response) => {
  const formData = request.body;
  connection.query(`INSERT INTO jeux SET ?`, formData, (err, results) => {
      if (err) {
          response.status(500).send("Erreur lors de l'ajout du jeu");
      } else {
          response.sendStatus(200);
      }
  });
})

/* modifier prix d'un jeu */
router.put('/modifier/:id', (request, response) => {
  const idJeu = request.params.id;
  const formData = request.body;
  connection.query(`UPDATE jeux SET ? WHERE id = ?`, [formData, idJeu], err => {
      if (err) {
          response.status(500).send("Erreur lors de l'ajout du jeu");
      } else {
          response.sendStatus(200);
      }
  });
})

/* changer booleen (si je mets 0 il met 1 et si je mets 1 il met 0)*/
router.put('/pc/:id', (request, response) => {
  const idJeu = request.params.id;
  const formData = request.body;
  connection.query(`UPDATE jeux SET pc= ? WHERE id = ?`, [formData, idJeu], err => {
      if (err) {
          response.status(500).send("Erreur lors du changement du booleen");
      } else {
          response.sendStatus(200);
      }
  });
})

/* supprimer jeu */
router.delete('/supprimer/:id', (request, response) => {
  const idJeu = request.params.id;
  connection.query(`DELETE FROM jeux WHERE id = ?`, [idJeu], err => {
      if (err) {
          response.status(500).send("Erreur lors de la tentative de suppression du jeu");
      } else {
          response.sendStatus(200);
      }
  });
})

/* supprime booleen egal à 0 */
router.delete('/nopc', (request, response) => {
  connection.query(`DELETE FROM jeux WHERE pc = 1`, err => {
      if (err) {
          response.status(500).send("Erreur lors de la tentative de suppression du jeu");
      } else {
          response.sendStatus(200);
      }
  });
})

export default router;
