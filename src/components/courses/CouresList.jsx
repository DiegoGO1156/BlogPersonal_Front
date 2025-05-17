import CourseItem from './CourseItem';

const CourseList = ({ courses }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Nuestros Cursos</h1>
      
      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay cursos disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseItem key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;