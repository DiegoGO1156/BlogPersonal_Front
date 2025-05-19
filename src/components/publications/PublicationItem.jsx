import { Link } from 'react-router-dom';

const PublicationItem = ({ publication }) => {
  const courseIdentifier = publication.course?.courseName || publication.course;
  
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
            {publication.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 space-x-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {publication.author}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(publication.createdAt).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>
        <Link 
          to={`/courses/${encodeURIComponent(courseIdentifier)}/publications/${publication._id}`}
          className="text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors flex items-center whitespace-nowrap"
        >
          Ver completo
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PublicationItem;