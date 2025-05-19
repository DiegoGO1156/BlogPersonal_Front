import { useParams } from 'react-router-dom';
import { usePublicationDetail } from '../hooks/usePublicationDetails';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import CommentSection from "../components/comments/commentsSection" 

const PublicationDetailPage = () => {
  const { courseName, publicationId } = useParams();
  const { publication, loading, error } = usePublicationDetail(publicationId);
  if (loading) return <div className="text-center py-8">Cargando publicación...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">{publication?.title}</h1>
            
            <div className="mb-4 text-sm text-gray-500">
            <span>Publicado en: {decodeURIComponent(courseName)}</span>
            <span className="mx-2">•</span>
            <span>Por: {publication?.author}</span>
            <span className="mx-2">•</span>
            <span>
                {new Date(publication?.createdAt).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}
            </span>
            </div>
            
            <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{publication?.bodyPublication}</p>
            </div>
            
            {publication?.media && (
                <div className="mt-6">
                <img 
                src={`http://localhost:3000/uploads/media_Publications/${publication.media}`} 
                alt={publication.title}
                className="max-w-full rounded-lg"
                />
            </div>
            )}
            
            <div>

            <CommentSection publicationTitle={publication.title} />
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
            <Link 
                to={`/courses/${courseName}/publications`}
                className="text-blue-500 hover:underline"
                >
                ← Volver al listado de publicaciones
            </Link>
            </div>
        </div>
        </div>
    </>
  );
};

export default PublicationDetailPage