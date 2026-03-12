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
        "relations": [
            {
                "type": "one_to_many",
                "source": "Enfant",
                "cible": "PetitEnfant",
                "champ": "petit_enfants",
                "attribut_inverse": "enfant",
            }
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
template = env.get_template("macro.py.jinja")

# 3️⃣ Accéder aux macros comme un module
macros = template.module

# 4️⃣ Tester la macro
relations = [{"source": "Utilisateur", "cible": "Publication"}]

classe = {"nom": "Publication"}


# Ajout d'un filtre
def filtre_rel(relations, classe):
    rel_cible = [rel for rel in relations if rel["cible"] == classe["nom"]]
    return rel_cible


# result = macros.route_path(relations, classe)  # type: ignore


# print(result)

# for mod in models:
#    r = macros.create_route(mod)  # type: ignore
#    print(r)

"""for indice, mod in enumerate(models):
    try:
        r = filtre_rel(mod["relations"], mod)
    except KeyError as k:
        print(f"Key (cette clé n'existe pas) : {k}")
    print(f"[{indice}] -> {mod['nom']}")
    print(r)
    print(
        "".center(
            50,
            "=",
        )
    )

for i, v in enumerate(models):
    try:
        rel = v["relations"]
    except KeyError:
        print("Cette clé n'existe pas")
    for r in rel:
        if r["cible"] == v["nom"]:
            print(f"Enfant : {v['nom']}")

        else:
            print(f"Parent : {v['nom']}")

    print("".center(50, "="))

print(f"all : {all_relations}")

for mod in models:
    r = macros.create_route_block(mod, all_relations)  # type: ignore
    print(r)
"""

#

for mod in models:
    print("".center(50, "="))
    print(f"modele : [{mod['nom']}]")
    r = macros.genere_import(mod, all_relations, True)
    print(r)
    print("".center(50, "="))
