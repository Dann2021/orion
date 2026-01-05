import os
from jinja2 import Environment, FileSystemLoader, select_autoescape
from mapping import TYPE_MAPPING

# ================== PATHS ==================

# dossier backend/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# backend/templates/
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

# backend/projets/
GENERATIONS_DIR = os.path.join(BASE_DIR, "projets")


# ================== JINJA ==================

env = Environment(
    loader=FileSystemLoader(TEMPLATES_DIR),
    autoescape=select_autoescape(),
    trim_blocks=True,
    lstrip_blocks=True,
    extensions=["jinja2.ext.do"],
)


# ================== UTILS ==================


def ensure_dir(path: str) -> str:
    """
    Crée un dossier s'il n'existe pas
    """
    os.makedirs(path, exist_ok=True)
    return path


def projet_dir(nom_projet: str) -> str:
    """
    Dossier racine du backend généré
    ex: generations/new_mon_projet
    """
    return ensure_dir(os.path.join(GENERATIONS_DIR, nom_projet))


# ================== GENERATEUR ==================


def generateur(
    template_name: str, contexte: dict, chemin_sortie: str, nom_fichier: str
):
    """
    Génère un fichier depuis un template Jinja
    """
    ensure_dir(chemin_sortie)

    template = env.get_template(template_name)
    rendu = template.render(**contexte)

    chemin_fichier = os.path.join(chemin_sortie, nom_fichier)

    with open(chemin_fichier, "w", encoding="utf-8") as f:
        f.write(rendu)

    return chemin_fichier


# fonction proposé par ia
def type_utilise(models):
    types = set()

    # types techniques obligatoires
    types.add("Integer")

    for mod in models:
        for _, valeur in mod.get("attributs", {}).items():
            types.add(valeur)

    return sorted(types)


def type_utilises(models):
    types = {"Integer"}  # type obligatoire par défaut

    for model in models:
        for attribut in model.get("attributs", []):
            type_attr = attribut.get("type")
            if type_attr:
                types.add(type_attr)

    return sorted(types)


# ================== BLUEPRINT ==================


def fabrique_blueprint(model: dict) -> str:
    """
    Génère le nom du blueprint Flask
    """
    return f"{model['nom'].lower()}_bp"


# ================== Normalisation 2 =========================
def normalisation_model(model: dict, type_mapping, cible) -> dict:
    """
    Normalise les types venant du frontend
    Ici il s'agit de faire des donnees de base avec d'autres donnees.

    Dans un modele  classique on a :

        modele = {
                    ...
                    "attributs" : {
                        "nom" : "string",
                        "age" : "integer"
                    }
                }

    On va faire correspondre chaque type des variables (attributs) par son type correspondant dans  sqlalchemy
    """
    elements = {}

    for nom, type_ in model[cible].items():
        elements[nom] = type_mapping.get(type_.lower(), type_)

    model[cible] = elements
    return model


def normalize_relations(models: list, key: str = "relations") -> list:
    """
    Aplatie toutes les relations avec leur contexte
    """
    relations = []

    for model in models:
        model_name = model.get("nom")

        for rel in model.get(key, []):
            relations.append(
                {
                    "source": model_name,
                    "type": rel.get("type"),
                    "cible": rel.get("cible"),
                    "champ": rel.get("champ"),
                    "attribut_inverse": rel.get("attribut_inverse"),
                    "nullable": rel.get("nullable", True),
                    "through": rel.get("through"),
                }
            )

    return relations


def parseur_modele(schema: dict, type_mapping: dict) -> dict:
    if not isinstance(schema, dict):
        raise TypeError("Le schéma doit être un dictionnaire")

    model = {
        "nom": schema["nom"],
        "attributs": [],
        "relations": schema.get("relations", []),
    }

    attributs = schema.get("attributs", [])

    if not isinstance(attributs, list):
        raise TypeError("Les attributs doivent être une liste")

    for attr in attributs:
        if not isinstance(attr, dict):
            raise TypeError("Chaque attribut doit être un dictionnaire")

        parsed_attr = {
            "nom": attr["nom"],
            "type": type_mapping.get(attr["type"].lower(), attr["type"]),
        }

        # ⚠️ on n’ajoute QUE ce qui existe réellement
        if "unique" in attr:
            parsed_attr["unique"] = attr["unique"]

        if "nullable" in attr:
            parsed_attr["nullable"] = attr["nullable"]

        if "index" in attr:
            parsed_attr["index"] = attr["index"]

        if "primary_key" in attr:
            parsed_attr["primary_key"] = attr["primary_key"]

        if "default" in attr:
            parsed_attr["default"] = attr["default"]

        model["attributs"].append(parsed_attr)

    return model
