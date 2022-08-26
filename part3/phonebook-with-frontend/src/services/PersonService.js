import axios from "axios";

const baseUrl = "/api/persons";
const PersonService = {
  getAll: function () {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  },

  create: function (newObject) {
    const result = axios.post(baseUrl, newObject);
    return result
      .then((createdPerson) => {
        return { content: createdPerson.data, error: false };
      })
      .catch((error) => {
        return { content: error.response.data.error, error: true };
      });
  },

  update: function (id, newObject) {
    const result = axios.put(`${baseUrl}/${id}`, newObject);
    return result
      .then((updatedPerson) => {
        return { content: updatedPerson.data, error: false };
      })
      .catch((error) => {
        return { content: error.response.data.error, error: true };
      });
  },

  delete: function (id) {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
  },
};
export default PersonService;
