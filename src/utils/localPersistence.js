const BASE_URL = "https://api.example.com"; // Replace with your actual base URL
const LOGIN_ENDPOINT = "/auth/login"; // Replace with your actual login endpoint

const loggedIn = () => {
    return Promise.resolve(true); // Return a resolved promise for consistency
};

const fetchData = (endpoint) => {
    return new Promise((resolve, reject) => {
        try {
            const data = localStorage.getItem(endpoint);
            resolve(data ? JSON.parse(data) : null);
        } catch (error) {
            reject(error);
        }
    });
};

const saveData = (endpoint, data) => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem(endpoint, JSON.stringify(data));
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

const deleteData = (endpoint) => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem(endpoint);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

const persistence = {
    loggedIn,
    fetchData,
    saveData,
    deleteData,
};

export default persistence;
