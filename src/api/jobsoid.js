import axios from 'axios'

const api = axios.create({
    baseURL: 'https://teknorix.jobsoid.com/api/v1',
  });
  
export default api;