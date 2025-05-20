import { useParams } from 'react-router-dom';
import { usePublicationDetail } from '../hooks/usePublicationDetails';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import CommentSection from "../components/comments/commentsSection";
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../style/motion';

const PublicationDetailPage = () => {
  const { courseName, publicationId } = useParams();
  const { publication, loading, error } = usePublicationDetail(publicationId);
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center py-8">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center"
    >
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error al cargar la publicación: {error}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <>
      <Navbar />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 py-12"
      >
        <motion.div
          variants={fadeIn('up', 'spring', 0.1, 1)}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="p-8">
            {/* Encabezado con animación */}
            <motion.div
              variants={fadeIn('up', 'spring', 0.2, 1)}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{publication?.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-2 mb-6">
                <span className="inline-flex items-center bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                  {decodeURIComponent(courseName)}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {publication?.author}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(publication?.createdAt).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </motion.div>

            {/* Contenido con animación */}
            <motion.div
              variants={fadeIn('up', 'spring', 0.3, 1)}
              className="prose max-w-none mb-8"
            >
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {publication?.bodyPublication}
              </p>
            </motion.div>

            {/* Media con animación */}
            {publication?.media && (
              <motion.div
                variants={fadeIn('up', 'spring', 0.4, 1)}
                className="mt-8 rounded-xl overflow-hidden shadow-md"
              >
                <img 
                  src={`/uploads/media_Publications/${publication.media}`} 
                  alt={publication.title}
                  className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
                />
              </motion.div>
            )}

            {/* Sección de comentarios */}
            <motion.div
              variants={fadeIn('up', 'spring', 0.5, 1)}
              className="mt-12"
            >
              <CommentSection publicationTitle={publication.title} />
            </motion.div>

            {/* Botón de volver */}
            <motion.div
              variants={fadeIn('up', 'spring', 0.6, 1)}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <Link 
                to={`/courses/${courseName}/publications`}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al listado de publicaciones
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PublicationDetailPage;