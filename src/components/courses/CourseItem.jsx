import { useNavigate } from "react-router";

const CourseItem = ({ course }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/courses/${encodeURIComponent(course.courseName)}/publications`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 border border-gray-100 group">
      {/* Encabezado con estado animado */}
      <div className={`px-4 py-3 ${course.status ? 'bg-gradient-to-r from-green-100 to-emerald-50' : 'bg-gradient-to-r from-gray-100 to-gray-50'} transition-colors duration-500`}>
        <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${course.status ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'} transition-all duration-300 group-hover:scale-105`}>
          {course.status ? (
            <>
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Activo
            </>
          ) : (
            'Inactivo'
          )}
        </span>
      </div>
      
      {/* Contenido principal con animación de aparición */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 transition-all duration-300 group-hover:text-indigo-600">
          {course.courseName}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3 transition-all duration-500 group-hover:text-gray-800">
          {course.description}
        </p>
        
        {/* Media con animación de hover */}
        {course.media && (
          <div className="flex items-center text-sm text-gray-500 mb-4 transition-all duration-300 group-hover:text-indigo-500">
            <div className="relative">
              <svg className="w-5 h-5 mr-2 transition-all duration-300 group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="absolute top-0 left-0 w-5 h-5 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-all duration-1000"></span>
            </div>
            <span>Contenido multimedia disponible</span>
          </div>
        )}
        
        {/* Botón con efecto de gradiente animado */}
        <button 
          onClick={handleViewDetails}
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 relative overflow-hidden group-hover:scale-[1.02]"
        >
          <span className="relative z-10 flex items-center justify-center">
            Ver detalles
            <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </button>
      </div>
      
      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default CourseItem;  