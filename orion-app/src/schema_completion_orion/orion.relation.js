export const ORION_RELATION_SCHEMA = {
  type: "object",
  required: ["source", "type", "cible"],
  additionalProperties: false,

  properties: {
    source: {
      type: "string",
      description: "Modèle source"
    },

    type: {
      type: "string",
      enum: [
        "one_to_one",
        "one_to_many",
        "many_to_one",
        "many_to_many"
      ],
      description: "Type de relation"
    },

    cible: {
      type: "string",
      description: "Modèle cible"
    },

    champ: {
      type: "string",
      description: "Nom du champ relationnel"
    },

    attribut_inverse: {
      type: "string",
      description: "Champ inverse dans le modèle cible"
    },

    nullable: {
      type: "boolean",
      default: false
    }
  }
};
