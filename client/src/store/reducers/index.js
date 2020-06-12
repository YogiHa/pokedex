import { combineReducers } from 'redux';
import pokemons from './pokemonsReducer';
import settings from './settingsReducer';

export default combineReducers({ pokemons, settings });
