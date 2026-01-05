import axios from "axios";
import { useState, useCallback } from "react";

export default function useDataPost(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const postData = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await axios.post(url, data, { withCredentials: true });
        setSuccess(response.data);
      } catch (err) {
        console.error("Erreur API :", err);

        const apiError =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Erreur inconnue lors de la requête.";

        setError(apiError);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { loading, error, success, postData };
}
