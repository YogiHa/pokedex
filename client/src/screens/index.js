import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ImageBackground, StatusBar, Switch, View } from 'react-native';
import { Router, Route } from './routing';
import MainScreen from './MainScreen';
import PokemonScreen from './PokemonScreen';
import { styleContext } from '../styles';
import { setIsDarkMode } from '../store/actions/settingsActions';
import {
  subscribeToSocket,
  unsubscribeToSocket,
} from '../store/actions/pokemonActions';
import Images from '../assets';

export default function () {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const styles = useContext(styleContext);

  useEffect(() => {
    dispatch(subscribeToSocket());
    return () => unsubscribeToSocket();
  }, []);

  const { dark, light } = Images.bg;
  return (
    <ImageBackground
      source={isDarkMode ? dark : light}
      style={styles.backgroundImage}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <View style={styles.container}>
        <Switch
          trackColor={{ false: 'pink', true: '#f5dd4b' }}
          thumbColor={isDarkMode ? 'yellow' : 'red'}
          onValueChange={() => dispatch(setIsDarkMode(!isDarkMode))}
          value={isDarkMode}
          style={styles.switch}
        />
        <Router>
          <Route exact path={'/'} component={MainScreen} />
          <Route path={'/pokemon/:i'} component={PokemonScreen} />
        </Router>
      </View>
    </ImageBackground>
  );
}
