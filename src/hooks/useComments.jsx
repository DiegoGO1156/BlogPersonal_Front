import { useState, useEffect } from 'react';
import { getCommentsByTitle, addComment } from '../services/api';

const useCommentsByTitle = (title) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchComments();
    }, [title]);

    return { comments, loading, error, postComment, refresh: fetchComments };
};

export default useCommentsByTitle;