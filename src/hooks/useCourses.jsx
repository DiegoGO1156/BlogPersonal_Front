import { useState, useEffect } from 'react';
import { getCourses } from '../services/api';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        //console.log('Cursos recibidos en hook:', data); // ✅ Log aquí
        setCourses(data);
      } catch (err) {
        setError(err);
        console.error('Error al obtener cursos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;
