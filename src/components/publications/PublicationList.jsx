import { useState } from 'react';
import PublicationBlock from './PublicationBlock';
import CreatePublicationForm from './FormPublication';

const PublicationList = ({ publications, onAddPublication }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data, file) => {
    setIsSubmitting(true);
    const result = await onAddPublication(data, file);
    setIsSubmitting(false);
    
    if (result.success) {
      setIsFormOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {publications.length} {publications.length === 1 ? 'publicación' : 'publicaciones'} encontradas
        </h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nueva Publicación
        </button>
      </div>

      {isFormOpen && (
        <CreatePublicationForm 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      )}

      <div className="grid gap-4">
        {publications.map((publication) => (
          <PublicationBlock 
            key={publication._id} 
            publication={publication} 
          />
        ))}
      </div>
    </div>
  );
};

export default PublicationList;