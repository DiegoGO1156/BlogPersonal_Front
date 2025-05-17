import  Navbar  from "../components/navbar/Navbar"
import useCourses from '../hooks/useCourses';
import CourseList from '../components/courses/CouresList';

export const HomePage = () => {
  const { courses, loading, error } = useCourses();

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>Error al cargar cursos: {error.message}</p>;

  return (
    <>
      <Navbar />
      <CourseList courses={courses} />
    </>
  );
};
