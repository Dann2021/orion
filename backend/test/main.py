# ================== NORMALISATION ==================
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


schemas = [
    {
        "nom": "Projet",
        "attributs": {
            "nom": "String",
            "auteur": "String",
            "age": "Integer",
        },
    },
    {
        "nom": "Classe",
        "attributs": {
            "nom": "string",
            "prix": "Float",
            "num": "Integer",
            "modele": "JSON",
            "ecole": "String",
        },
    },
    {
        "nom": "Testeur",
        "attributs": {
            "nom": "string",
            "prix": "float",
            "num": "texte",
            "modele": "integer",
            "ecole": "bool",
        },
        "liaisons": ["users", "classe"],
    },
]


def normalize_model(models: dict) -> dict:
    """
    Normalise les types venant du frontend
    """
    attributs = {}
    for model in models:
        for nom, type_ in model["attributs"].items():
            attributs[nom] = TYPE_MAPPING.get(type_.lower(), type_)

        model["attributs"] = attributs
    return model


def normalise(models):

    # creation d'une liste
    liste = []

    # parcourt de models
    for model in models:

        # parcourt des attributs
        for _, valeur in model["attributs"].items():
            cle = TYPE_MAPPING.get(valeur)
            if cle:
                liste.append(cle)
    norme = list(set(liste))
    return norme


def type_utilise(models):

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
    return sans_doublons


sans_double = type_utilise(schemas)
norme = normalise(schemas)


print(f"sans_db : {sans_double}")
print(f"norme : {norme}")


# prototype pour utiliser les relations et liaisons dans les modeles
