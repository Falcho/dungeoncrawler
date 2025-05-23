const BASE_URL = "http://127.0.0.1:3000/"; // Replace with your actual base URL
const LOGIN_ENDPOINT = "/auth/login"; // Replace with your actual login endpoint

function handleHttpError(result) {
  if (!result.ok) {
    return Promise.reject({ status: result.status, fullError: result.json() });
  }
  return result.json();
}

const makeOptions = (method, addToken, body) => {
  var options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    options.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    options.body = JSON.stringify(body);
  }
  return options;
};

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};
const getToken = () => {
  return localStorage.getItem("jwtToken");
};
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};
const logout = () => {
  localStorage.removeItem("jwtToken");
};

const login = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpError)
    .then((res) => {
      setToken(res.token);
    });
};

const fetchData = (endpoint) => {
  const options = makeOptions("GET", true);
  return fetch(BASE_URL + endpoint, options).then(handleHttpError);
};

const saveData = (endpoint, data) => {
    const options = makeOptions("POST", true, data);
    return fetch(BASE_URL + endpoint, options).then(handleHttpError);
}
const deleteData = (endpoint) => {
    const options = makeOptions("DELETE", true);
    return fetch(BASE_URL + endpoint, options).then(handleHttpError);
} 

const persistence = {
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    saveData,
    deleteData,
};

export default persistence;
