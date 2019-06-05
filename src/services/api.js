import { create } from "apisauce";

const api = create({
  baseURL: 'http://192.168.99.1:8080',
  proxy: false
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
