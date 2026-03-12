from jinja2 import Environment, FileSystemLoader  # type: ignore

# 1️⃣ Charger l'environnement
env = Environment(
    loader=FileSystemLoader(
        "/home/dannsloann/Bureau/app_react/orion/backend/test/test/templates"
    )
)

models = [
    {
        "nom": "Parent",
        "attributs": [
            {"nom": "nom", "type": "string"},
            {
                "nom": "email",
                "type": "string",
            },
            {"nom": "role", "type": "string", "default": "admin"},
        ],
        "relations": [
            {
                "type": "one_to_many",
                "source": "Parent",
                "cible": "Enfant",
                "champ": "enfants",
                "attribut_inverse": "parent",
            }
        ],
    },
    {
        "nom": "Enfant",
        "attributs": [
            {"nom": "titre", "type": "string"},
            {"nom": "contenu", "type": "texte"},
            {"nom": "date_creation", "type": "date"},
            {"nom": "is_public", "type": "bool"},
        ],
    },
    {
        "nom": "PetitEnfant",
        "attributs": [
            {"nom": "titre", "type": "string"},
            {"nom": "maison_edition", "type": "string"},
        ],
    },
]


all_relations = []

for m in models:
    if "relations" in m:
        all_relations.extend(m["relations"])

# 2️⃣ Charger le template
template = env.get_template("macro2.py.jinja")

# 3️⃣ Accéder aux macros comme un module
macros = template.module


# Ajout d'un filtre
def filtre_rel(relations, classe):
    rel_cible = [rel for rel in relations if rel["cible"] == classe["nom"]]
    return rel_cible


for mod in models:
    print("".center(50, "="))
    print(f"modele : [{mod['nom']}]")
    r = macros.genere_import(mod, all_relations, False, True)
    print(r)
    print("".center(50, "="))


print("".center(60, "-"))
for mod in models:
    print("".center(50, "="))
    print(f"modele : [{mod['nom']}]")
    r = macros.create_route_block_get_all(mod, all_relations, False, True)
    print(r)
    print("".center(50, "="))
print("".center(60, "-"))
