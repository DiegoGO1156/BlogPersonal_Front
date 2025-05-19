import { useNavigate } from "react-router";

const CourseItem = ({ course }) => {

  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Navegar a la página de publicaciones del curso
    navigate(`/courses/${encodeURIComponent(course.courseName)}/publications`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Encabezado con estado */}
      <div className={`px-4 py-2 ${course.status ? 'bg-green-100' : 'bg-gray-100'}`}>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.status ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
          {course.status ? 'Activo' : 'Inactivo'}
        </span>
      </div>
      
      {/* Contenido principal */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{course.courseName}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        
        {/* Media (si existe) */}
        {course.media && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Contenido multimedia disponible</span>
          </div>
        )}
        
        {/* Botón de acción */}
        <button onClick={handleViewDetails} className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300">
         Ver detalles
        </button>
      </div>
    </div>
  );
};

export default CourseItem;