import { useState } from 'react';
import useComments from '../../hooks/useComments';

const CommentSection = ({ publicationTitle }) => {
    const [commentText, setCommentText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const { comments, loading, error, postComment } = useComments(publicationTitle);

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
        <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
            <p>{error}</p>
        </div>
    );

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
                Comentarios ({comments.length})
            </h3>

            <form onSubmit={handleSubmit} className="mb-6 space-y-3">
                {!isAnonymous && (
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Tu nombre
                        </label>
                        <input
                            id="author"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                    </div>
                )}
                
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                        Tu comentario
                    </label>
                    <textarea
                        id="comment"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                    />
                </div>
                
                <div className="flex items-center">
                    <input
                        id="anonymous"
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                        Publicar como Anónimo
                    </label>
                </div>
                
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Publicar comentario
                </button>
            </form>

            <div className="space-y-4">
                {/* Lista de comentarios */}
            {comments.length === 0 ? (
                <p className="text-gray-500 italic">No hay comentarios aún</p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment._id} className="border-b border-gray-200 pb-4">
                            <div className="flex justify-between items-start">
                                <p className="font-medium text-gray-900">
                                    {comment.author}
                                </p>
                                <span className="text-sm text-gray-500">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="mt-1 text-gray-700">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default CommentSection;