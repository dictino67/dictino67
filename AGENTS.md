# Instructions du projet

## Projet

Application web PHP simple avec un formulaire de contact.

## Structure

- `index.php` : formulaire et traitement PHP.
- `.continue/` : configuration de l'agent Continue.

## Fonctionnement

Le formulaire collecte le nom, le prénom, l'adresse mail et le GSM. Les champs sont obligatoires et l'adresse mail doit être valide.

Après validation, un message de confirmation est affiché. Les données ne sont actuellement ni enregistrées dans une base de données ni envoyées par mail.

## Validation

Vérifier la syntaxe PHP avec :

```bash
php -l index.php
```

Lancer l'application avec :

```bash
php -S localhost:8000
```

## Conventions

- Conserver les libellés en français.
- Échapper les données utilisateur avec `htmlspecialchars`.
- Garder les modifications simples et limitées au besoin demandé.
