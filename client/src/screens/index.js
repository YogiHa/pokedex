import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ImageBackground,
  StatusBar,
  Switch,
  View,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Router, Route } from './routing';
import MainScreen from './MainScreen';
import PokemonScreen from './PokemonScreen';
import { styleContext } from '../styles';
import { setIsDarkMode } from '../store/actions/settingsActions';
import {
  subscribeToSocket,
  unsubscribeFromSocket,
} from '../store/actions/pokemonsAPIActions';
import Images from '../assets';

export default function () {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const styles = useContext(styleContext);

  useEffect(() => {
    dispatch(subscribeToSocket());
    return () => unsubscribeFromSocket();
  }, []);

  const onSwitchChange = () => {
    Keyboard.dismiss();
    dispatch(setIsDarkMode(!isDarkMode));
  };

  const { dark, light } = Images.bg;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? 'black' : 'white'}
      />
      <ImageBackground
        source={isDarkMode ? dark : light}
        style={styles.backgroundImage}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={styles.container}>
          <Switch
            trackColor={{ false: 'pink', true: '#f5dd4b' }}
            thumbColor={isDarkMode ? 'yellow' : 'red'}
            onValueChange={onSwitchChange}
            value={isDarkMode}
            style={styles.switch}
          />
          <Router>
            <Route exact path={'/'} component={MainScreen} />
            <Route path={'/pokemon/:i'} component={PokemonScreen} />
          </Router>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
