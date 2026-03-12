import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "../classe";
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
  conteneurClassName,
  maxHeight = 300,
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
        String(v).toLowerCase().includes(valeurRechercher.toLowerCase()),
      ),
    );
  }, [valeurRechercher, data]);

  return (
    <div
      className={clsx(
        "mh-3 bloc-12 table-container  over-auto p-2",
        conteneurClassName,
      )}
      style={{ maxHeight: `${maxHeight}px`, width: "100%" }}
    >
    

      {/** Creation d'un input pour avoir la possibilité d'ajouter des filtres */}
      <div className="aff-flex jc-sb ai-mil gap-2 mh-2 mb-2">
        <div className="w-full">
          <Input
            dataType={"arrondie"}
            classNameSurcharge={"bloc-12 bloc-myn-5"}
            value={valeurRechercher}
            simple
            onChange={(e) => setValeurRechercher(e.target.value)}
          >
            <Search className="iconeElement" />
          </Input>
          <p className="taille-pt mh-1" style={{ color: "var(--text-muted)" }}>
            {filteredData.length} résultat(s)
          </p>
        </div>
      </div>

      {/** Element principale permettant de creer un tableau */}
      <table
        className="table table-striped ronde p-2 ta-gauche"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/** header */}
        <thead className="sticky p-1 haut-0 z-20">
          {/** ligne */}

          <tr>
            {/** parcourt des colonnes pour les affichers */}

            {colonnes.map((col, index) => (
              <th className="py-1 px-1 " key={index}>
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
              <tr key={index} className={clsx("curseur-pointeur")}>
                {/* parcourt des colonnes qui sont les différentes clés du tableau */}
                {colonnes.map((col) => (
                  <td
                    style={{
                      backgroundColor: valeurRechercher && "var(--bg-main)",
                    }}
                    className={clsx("taille-pt py-1 px-1")}
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
