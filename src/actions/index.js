
export const GET_LOGIN = "GET_LOGIN";
export const GET_LOGIN_ERROR = "GET_LOGIN_ERROR";
export const TOGGLE_LOADER = "TOGGLE_LOADER";
export const SET_LOGGEDIN = "SET_LOGGEDIN";
export const SET_ROLE = "SET_ROLE";
export const SET_REDIRECT = "SET_REDIRECT";
export const GET_USER = 'GET_USER'
export const SET_PRO_USER_ID = 'SET_PRO_USER_ID'
export const SET_PRO_USER = 'SET_PRO_USER'


const url = process.env.REACT_APP_BE_URL;


export const setRedirectAction = (payload) => ({
  type: SET_REDIRECT,
  payload: payload,
});

export const setIsLoggedInAction = (boolean) => ({
  type: SET_LOGGEDIN,
  payload: boolean,
});

export const setRoleAction = (role) => ({
  type: SET_ROLE,
  payload: role,
});

export const setUserAction = (data) => ({
    type: GET_USER,
    payload: data
})

export const setProUserIdAction = (data) => ({
  type:  SET_PRO_USER_ID,
  payload: data
})

export const setProUserAction = (data) => ({
  type: SET_PRO_USER,
  payload: data
})

export const getUserAction = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(url + "/users/me", {
        credentials: "include",
      });
      if (response.ok) {
        let data = await response.json();
        dispatch(setUserAction(data))
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProUserAction = () => {
  return async (dispatch) => {
    try {
      let response = await fetch(url + "/proUser/me", {
        credentials: "include",
      });
      if (response.ok) {
        let data = await response.json();
        dispatch(setUserAction(data))
      }
    } catch (error) {
      console.log(error);
    }
  };
};

