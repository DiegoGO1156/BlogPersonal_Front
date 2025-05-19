import { useParams } from 'react-router-dom';
import PublicationItem from '../components/publications/PublicationItem';
import CreatePublicationForm from '../components/publications/FormPublication';
import { useState } from 'react';
import Navbar from "../components/navbar/Navbar"
import {useCoursePublications} from "../hooks/useCoursePublications"

const CoursePublicationsPage = () => {
  const { courseName } = useParams();
  const { publications, loading, error, addPublication, refresh } = useCoursePublications(courseName);
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <>
      <Navbar />
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      </>
    );
  }

  if (error) {
    return (
      <>
      <Navbar />
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{error}</p>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Encabezado igual */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Publicaciones del curso: <span className="text-blue-600">{decodeURIComponent(courseName)}</span>
        </h1>
        <p className="text-gray-600">
          {publications.length} {publications.length === 1 ? 'publicación' : 'publicaciones'} encontradas
        </p>
      </div>

      {/* Botón igual */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Nueva Publicación
      </button>

      {/* Lista de publicaciones simplificada */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {publications.length > 0 ? (
          publications.map((pub) => (
            <PublicationItem key={pub._id} publication={pub} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No hay publicaciones aún</p>
        )}
      </div>

      {/* Formulario igual */}
      {showForm && (
        <CreatePublicationForm
        onClose={() => setShowForm(false)}
        onSubmit={async (data) => {
          const result = await addPublication(data);
          if (result.success) {
            refresh();
          }
          return result;
        }}
        courseName={courseName}
        />
      )}
    </div>
    </>
  );
};

export default CoursePublicationsPage;

/*{showForm && (
  <CreatePublicationForm
  onClose={() => setShowForm(false)}
  onSubmit={async (data) => {
    const result = await addPublication(data);
    if (result.success) {
      refresh();
    }
    return result;
  }}
  courseName={courseName}
  />
)}*/