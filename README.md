# Orion 🚀

Orion est un **générateur de backend** basé sur un **modèle JSON**.  
Il permet de créer rapidement une API backend complète (modèles, relations, schémas, routes CRUD) sans écrire du boilerplate répétitif.

L’objectif principal d’Orion est de **simplifier et accélérer le développement backend** tout en gardant une architecture claire et évolutive.

---

## ✨ Fonctionnalités principales

- Génération automatique de modèles SQLAlchemy
- Création de schémas Marshmallow (sérialisation / désérialisation)
- Gestion des relations (`one-to-many`, extensible)
- Relations **unilatérales** : définies une seule fois dans le modèle source
- Génération d’API CRUD prêtes à l’emploi
- Basé sur une configuration JSON simple et lisible

---

## 🧠 Principe de fonctionnement

Orion fonctionne à partir d’un **fichier JSON** décrivant :
- les classes (entités)
- leurs attributs
- leurs relations

Exemple simplifié :

```json
{
  "nom": "Utilisateur",
  "attributs": [
    { "nom": "username", "type": "string", "unique": true },
    { "nom": "email", "type": "string" }
  ],
  "relations": [
    {
      "type": "one_to_many",
      "source": "Utilisateur",
      "cible": "Article",
      "champ": "articles",
      "attribut_inverse": "auteur"
    }
  ]
}
