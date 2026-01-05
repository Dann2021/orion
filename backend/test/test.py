TYPE_MAPPING = {
    "string": "String",
    "integer": "Integer",
    "float": "Float",
    "bool": "Boolean",
    "date": "Date",
    "texte": "Text",
    "datetime": "DateTime",
    "json": "JSON",
}


def parseur_modele(model, type_mapping):

    # on cree un liste vide qui contiendra tous les attributs
    attributs = []
    # le modele est une classe definie sous forme de dictionnaire (json)
    # on identifie la cible (attributs)
    for attribut in model["attributs"]:
        # ici on accède à attribut et donc on doit normaliser le type
        # on parcourt le dictionnaire attribut

        for cle, valeur in attribut.items():
            if cle == "type":
                attribut[cle] = type_mapping.get(valeur.lower(), valeur)
        attributs.append(attribut)

    model["attributs"] = attributs
    return model


modele = [
    {
        "nom": "Projet",
        "attributs": [
            {"nom": "nom", "unique": True, "type": "string"},
            {"nom": "prenom", "unique": True, "type": "string"},
            {"nom": "age", "unique": True, "type": "integer"},
            {"nom": "date", "unique": True, "type": "date"},
        ],
        "relations": [
            {
                "type": "one_to_many",
                "source": "Projet",
                "cible": "Classe",
                "champ": "classes",
                "attribut_inverse": "projet",
            }
        ],
    },
    {
        "nom": "Classe",
        "attributs": [
            {"nom": "age", "unique": True, "type": "integer"},
            {"nom": "enVie", "unique": True, "type": "bool"},
        ],
    },
]


attrbs = [parseur_modele(model=model, type_mapping=TYPE_MAPPING) for model in modele]

# print(f"attrs : {attrbs}")


def parseur_modele2(schema: dict, type_mapping: dict) -> dict:
    """
    Parse et normalise un modèle venant du frontend
    Retourne un schéma Orion officiel
    """

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

        model["attributs"].append(
            {
                "nom": attr["nom"],
                "type": type_mapping.get(attr["type"].lower(), attr["type"]),
                "unique": attr.get("unique", False),
                "nullable": attr.get("nullable", True),
                "default": attr.get("default"),
                "index": attr.get("index", False),
                "primary_key": attr.get("primary_key", False),
            }
        )

    return model


"""def type_utilises(models):

    types = set()

    # types obligatoires
    types.add("Integer")

    for model in models:
        for attributs in model["attributs"]:

            #
            for cle, valeur in attributs.items():

                if cle == "type":
                    types.add(valeur)
    return sorted(types)"""


def type_utilises(models):
    types = {"Integer"}  # type obligatoire par défaut

    for model in models:
        for attribut in model.get("attributs", []):
            type_attr = attribut.get("type")
            if type_attr:
                types.add(type_attr)

    return sorted(types)


types_used = type_utilises(models=modele)
attrbs = [parseur_modele2(schema=model, type_mapping=TYPE_MAPPING) for model in modele]

# print(f"attrs2 : {attrbs}")
print(f"type : {types_used}")


def parseur_modele3(schema: dict, type_mapping: dict) -> dict:

    # Parse et normalise un modèle venant du frontend
    # Retourne un schéma Orion officiel

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

        model["attributs"].append(
            {
                "nom": attr["nom"],
                "type": type_mapping.get(attr["type"].lower(), attr["type"]),
                "unique": attr.get("unique", False),
                "nullable": attr.get("nullable", True),
                "default": attr.get("default"),
                "index": attr.get("index", False),
                "primary_key": attr.get("primary_key", False),
            }
        )

    return model
