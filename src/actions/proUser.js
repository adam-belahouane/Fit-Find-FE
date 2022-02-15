import { setProUserAction } from ".";


const url = process.env.REACT_APP_BE_URL;

export const getProUserIdAction = (prouserId) => {
    return async (dispatch) => {
      try {
        let response = await fetch(url + "/proUser/getProUser/" + prouserId )
        if (response.ok) {
          let data = await response.json();
          dispatch(setProUserAction(data))
        }
      } catch (error) {
        console.log(error);
      }
    }
  };