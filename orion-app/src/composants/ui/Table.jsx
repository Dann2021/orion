import { ChevronDown, Menu, MoreHorizontal, Search } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "../classe";
import Bouton from "./Bouton";
import Dropdown from "./Dropdown";
import Input from "./Input";

/**
 *  data :  Liste des données à afficher dans le tableau
 *  actions : Liste des actions à faire dans le tableau
 *  conteneurClassName : Style du conteneur où se trouve le tableau (element parent)
 *  maxHeight : Hauteur maximale du composant
 *
 */
export default function Table({
  data = [],
  actions = [],
  conteneurClassName,
  maxHeight = 300,
  label,
}) {
  // recuperations des noms des colonnes
  // colonnes (protégé contre tableau vide)
  const colonnes = data.length > 0 ? Object.keys(data[0]) : [];
  const [valeurRechercher, setValeurRechercher] = useState("");

  // Filtrage des données
  const filteredData = useMemo(() => {
    if (!valeurRechercher) return data;
    return data.filter((el) =>
      Object.values(el).some((v) =>
        String(v).toLowerCase().includes(valeurRechercher.toLowerCase())
      )
    );
  }, [valeurRechercher, data]);

  return (
    <div
      className={clsx("mh-3 bloc-12  over-auto", conteneurClassName)}
      style={{ maxHeight: `${maxHeight}px`, width: "100%" }}
    >
      {/*<h1>Un tableau</h1>*/}

      {/** Creation d'un input pour avoir la possibilité d'ajouter des filtres */}
      <div className="aff-flex jc-sb ai-mil gap-2 mh-2 mb-2">
        <div className="col gap-2">
          <input
            placeholder="Saisir un mot clé"
            type="text"
            value={valeurRechercher}
            onChange={(e) => setValeurRechercher(e.target.value)}
            className="p-1 ronde bord-1  bord-solid bord-gris"
          />
          <Input
            dataType={"arrondie"}
            value={valeurRechercher}
            simple
            onChange={(e) => setValeurRechercher(e.target.value)}
          >
            <Search />
          </Input>
          <p className="taille-pt couleur-gris">
            {filteredData.length} résultat(s)
          </p>
        </div>

        <div className="aff-flex jc-sb gap-3 ai-mil">
          <Dropdown
            contenuClassName={"theme-claire"}
            label={label}
            labelClassName={"aff-flex bg-gris-claire p-1 gap-2 ronde ai-mil"}
            icone={<ChevronDown size={16} />}
          >
            {actions.map((element) => (
              <li
                key={element.id}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                className={clsx(
                  "aff-flex ai-mil gap-3 p-1 taille-pt p-1 mb-1 ronde-1 curseur-pointeur",
                  element.className
                )}
              >
                {element.icone} <span>{element.label}</span>
              </li>
            ))}
          </Dropdown>

          <Bouton theme="claire" taille={"min"} className={"ronde-1"}>
            <MoreHorizontal size={18} />
          </Bouton>
        </div>
      </div>

      {/** Element principale permettant de creer un tableau */}
      <table
        className="bg-gris-clair theme-claire ronde p-2 ta-gauche"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/** header */}

        <thead className="sticky p-1 haut-0 bg-gris-claire z-20">
          {/** ligne */}

          <tr>
            {/** parcourt des colonnes pour les affichers */}

            {colonnes.map((col, index) => (
              <th
                style={{ borderBottom: "1px solid #ddd" }}
                className="py-1 px-1 "
                key={index}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/** body */}
        <tbody>
          {/* ligne */}
          {/* parcourt du tableau principale pour avoir ses principaux éléments */}

          {/* parcourt du tableau filtré */}
          {filteredData.length > 0 ? (
            filteredData.map((element, index) => (
              <tr
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
                key={index}
                className={clsx("curseur-pointeur")}
              >
                {/* parcourt des colonnes qui sont les différentes clés du tableau */}
                {colonnes.map((col) => (
                  <td
                    style={{ borderBottom: "1px solid #ddd" }}
                    className={clsx(
                      "taille-pt py-1 px-1",
                      valeurRechercher ? "bg-blanc-menthe" : ""
                    )}
                    key={col}
                  >
                    {element[col]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colonnes.length} className="ta-mil p-2">
                Aucune donnée trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
