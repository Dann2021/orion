import { AnimatePresence, motion } from 'framer-motion'
import { Bloc, Card, Input, Ligne } from '../../../composants'
import CardDatabase from './CardDatabase'

export default function CardDatabaseChoix({ selectedDb, setSelectedDb, dbConfig, setDbConfig, style, style2, DATABASES }) {
  return (
   
     <Bloc className={"ronde p-2"} style={style} type={"myn"} nombre={10}>
        <h3>Base de données</h3>
        <Ligne className={"jc-mil p-1 mb-2"}>
          {DATABASES.map((db) => (
            <CardDatabase
              style={style2}
              key={db.id}
              icone={db.icone}
              label={db.label}
              commande={db.commande}
              description={db.description}
              className={`db-card ${selectedDb === db.id ? "active" : ""}`}
              onClick={() => setSelectedDb(db.id)}
            />
          ))}
        </Ligne>

        <AnimatePresence mode="wait">
          {selectedDb !== "sqlite" && (
            <Card
              as={motion.form}
              key="db-form"
              initial={{ opacity: 0, y: -100 }} // 🔽 vient du haut
              animate={{ opacity: 1, y: 0 }} // centre
              exit={{ opacity: 0, y: 100 }} // 🔼 part vers le bas
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card.Corps className="ligne jc-mil gap-6">
                <Input
                  classNameSurcharge="bloc-myn-3 bloc-12 mb-2 bloc-pt-10"
                  dataType="arrondie"
                  simple
                  value={dbConfig.host}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, host: e.target.value })
                  }
                  placeholder="Hôte"
                  label="Hôte"
                />
                <Input
                  classNameSurcharge="bloc-myn-3 bloc-12 mb-2 bloc-pt-10"
                  dataType="arrondie"
                  simple
                  value={dbConfig.port}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, port: e.target.value })
                  }
                  placeholder="5432"
                  label="Port"
                />
                <Input
                  classNameSurcharge="bloc-myn-3 bloc-12 mb-2 bloc-pt-10"
                  dataType="arrondie"
                  simple
                  value={dbConfig.database}
                  onChange={(e) =>
                    setDbConfig({ ...dbConfig, database: e.target.value })
                  }
                  placeholder="Nom de la base de donnée"
                  label="Base de donnée"
                />
              </Card.Corps>
            </Card>
          )}
        </AnimatePresence>
      </Bloc>
  )
}
