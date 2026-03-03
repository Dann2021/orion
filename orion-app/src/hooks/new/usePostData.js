import axios from "axios";
import { useCallback, useState } from "react";

export default function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const postData = useCallback(
    async (url, data) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await axios.post(url, data, {
          withCredentials: true,
        });

        setSuccess(response.data);
        return response.data; // 🔥 important
      } catch (err) {
        console.error("Erreur API :", err);

        const apiError =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Erreur inconnue.";

        setError(apiError);
        throw err; // 🔥 permet le try/catch dans ton handler
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, success, postData };
}