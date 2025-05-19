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
      // Maneja errores de validación del backend
      const errorMessages = errors.response.data.errors.map(err => err.msg).join(', ');
      return { success: false, error: errorMessages };
    }
    return { success: false, error: errors.message };
  }
};