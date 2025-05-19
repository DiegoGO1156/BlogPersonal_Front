const PublicationItem = ({ publication }) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4 last:border-b-0">
      {/* Título en azul */}
      <h3 className="text-lg font-semibold text-blue-600 mb-1">
        {publication.title}
      </h3>
      
      {/* Autor y fecha en una sola línea */}
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-1">-</span>
        <span>{publication.author}</span>
        <span className="mx-1">•</span>
        <span>
          {new Date(publication.createdAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
};

export default PublicationItem;