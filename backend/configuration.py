TEMPLATE_MODELE = {
    "modeles": {
        "template": "modele.py.jinja",
        "sortie": "modeles",
        "fichier": "models.py",
    },
    "routes": {"template": "route_api.py.jinja", "sortie": "routes", "fichier": None},
    "extensions": {
        "template": "extensions.py.jinja",
        "sortie": ".",
        "fichier": "extensions.py",
    },
    "config": {"template": "config.py.jinja", "sortie": ".", "fichier": "config.py"},
    "database": {
        "template": "database.py.jinja",
        "sortie": ".",
        "fichier": "database.py",
    },
    "app": {"template": "app.py.jinja", "sortie": ".", "fichier": "app.py"},
}
