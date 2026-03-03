import { ActivityIcon } from "lucide-react";
import { Bloc } from "../../../composants";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function LogStatus({
  style,
  generateSuccess,
  generateError,
  configError,
  jsonError,
}) {
  return (
    <Bloc style={style} type="myn" nombre={10} className="ronde-1 p-2">
      <div className="aff-flex  ai-mil gap-3">
        <ActivityIcon />

        <h1>Log</h1>
      </div>

      <ul className="lst-aucun">
        {/* SUCCESS GENERATION */}
        {generateSuccess && (
          <motion.li
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="aff-flex ai-mil gap-3 mh-1"
          >
            <span className="tag-dot-2 bg-vert-sauge"></span>
            <span className="couleur-vert-sauge">
              {generateSuccess?.data?.message}
            </span>
          </motion.li>
        )}

        {/* ERREURS */}
        {(generateError || configError) && (
          <motion.li
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="aff-flex ai-mil gap-3 mh-1"
          >
            <span className="tag-dot-2 bg-rouge-cerise"></span>
            <span className="couleur-rouge-cerise">
              {generateError || configError}
            </span>
          </motion.li>
        )}

        {jsonError && (
          <motion.li
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="aff-flex ai-mil gap-3 mh-1"
          >
            <span className="tag-dot-2 bg-rouge-cerise"></span>
            <span className="couleur-rouge-cerise">{jsonError}</span>
          </motion.li>
        )}
      </ul>
    </Bloc>
  );
}
