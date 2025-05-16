import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NzM1NTk5MCwiZXhwIjoxNzQ3MzU2MDUwfQ.cTzT_JqypirpundzZ5-irAPrBaN8EN_cg5sA24w6dPA',
  },
})

export default axios
