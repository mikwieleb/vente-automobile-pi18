# vente-automobile-pi18

Cette app permet de tester l'intégration du paiement Pi via Pi Browser sur le testnet.

## Fonctionnalités

- Bouton pour payer 0,001 Pi
- Validation côté serveur (`/api/approve` et `/api/complete`)
- Bouton pour ouvrir l'application principale

## Lien Vercel

> https://vente-automobile-pi-g6hd.vercel.app

## Structure API

- `POST /api/approve` – approuve le paiement
- `POST /api/complete` – finalise la transaction

Déployé automatiquement via Vercel à chaque push sur GitHub.
