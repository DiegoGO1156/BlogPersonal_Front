import { useState, useEffect } from 'react';
import { getCommentsByTitle, addComment, editComment, deleteComment} from '../services/api';

const useCommentsByTitle = (title) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState(''); 
    const [deletingId, setDeletingId] = useState(null);

    const fetchComments = async () => {
        if (!title) return;
        
        try {
            setLoading(true);
            const commentsData = await getCommentsByTitle(title);
            setComments(commentsData);
            setError(null);
        } catch (err) {
            setError(err.message);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    const postComment = async (commentText, author) => {
        try {
            const commentData = {
                comment: commentText,
                author: author,
                publication: title
            };

            const newComment = await addComment(commentData);
            setComments(prev => [newComment, ...prev]);
            window.location.reload()
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    const updateComment = async (commentId) => {
        try {

            console.log('Enviando a editar:', {
                commentId,
                text: editText,
                type: typeof editText
            });

            const updatedComment = await editComment(commentId, editText);
            
            setComments(prev => prev.map(comment => 
                comment._id === commentId ? updatedComment : comment
            ));
            
            setEditingId(null);
            setEditText('');
            window.location.reload()
            return true;
        } catch (err) {
            console.error('Error completo:', {
                message: err.message,
                response: err.response?.data,
                stack: err.stack
            });
            setError(err.response?.data?.error || err.message);
            return false;
        }
    };

    const removeComment = async (commentId) => {
        try {
            setDeletingId(commentId);
            await deleteComment(commentId);
            setComments(prev => prev.filter(comment => comment._id !== commentId));
            return true;
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            return false;
        } finally {
            setDeletingId(null);
        }
    };

    const startEditing = (commentId, currentText) => {
        setEditingId(commentId);
        setEditText(currentText); 
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditText('');
    };

    useEffect(() => {
        fetchComments();
    }, [title]);

    return { 
        comments, 
        loading, 
        error,
        editingId,
        editText,
        deletingId,
        setEditText,
        postComment, 
        updateComment,
        removeComment,
        startEditing,
        cancelEditing,
        refresh: fetchComments
    };
};

export default useCommentsByTitle;