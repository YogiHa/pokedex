import { Platform } from 'react-native';
import {
  FETCH_LIST,
  FETCH_POKEMON_INFO,
  FETCH_ERROR,
  UPDATE_LIST,
  CLEAR_ERROR,
} from '../constants';
import socketIOClient from 'socket.io-client';

let baseURL =
  Platform.OS === 'web' ? 'http://localhost:3001/' : `http://10.0.2.2:3001/`;

const customFetch = async ({ url, dispatch, ...params }) => {
  await dispatch({ type: CLEAR_ERROR });
  return fetch(`${baseURL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params }),
  })
    .then((response) => (response.status == 400 ? 'error' : response.json()))
    .catch((err) => 'error');
};

export const fetchList = () => (dispatch, getState) => {
  customFetch({
    url: 'fetchList',
    dispatch,
    currLength: getState().pokemonsAPI.list.length,
  }).then((payload) =>
    payload === 'error'
      ? dispatch({ type: FETCH_ERROR })
      : dispatch({ type: FETCH_LIST, payload })
  );
};

export const fetchPokemonInfo = (name) => (dispatch) => {
  customFetch({ url: 'fetchPokemon', dispatch, name }).then((payload) => {
    payload === 'error'
      ? dispatch({ type: FETCH_ERROR })
      : dispatch({ type: FETCH_POKEMON_INFO, payload });
  });
};

const socket = socketIOClient(baseURL);

export const subscribeToSocket = () => (dispatch, getState) => {
  socket.on('pokemonInfo', (pokemonInfo) => {
    getState().pokemonsAPI.list[pokemonInfo.pid - 1] &&
      dispatch({ type: FETCH_POKEMON_INFO, payload: pokemonInfo });
  });
  socket.on('updateLIst', (changed) =>
    dispatch({
      type: UPDATE_LIST,
      changed: changed.filter(
        (change) => getState().pokemonsAPI.list.length > change.i
      ),
    })
  );
};
export const unsubscribeFromSocket = () => {
  socket.off('pokemonInfo');
  socket.off('updateList');
};
