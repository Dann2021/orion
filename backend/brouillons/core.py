from jinja2 import Environment, FileSystemLoader, select_autoescape  # type: ignore
import os

# ================== PATHS ==================

# dossier backend/
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# backend/templates/
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")

# backend/generations/
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


# ================== NORMALISATION ==================

TYPE_MAPPING = {
    "string": "String",
    "integer": "Integer",
    "float": "Float",
    "boolean": "Boolean",
    "date": "Date",
}


def normalize_model(model: dict) -> dict:
    """
    Normalise les types venant du frontend
    """
    attributs = {}

    for nom, type_ in model["attributs"].items():
        attributs[nom] = TYPE_MAPPING.get(type_.lower(), type_)

    model["attributs"] = attributs
    return model


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


# ================== BLUEPRINT ==================


def fabrique_blueprint(model: dict) -> str:
    """
    Génère le nom du blueprint Flask
    """
    return f"{model['nom'].lower()}_bp"


#
# 🔗 FK vers Projet
# projet_id = Column(Integer, ForeignKey("projets.id"), nullable=False)


# 🔗 LIAISON : N Classes -> 1 Projet
# projet = relationship("Projet", back_populates="classes")
def fabrique_liaison(modele):

    dico = {"nom": "Testeur", "liaisons": ["users", "pomme"]}
    for cle, valeur in dico.items():
        if cle == "liaisons":
            # on parcourt valeur de liaisons qui est une liste
            for element in valeur:
                print(
                    f"relationship('{element.capitalize()}', back_populates='{element}'))"
                )


fabrique_liaison("teste")
