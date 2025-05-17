import axios from 'axios';
    
const apiClient = axios.create({
    baseURL: "http://localhost:3000/Blog_Personal",
    timeout: 5000,
    headers: {'Cache-Control': 'no-cache'},
    httpAgent: false
}) 

export const getCourses = async () => {
  const response = await apiClient.get(`/courses`);
  return response.data.courses; 
};