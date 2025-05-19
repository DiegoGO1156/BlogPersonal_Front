const PublicationBlock = ({ publication }) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 relative overflow-hidden">
      {/* Efecto de fondo al hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      {/* Título con animación */}
      <h3 className="font-semibold text-gray-800 text-lg mb-2 transition-all duration-300 group-hover:text-indigo-600">
        {publication.title}
      </h3>
      
      {/* Información del autor con animaciones */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
          <div className="relative">
            <svg 
              className="w-4 h-4 mr-2 transition-all duration-300 group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-indigo-400 transition-opacity duration-500"></span>
          </div>
          <span className="font-medium">{publication.author}</span>
        </div>
        
        {/* Fecha con efecto de aparición */}
        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-all duration-300">
          {new Date(publication.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>
      
      {/* Efecto de borde inferior al hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left scale-x-0 group-hover:scale-x-100"></div>
    </div>
  );
};

export default PublicationBlock;