# Formulaire de contact PHP

Application web PHP affichant un formulaire de contact avec les champs nom, prénom, adresse mail et GSM.

## Prérequis

- PHP 7.4 ou supérieur

## Démarrage

Depuis le dossier du projet :

```bash
php -S localhost:8000
```

Puis ouvrir [http://localhost:8000](http://localhost:8000).

## Fonctionnement

Le formulaire vérifie que tous les champs sont remplis et que l'adresse mail possède un format valide. Après validation, un message de confirmation est affiché.

Les données ne sont actuellement pas enregistrées dans une base de données et aucun mail réel n'est envoyé.
