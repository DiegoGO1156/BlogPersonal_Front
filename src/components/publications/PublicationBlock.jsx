const PublicationBlock = ({ publication }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-800 text-lg mb-1">{publication.title}</h3>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{publication.author}</span>
        </div>
        <span>
          {new Date(publication.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
};

export default PublicationBlock;