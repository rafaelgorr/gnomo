import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_GNOMO_API_URL,
})

// api.interceptors.response.use(
//   (response) => {
//     if (
//       response.data &&
//       typeof response.data === 'object' &&
//       response.config &&
//       response.config.responseType !== 'blob'
//     ) {
//       response.data = camelcaseKeys(response.data, { deep: true }) as unknown
//     }

//     return response
//   },
//   (error) => {
//     return Promise.reject(error instanceof Error ? error : new Error(String(error)))
//   },
// )
