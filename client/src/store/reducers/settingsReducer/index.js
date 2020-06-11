import { SET_DARK_MODE } from '../../constants';
import initalState from '../initialState';

export default (state = initalState.settings, action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return { ...state, isDarkMode: action.bool };

    default:
      return state;
  }
};
