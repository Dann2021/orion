
import { ORION_ATTRIBUT_SCHEMA } from "./orion.attribut";
import { ORION_RELATION_SCHEMA } from "./orion.relation";

export const ORION_MODELS_SCHEMA = {
  uri: "http://orion/schema/models.json",
  fileMatch: ["*"],
  schema: {
    type: "array",
    items: {
      type: "object",
      required: ["nom", "attributs"],
      additionalProperties: false,

      properties: {
        nom: {
          type: "string",
          description: "Nom du modèle"
        },

        attributs: {
          type: "array",
          items: ORION_ATTRIBUT_SCHEMA
        },

        relations: {
          type: "array",
          items: ORION_RELATION_SCHEMA
        }
      }
    }
  }
};
