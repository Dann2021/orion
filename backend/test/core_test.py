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


def normalize_model(model: dict) -> dict:
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
    attributs = {}

    for nom, type_ in model["attributs"].items():
        attributs[nom] = TYPE_MAPPING.get(type_.lower(), type_)

    model["attributs"] = attributs
    return model


# ================== GENERATEUR ==================


def extraire_type_utilise(models: list[dict], type_mapping: dict) -> list[str]:
    """
    Retourne la liste des types SQLAlchemy utilisés dans tous les modèles
    """
    used_types = set()

    for model in models:
        for type_ in model["attributs"].values():
            normalized = type_mapping.get(type_.lower())
            if normalized:
                used_types.add(normalized)

    return sorted(used_types)


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


# Ma fonction à moi
"""def type_utilise(models):

    # on cree une liste vide qui contiendra tous les types
    list_type = []

    # on parcourt models
    for mod in models:

        # on parcourt les attributs
        for _, valeur in mod["attributs"].items():
            # on ajoute les valeurs dans la list_type

            list_type.append(valeur)

    # on copie la liste
    sans_doublons = list(set(list_type))
    # sans_doublons = list_type
    return sans_doublons"""


# fonction proposé par ia
def type_utilise(models):
    types = set()

    # types techniques obligatoires
    types.add("Integer")

    for mod in models:
        for _, valeur in mod.get("attributs", {}).items():
            types.add(valeur)

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


def norme_relation(models: list, cible):

    relations = []

    # ici on parcourt models
    for model in models:

        """ici on est dans un modele de la liste et
        on cherche dans ce modele la liste de relation
        """
        try:
            relation_dans_modele = model[cible]
        except KeyError:
            return "Erreur de clé"
        finally:
            for element in relation_dans_modele:

                # on ajoute tous les elements dans une liste de relation
                relations.append(element)
    return relations


def norme_relation2(models: list, cible):
    relations = {}

    for model in models:
        if cible not in model:
            continue

        relations.update({f"relation_{model['nom'].lower()}": model[cible]})

    return relations


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
