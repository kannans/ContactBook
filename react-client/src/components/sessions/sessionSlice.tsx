import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getCurrentUser, getUsersReq, inviteAcceptReq, inviteWithEmail, loginWithEmailAndPassword, logoutUserWithToken, requestAccessTokenWithRefreshToken, updateUserProfile } from "../../api/sessionAPI";


export interface User {
  id?: string;
  name?: String,
  email?: string;
  status?: string;
  createdAt?: string;
}
export interface UserList extends Array<User>{}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface InviteData {
  email: string;
}
export interface InviteAcceptData {
  password: string;
  passwordConfirmation: string;
  invitationToken: string;
}

export interface UserUpdateData {
  currentPassword: string;
  token: string | undefined;
  email?: string;
  password?: string;
}

interface AuthState {
  currentUser?: User;
  loading: boolean;
  error: boolean;
  errorMessages: string[];
  usersList: UserList,
  accessToken?: string;
  refreshToken?: string | null;
  expiresIn?: number;
  tokenType?: string;
  currentRoute?: string;
}

const initialState: AuthState = {
  currentUser: { 
    id: undefined,
    name: undefined,
    email: undefined,
    status: undefined,
    createdAt: undefined
  },
  loading: true,
  error: false,
  errorMessages: [],
  usersList: [],
  accessToken: undefined,
  refreshToken: getRefreshToken(),
  expiresIn: undefined,
  tokenType: undefined,
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const signUpUser = createAsyncThunk(
  "session/signUpUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    const response = await createUserWithEmailAndPassword(
      payload.email, 
      payload.password
      );
    if (response.errors) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(response);
    }
    
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  "session/updateProfile",
  async (payload: UserUpdateData, { rejectWithValue }) => {
    const response = await updateUserProfile(
      payload.currentPassword,
      payload.token,
      payload?.email,
      payload?.password
    );
    if (response.errors) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(response);
    }
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getUsers = createAsyncThunk(
  "session/getUsers",
  async (payload: String, { rejectWithValue }) => {
    const membersResponse = await getUsersReq();
    if (membersResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(membersResponse);
    }
    return membersResponse.data;
  }
);

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    const loginResponse = await loginWithEmailAndPassword(
      payload.email,
      payload.password
    );
    if (loginResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(loginResponse);
    }
    console.log("loginResponse", loginResponse.data)
    const userResponse = await getCurrentUser(loginResponse.data.access_token);
    console.log("userResponse", userResponse)
    if (userResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(userResponse.data);
    }
    const response = {
      ...loginResponse.data,
      ...userResponse,
    };
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const inviteUser = createAsyncThunk(
  "session/inviteUser",
  async (payload: InviteData, { rejectWithValue }) => {
    const loginResponse = await inviteWithEmail(
      payload.email,
    );
    if (loginResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(loginResponse);
    }
    // The value we return becomes the `fulfilled` action payload
    return loginResponse.data;
  }
);

export const inviteAcceptUser = createAsyncThunk(
  "session/inviteAcceptUser",
  async (payload: InviteAcceptData, { rejectWithValue }) => {
    const loginResponse = await inviteAcceptReq(
      payload.password,
      payload.passwordConfirmation,
      payload.invitationToken
    );
    if (loginResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(loginResponse);
    }
    const userResponse = await getCurrentUser(loginResponse.data.access_token);
    if (userResponse.error) {
      return rejectWithValue(userResponse.data);
    }
    const response = {
      ...loginResponse.data,
      ...userResponse,
    };
    // The value we return becomes the `fulfilled` action payload
    return response;

  }
);

export const logoutUser = createAsyncThunk(
  "session/logoutUser",
  async (payload: string, { rejectWithValue }) => {
    const response = await logoutUserWithToken(payload);
    // if response has errors rejectwithvalue
    console.log(response);
    if (response.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(response);
    }
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const refreshAccessToken = createAsyncThunk(
  "session/refreshAccessToken",
  async (refreshToken: string | undefined | null, { rejectWithValue }) => {
    if (!refreshToken) {
      return rejectWithValue("No refresh token");
    }

    const refreshResponse = await requestAccessTokenWithRefreshToken(
      refreshToken
    );
    if (refreshResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(refreshResponse.data);
    }
    const userResponse = await getCurrentUser(refreshResponse.data.access_token);
    if (userResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(userResponse.data);
    }
    const response = {
      ...refreshResponse.data,
      ...userResponse,
    };
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);


export const sessionSlice = createSlice({
  name: "session",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.errorMessages = [];
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
        state.expiresIn = action.payload.data.expires_in;
        state.currentUser = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          status: action.payload.data.status,
          createdAt: action.payload.data.created_at,
        };
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      }).addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
        state.expiresIn = action.payload.data.expires_in;
        state.currentUser = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          status: action.payload.data.status,
          createdAt: action.payload.data.created_at,
        };
        console.log("action.payload", action.payload)
        storeRefreshToken(action.payload.data.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = ["Invalid credentials. Did you enter them correctly?"];
      })
      .addCase(inviteAcceptUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
        state.expiresIn = action.payload.data.expires_in;
        state.currentUser = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          status: action.payload.data.status,
          createdAt: action.payload.data.created_at,
        };
        console.log("action.payload", action.payload)
        storeRefreshToken(action.payload.data.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(inviteAcceptUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = ["Already accepted/Expired token. Please try again."];
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
        state.expiresIn = action.payload.data.expires_in;
        state.currentUser = {
          id: action.payload.data.id,
          name: action.payload.data.name,
          email: action.payload.data.email,
          status: action.payload.data.status,
          createdAt: action.payload.data.created_at,
        };
        storeRefreshToken(action.payload.data.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(logoutUser.fulfilled, (state, action: any) => {
        state.currentUser = {
          id: undefined,
          email: undefined,
          status: undefined,
          createdAt: undefined,
        };
        state.accessToken = undefined;
        state.refreshToken = undefined;
        state.expiresIn = undefined;
        state.tokenType = undefined;
        removeRefreshToken();

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = ["your logged out"];
        state.accessToken = undefined;
        state.refreshToken = undefined;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateProfile.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;
        state.currentUser = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          status: action.payload.status,
          createdAt: action.payload.created_at,
        };
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(getUsers.fulfilled, (state, action: any) => {
        state.usersList = action.payload
        state.loading = false;
        state.error = true;
        state.errorMessages = [];
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      });
  },
});

export const { resetErrorState } = sessionSlice.actions;

export default sessionSlice.reducer;

function storeRefreshToken(token: string) {
  console.log("refreshToken", token)
  localStorage.setItem("refreshToken", token);
}

function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}