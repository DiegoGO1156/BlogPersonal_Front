import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/Blog_Personal",
  timeout: 5000,
  headers: {'Cache-Control': 'no-cache'},
  httpAgent: false
});

export const getCourses = async () => {
  const response = await apiClient.get('/courses');
  return response.data.courses;
};

export const getPublicationsByCourseName = async (courseName) => {
  const response = await apiClient.get('/publications/', {
    params: {
      courseName: encodeURIComponent(courseName)
    }
  });
  return response.data.publications;
};

export const createPublication = async (publicationData) => {
  try {
    const response = await apiClient.post('/Publications/newPublication', publicationData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { success: true, data: response.data };
  } catch (errors) {
    console.error(errors)
    if (errors.response?.data?.errors) {
      const errorMessages = errors.response.data.errors.map(err => err.msg).join(', ');
      return { success: false, error: errorMessages };
    }
    return { success: false, error: errors.message };
  }
};

export const getPublicationById = async (publicationId) => {
  try {
    const response = await apiClient.get(`/publications/${publicationId}`);
    return response.data.findPublication; 
  } catch (error) {
    console.error('Error fetching publication:', error);
    throw error;
  }
};

export const getCommentsByTitle = async (title) => {
    try {
        const response = await apiClient.get('/Comments', {
            params: { title } 
        });
        return response.data.comments;
    } catch (err) {
        console.error('Error fetching comments by title:', err);
        throw err;
    }
};

export const addComment = async (commentData) => {
    try {
        const response = await apiClient.post('/comments/newComment', commentData);
        return response.data;
    } catch (err) {
        console.error('Error creating comment:', err);
        throw err;
    }
};

/*
export const editComment = async (commentId, updatedCommentText) => {
  try {
    const response = await apiClient.patch( `/comments/editComment/${commentId}`,
    { comment: updatedCommentText }
  );
  return response.data;
} catch (err) {
  console.error('Error editing comment:', err.response?.data || err.message);
  throw err;
}
};
*/
export const editComment = async (commentId, text) => {
  try {
    console.log('Enviando al backend:', {commentId, text, type: typeof text});
      const response = await apiClient.put( `/comments/editComment/${commentId}`,
          { comment: text }, 
          {
            headers: { 'Content-Type': 'application/json' }
          }
      );
      return response.data;
  } catch (err) {
      console.error('Error en el servicio:', {
          request: err.config?.data,
          response: err.response?.data
      });
      throw err;
    }
};


export const deleteComment = async (commentId) => {
  try {
    const response = await apiClient.delete(`/comments/deleteComment/${commentId}`);
    return response.data;
  } catch (err) {
    console.error('Error deleting comment:', err);
    throw err;
  }
};