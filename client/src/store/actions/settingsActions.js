import { SET_DARK_MODE } from '../constants';

export const setIsDarkMode = (bool) => (dispatch) => {
  dispatch({ type: SET_DARK_MODE, bool });
};
