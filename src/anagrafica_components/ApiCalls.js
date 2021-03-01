import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  )
    return Promise.reject(error);
  console.log("error with response", error);
  return Promise.reject(error);
});

async function getFiliali() {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "TOKEN"
  );

  const response = await axios.get(config.apiFilialiEndpoint);
  return response;
}
async function getCustomers(branch, nag, customerName, birthDate) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "TOKEN"
  );
  if (customerName && birthDate) {
    const response = await axios.get(config.apiClienteEndpoint, {
      params: {
        branch,
        nag,
        customerName,
        birthDate,
      },
    });
    return response;
  } else {
    const response = await axios.get(config.apiClienteEndpoint, {
      params: {
        branch,
        nag,
      },
    });
    return response;
  }
}
async function postConfermed(postData) {
  const { email, firma, id, p1, p2, p3, p4, p5, p6, telefono } = postData;
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "TOKEN"
  );
  const response = await axios.post(config.apiVerifyAnagraficaEndpoint, {
    email,
    firma,
    id,
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    telefono,
  });
  if (response.status === 200) {
    toast.success("conferma avvenuta con successo");
  } else {
    toast.error("non è stato possibile confermare le scelte");
  }
  return response.data;
}

export default {
  getFiliali,
  getCustomers,
  postConfermed,
};
