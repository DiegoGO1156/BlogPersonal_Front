import { useState, useEffect } from 'react';
import { getPublicationById } from '../services/api';

export const usePublicationDetail = (id) => {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublicationById(id);
        setPublication(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [id]);

  return { publication, loading, error };
};