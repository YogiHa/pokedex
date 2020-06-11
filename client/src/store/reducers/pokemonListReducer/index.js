import { FETCH_LIST, FETCH_POKEMON_INFO } from '../../constants';
import initalState from '../initialState';

export default (state = initalState.pokemonList, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return [...state, ...action.payload];

    case FETCH_POKEMON_INFO:
      let newState = [...state];
      let { payload } = action;
      newState[payload.pid - 1] = {
        ...newState[payload.pid - 1],
        info: payload,
      };
      return newState;

    default:
      return state;
  }
};
