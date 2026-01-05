import os
import shutil
from flask import send_file, Blueprint

# import du generation_dir du core.py
from core import GENERATIONS_DIR

download_bp = Blueprint("download", __name__)

GENERATED_DIR = "generated_projects"
ZIP_DIR = "projet_genere_zips"


@download_bp.route("/download/<nom_projet>", methods=["GET"])
def download_project(nom_projet):
    project_path = os.path.join(GENERATIONS_DIR, nom_projet)
    zip_path = os.path.join(ZIP_DIR, f"{nom_projet}.zip")

    os.makedirs(ZIP_DIR, exist_ok=True)

    if not os.path.exists(project_path):
        return {"error": "Projet introuvable"}, 404

    shutil.make_archive(zip_path.replace(".zip", ""), "zip", project_path)

    return send_file(zip_path, as_attachment=True, download_name=f"{nom_projet}.zip")
