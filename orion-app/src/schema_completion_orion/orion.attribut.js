export const ORION_ATTRIBUT_SCHEMA = {
  type: "object",
  required: ["nom", "type"],
  additionalProperties: false,

  properties: {
    nom: {
      type: "string",
      description: "Nom de l’attribut"
    },

    type: {
      type: "string",
      enum: ["string", "integer", "float", "bool", "date", "datetime", "texte"],
      description: "Type de donnée"
    },

    nullable: {
      type: "boolean",
      default: false
    },

    unique: {
      type: "boolean",
      default: false
    },

    index: {
      type: "boolean",
      default: false
    },

    primary_key: {
      type: "boolean",
      default: false
    },

    default: {
      description: "Valeur par défaut",
      anyOf: [
        { type: "string" },
        { type: "number" },
        { type: "boolean" },
        { type: "null" }
      ]
    }
  }
};
