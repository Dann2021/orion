# 🚀 Orion

**Orion** est un **outil de génération et d’orchestration de projets** destiné aux développeurs qui souhaitent créer rapidement des applications **backend et frontend** à partir d’une **description structurée (JSON)**.

Son objectif est de **réduire le temps de développement**, **standardiser l’architecture des projets** et **automatiser les tâches répétitives**, tout en laissant au développeur un contrôle total sur le code généré.

---

## 🎯 Vision du projet

Orion a pour ambition de devenir :

- Un **générateur intelligent de projets** (backend & frontend)
- Une base solide pour un futur **outil low-code / no-code**
- Un **framework utilitaire** améliorant fortement la productivité des développeurs

---

## ✨ Fonctionnalités

### 🔧 Génération Backend
- Génération automatique de :
  - Modèles **SQLAlchemy**
  - Relations ORM (One-to-Many, Many-to-Many, etc.)
  - API **CRUD** (Create, Read, Update, Delete)
- Architecture backend Flask claire et modulaire
- Support de plusieurs bases de données :
  - SQLite
  - PostgreSQL
  - MySQL

### 🧱 Orchestration de projet
- Génération automatique de l’arborescence du projet
- Séparation claire des responsabilités :
  - models
  - routes
  - services
  - config
- Génération basée sur un **schéma JSON déclaratif**

### 🌐 Frontend (en évolution)
- Interface web pour définir les projets et modèles
- Génération de projets frontend (React)
- Synchronisation frontend ↔ backend

---

## 🛠️ Technologies utilisées

### Backend
- Python
- Flask
- SQLAlchemy
- Jinja2

### Frontend
- React.js
- Vite
- JavaScript / TypeScript (prévu)

### Autres
- Git / GitHub
- JSON (schéma de description)

---

## 📦 Installation

### ✅ Prérequis
- Python **3.10+**
- Node.js **18+**
- Git

---

### 🔙 Backend

```bash
git clone https://github.com/Dann2021/orion.git
cd orion
python -m venv .orion
source .orion/bin/activate
pip install -r requirements.txt
