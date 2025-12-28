/*const donnees = [
    {
        id:1,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:2,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
     {
        id:3,
        depart:"Gabon",
        destination: "guinee",
        date_vol: "20/05/2025",
        kilos:"25",
        prix:"test",
        puces: "Airtel"
    },
]

*/

import Spinner from "./Spinner";

export default function Tableau({ datas, chargement, className = "" }) {
  // ici on extrait le premier element pour recuperer ces cles
  // qui seront des labels pour notre tableau

  // extraction des cles du premiers elements de notre liste
  const labels = Object.keys(datas[0]);

  const tableStyle = {
    conteneur: {
      width: "100%", // ajouter le 11/07/2025
      maxHeight: "200px",
      overflow: "auto",
      //backgroundColor: "#f5f5f5", // clair : presque blanc, sombre : presque noir
      //color: "#222", // texte noir en clair, gris clair en sombre
      //boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },

    th: {
      //backgroundColor: theme === 'claire' ? "#eeeeee" : "#2c2c2c", // en clair : gris très léger, en sombre : gris foncé
      // color: "#000000", // texte noir en clair, blanc en sombre
      borderBottom: "1px solid #ddd", // bordure adaptée
    },
    td: {
      //color: "#333333", // texte foncé en clair
      borderBottom: "1px solid #ddd", // idem
    },

    ligneSurvol: {
      backgroundColor: "#f0f0f0", // survol plus léger en mode clair
    },
  };

  if (!datas || datas.length === 0) {
    return <p>Aucune donnée disponible</p>;
  }

  return (
    <div
      className={`bloc-12 bloc-pt-12 bloc-myn-12 mh-3 fira ${className}`}
      style={tableStyle.conteneur}
    >
      {chargement ? (
        <Spinner taille={20} type={1} />
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {labels.map((element, index) => (
                <th
                  className="ta-gauche  py-1 px-1 couleur-bleu-ciel"
                  //style={tableStyle.th}
                  key={index}
                >
                  {element}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datas.map((element, indice) => (
              <tr
                className="curseur-pointeur couleur-bleu-acier"
                key={indice}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    tableStyle.ligneSurvol.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                {labels.map((label) => (
                  <td
                    className="ta-gauche p-1 taille-pt "
                    style={tableStyle.td}
                    key={label}
                  >
                    {element[label]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
