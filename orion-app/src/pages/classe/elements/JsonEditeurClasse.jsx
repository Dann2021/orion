import { motion } from 'framer-motion'
import { Download, Hammer } from 'lucide-react'
import { Bouton, Card } from '../../../composants'
import JsonEditor from '../../../composants/JsonEditor'

export default function JsonEditeurClasse({style, jsonValue, handleJsonChange, handleGenerateAndSave, jsonError, isActive, nomProjet, downloadBackend, estModifiable}) {
  return (
     <Card
        as={motion.pre}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3 }}
        style={style}
        className="ronde-1 p-2 bloc-myn-10 json-preview"
      >
        <Card.Header>
          <h2>Format JSON </h2>
        </Card.Header>
        

        <Card.Corps className="p-1">
          <JsonEditor
            editer={!estModifiable}
            value={jsonValue}
            onChange={handleJsonChange}
          />

          {jsonError && (
            <p className="couleur-rouge-cerise mh-2">{jsonError}</p>
          )}
        </Card.Corps>

        <Card.Bas className="mh-2 aff-flex jc-fin gap-5">
          <Bouton
            onClick={handleGenerateAndSave}
            theme="prime"
            className="ronde-1 bouton-icone"
          >
            <Hammer size={20} />
            Générez
          </Bouton>

          {isActive && (
            <Bouton
              theme="sombre"
              className={"bouton-icone ronde-1"}
              onClick={() => downloadBackend(nomProjet)}
            >
              <Download size={16} className="ml-1" />
              Télécharger
            </Bouton>
          )}
        </Card.Bas>
      </Card>

  )
}
