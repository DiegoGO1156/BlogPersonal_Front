import { Link } from 'react-router-dom';

const PublicationItem = ({ publication }) => {
  // Asegúrate que publication.course sea el nombre (string) o el _id
  const courseIdentifier = publication.course?.courseName || publication.course;
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-1">
            {publication.title}
          </h3>
          <p className="text-sm text-gray-500">
            Por: {publication.author} • {new Date(publication.createdAt).toLocaleDateString('es-ES')}
          </p>
        </div>
        <Link 
          to={`/courses/${encodeURIComponent(courseIdentifier)}/publications/${publication._id}`}
          className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
        >
          Ver completo
        </Link>
      </div>
    </div>
  );
};

export default PublicationItem;