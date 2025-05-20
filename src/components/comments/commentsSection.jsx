import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCommentsByTitle from '../../hooks/useComments';

const CommentSection = ({ publicationTitle }) => {
    const [commentText, setCommentText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const { comments, loading, error, editingId, editText, setEditText, updateComment, startEditing, cancelEditing, removeComment, deletingId} = useCommentsByTitle(publicationTitle);

    const handleDelete = async (commentId) => {
        if (window.confirm('¿Estás seguro de eliminar este comentario?')) {
            await removeComment(commentId);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        
        const success = await postComment(
            commentText,
            isAnonymous ? undefined : authorName
        );
        
        if (success) {
            setCommentText('');
            if (!isAnonymous) setAuthorName('');
        }
    };

    if (loading) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"
            ></motion.div>
        </motion.div>
    );

    if (error) return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-400 p-4 my-6 rounded-r-lg shadow-sm"
        >
            <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
            </div>
        </motion.div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
        >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Comentarios <span className="text-indigo-600">({comments.length})</span>
            </h3>

            <motion.form 
                onSubmit={handleSubmit} 
                className="mb-8 bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {!isAnonymous && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4"
                    >
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                            Tu nombre
                        </label>
                        <input
                            id="author"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                    </motion.div>
                )}
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4"
                >
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Tu comentario
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                    />
                </motion.div>
                
                <motion.div 
                    className="flex items-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <input
                        id="anonymous"
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                        Publicar como Anónimo
                    </label>
                </motion.div>
                
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                >
                    Publicar comentario
                </motion.button>
            </motion.form>

            <div className="space-y-6">
                <AnimatePresence>
                    {comments.length === 0 ? (
                        <motion.p 
                            initial={{ opacity: -2 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-500 italic text-center py-8"
                        >
                            No hay comentarios aún
                        </motion.p>
                    ) : (
                        <div className="space-y-6">
                            {comments.map((comment, index) => (
                                <motion.div
                                    key={comment._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium text-gray-900 flex items-center">
                                            {comment.author || 'Anónimo'}
                                            {!comment.author && (
                                                <span className="ml-2 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                                                    Anónimo
                                                </span>
                                            )}
                                        </p>
                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    {editingId === comment._id ? (
                                        <>
                                            <textarea
                                                defaultValue={comment.comment}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2"
                                                rows="3"
                                            />
                                            <div className="flex justify-end space-x-2 mt-2">
                                                <button
                                                    onClick={cancelEditing}
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={() => updateComment(comment._id, editText)}
                                                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                                >
                                                    Guardar
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-gray-700 mt-2 pl-2 border-l-2 border-indigo-200">
                                                {comment.comment}
                                            </p>
                                            <div className="flex justify-end mt-2 space-x-3">
                                                <button
                                                    onClick={() => {
                                                        startEditing(comment._id);  
                                                        setEditText(comment.comment);
                                                    }}
                                                    className="text-sm px-3 py-1 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-200 flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(comment._id)}
                                                    disabled={deletingId === comment._id}
                                                    className={`text-sm px-3 py-1 rounded-md transition-colors duration-200 flex items-center ${
                                                        deletingId === comment._id 
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                                    }`}
                                                >
                                                    {deletingId === comment._id ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Eliminando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Eliminar
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default CommentSection;