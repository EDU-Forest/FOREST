import axios from "axios";

const fetcher = (payload: Login) =>
  axios
    .post(`/api/user/login`, {
      email: payload.email,
      password: payload.password,
    })
    .then(({ data }) => data);

// const use
