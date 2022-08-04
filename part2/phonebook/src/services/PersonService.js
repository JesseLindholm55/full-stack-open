import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const PersonService = {
    
    getAll: function() {
      const request = axios.get(baseUrl)
      return request.then(response => response.data)
    },

    create: function(newObject) {
      const request = axios.post(baseUrl, newObject)
      return request.then(response => response.data)
    },

    update:function(id, newObject) {
      const request = axios.put(`${baseUrl}/${id}`, newObject)
      return request.then(response => response.data)
    },

    delete: function(id) {
      const request = axios.delete(`${baseUrl}/${id}`)
      return request.then(response => response.data)
    }
}
export default PersonService;