import axios from 'axios';

// Types
import { SET_ACCOUNT_INFO, SET_ACCOUNT_LOADER } from 'redux/types/actions';

// Redux
import AppState from 'redux/types/app';
import { ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Actions
import { notice } from 'actions/utils';

const getVIP: ActionCreator<ThunkAction<
  void,
  AppState,
  any,
  Action
>> = () => async dispatch => {
  dispatch({ type: SET_ACCOUNT_LOADER, payload: true });

  try {
    const { data } = await axios.get(
      process.env.REACT_APP_API_URI + '/user/account/vip'
    );

    dispatch({ type: SET_ACCOUNT_INFO, payload: data });
  } catch (error) {
    notice(error);
  }

  dispatch({ type: SET_ACCOUNT_LOADER, payload: false });
};

export default getVIP;
