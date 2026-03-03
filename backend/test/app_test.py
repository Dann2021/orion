from flask import Flask, abort, jsonify, request
from flask_cors import CORS

# creation d'une instance de Flask
app = Flask(__name__)
CORS(app)


def eval_data(*args, **kwargs):
    if not kwargs:
        abort(400)
    return kwargs


# creation des routes
@app.get("/")
def hello():
    return jsonify({"message": "Hello world"})


@app.get("/<int:id>")
def get_id(id):
    return jsonify({"id_app": id})


@app.get("/<name>")
def get_name(name):
    message = f"Hello {name}"
    return jsonify({"message": message})


@app.get("/args")
def get_args():
    nom = request.args.get("nom")
    prenom = request.args.get("prenom")
    age = request.args.get("age")

    eval_data(nom, prenom, age)

    message = f"Salut je suis {prenom} {nom}, j'ai {age} ans"
    return jsonify({"message": message})


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
