import {
  FETCH_LIST,
  FETCH_POKEMON_INFO,
  FETCH_ERROR,
  UPDATE_LIST,
} from '../../constants';
import initalState from '../initialState';

export default (state = initalState.pokemons, action) => {
  let newList = [...state.list];
  switch (action.type) {
    case FETCH_LIST:
      return { isError: false, list: [...state.list, ...action.payload] };

    case FETCH_POKEMON_INFO:
      let { payload } = action;
      newList[payload.pid - 1] = {
        ...newList[payload.pid - 1],
        info: payload,
      };
      return { isError: false, list: newList };

    case FETCH_ERROR:
      return { ...state, isError: true };

    case UPDATE_LIST:
      action.changed.map((change) => {
        if (!!newList[change.i]) newList[change.i] = change.data;
      });
      return { ...state, list: newList };
    default:
      return state;
  }
};
