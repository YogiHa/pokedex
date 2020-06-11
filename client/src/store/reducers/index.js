import { combineReducers } from 'redux';
import pokemonList from './pokemonListReducer';
import settings from './settingsReducer';

export default combineReducers({ pokemonList, settings });
