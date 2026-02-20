from flask import jsonify


# fichier utilitaires
def reponse_json(data=None, meta=None, status=200):
    return jsonify({
        "status": "success", 
        "data": data, 
        "meta": meta or {}
        }
        ), status



# Fichier utils.py créé automatiquement par Dannys Santos