import axios from "./axios";

const LOGIN_URL = "/users/login.json";
const SIGNUP_URL = "/users/signup.json";
const UPDATE_PROFILE_URL = "/users";
const LOGOUT_URL = "/logout";
const CURRENT_USER_URL = "/current_user.json";

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  const data = {
    user: {
      email: email,
      password: password,
    }
  };

  return axios
    .post(SIGNUP_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const data = {
    user: {
      email: email,
      password: password,
    }
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function updateUserProfile(
  currentPassword: string,
  token: string | undefined,
  email?: string,
  password?: string
) {
  const data = {
    current_password: currentPassword,
    email: email,
    password: password,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .patch(UPDATE_PROFILE_URL, data, config)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function logoutUserWithToken(token: string) {
  return fetch(LOGOUT_URL, { 
    method: 'delete', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      }
    })
    .then((response: any) => {
      return response.data;
    }).catch((error: any) => {
      return error.response.data;
    });
}

export async function requestAccessTokenWithRefreshToken(refreshToken: string) {
  const data = {
    Authorization: `Bearer ${refreshToken}`,
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function getCurrentUser(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .get(CURRENT_USER_URL, config)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}