import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/*export default function useDataGet(url, intervalMs = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    // lorsque le composant est monté
    let isMounted = true;

    const getData = async () => {
      try {
        const response = await axios.get(url, { withCredentials: true });

        if (isMounted) {
          setData(response.data);
          setErreur(null); // pas d’erreur => on efface les messages précédents
        }
      } catch (err) {
        console.error("Erreur API :", err);

        if (isMounted) {
          // extraction intelligente du message d’erreur
          const apiMessage =
            err.response?.data?.message || // message renvoyé par ton API Flask
            err.response?.data?.error || // au cas où l’API renvoie un autre champ
            err.message || // message Axios (réseau, timeout, etc.)
            "Erreur inconnue lors de la récupération des données.";

          setErreur(apiMessage);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, erreur, loading };
}*/

export default function useDataGet(url, intervalMs = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(url, { withCredentials: true });
      setData(response.data);
      setErreur(null);
    } catch (err) {
      const apiMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Erreur inconnue lors de la récupération des données.";
      setErreur(apiMessage);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getData();

    // si intervalle défini, on relance la requête périodiquement
    let intervalId;
    if (intervalMs) {
      intervalId = setInterval(getData, intervalMs);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [url, intervalMs, getData]);

  return { data, erreur, loading, refresh: getData };
}
