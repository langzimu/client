import axios from 'axios';

// Actions
import { notice } from 'actions/utils';

// Types
import { LOGIN, LOGIN_FAILED } from 'redux/types/actions';
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

const userLogin: ActionCreator<ThunkAction<
  Promise<any>,
  AppState,
  any,
  Action
>> = ({ username, password }) => async dispatch => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_API_URI + '/user/account/auth',
      {
        username,
        password
      }
    );

    localStorage.nyxToken = data.jwt_token;
    axios.defaults.headers.common.nyxAuthToken = data.jwt_token;

    dispatch({
      type: LOGIN,
      payload: data
    });

    notice(data);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED
    });

    notice(error);
  }
};

export default userLogin;