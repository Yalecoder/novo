import axios from "axios";

// Replace 'username' and 'password' with your actual credentials
const username = "antonio@gmail.com";
const password = "12345678";
const encodedCredentials = btoa(`${username}:${password}`);

export const api = axios.create({
  baseURL: "https://seashell-app-bftiy.ondigitalocean.app/api/v1",
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
  },
});
