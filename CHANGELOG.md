# changelog

## [1.0.1] - 02-01-2026
### Ajout
- Ajout des templates dans le backend 

### Correctif
- Correction du fichier modele

## [1.0.2] - 03-03-2026
### Ajout
- Modification de la base de donnée et du modele.py
- Integration de marshmallow pour la serialisation
- Integration des schémas pour les modèles de la base de données
- Modification du frontend

## [1.0.3] - 12-03-2026

### Frontend
- Amélioration du processus de création de projet.
- Le formulaire de création de projet n'est plus affiché directement sur la page.
- Le formulaire est désormais affiché dans une fenêtre modale.
- Ajout d’un bouton permettant d’ouvrir le formulaire de création.

### Backend
- Refactorisation de l’architecture de génération des routes API.
- La logique CRUD qui était auparavant regroupée dans `route_api.py.jinja` a été séparée en plusieurs modules :
  - `post/`
  - `get/`
  - `put/`
  - `delete/`
- Introduction d’un nouveau fichier `route_api2.py.jinja` qui centralise et importe les différentes logiques de routes.
- Amélioration de la maintenabilité et de l’organisation du générateur d’API.
