import { combineReducers } from 'redux';
import pokemonsAPI from './pokemonsAPIReducer';
import settings from './settingsReducer';

export default combineReducers({ pokemonsAPI, settings });
