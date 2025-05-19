import { useState, useEffect } from 'react';
import { 
  getPublicationsByCourseName, 
  createPublication 
} from '../services/api';

export const useCoursePublications = (courseName) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublications = async () => {
    try {
      setLoading(true);
      const data = await getPublicationsByCourseName(courseName);
      setPublications(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addPublication = async (publicationData) => {
    try {
      const newPublication = await createPublication({
        ...publicationData,
        course: courseName
      });
      setPublications(prev => [newPublication, ...prev]);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || err.message 
      };
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [courseName]);

  return { 
    publications, 
    loading, 
    error, 
    addPublication,
    refresh: fetchPublications
  };
};