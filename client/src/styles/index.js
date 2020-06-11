import React, { createContext } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const styleContext = createContext();
function StyleContextProvider({ children }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  let withTextColor = (obj) => [obj, { color: isDarkMode ? 'red' : 'black' }];
  let withBackgroundColor = (obj) => [
    obj,
    { backgroundColor: isDarkMode ? 'blue' : 'darkred' },
  ];
  let withBackgroundColor2 = (obj) => [
    obj,
    { backgroundColor: isDarkMode ? 'darkblue' : 'red' },
  ];

  return (
    <styleContext.Provider
      value={{
        ...styles,
        title: withTextColor(styles.title),
        subtitle: withTextColor(styles.subtitle),
        listHeader: withBackgroundColor(withTextColor(styles.listHeader)),
        horizontalFlatListItem: withTextColor(styles.horizontalFlatListItem),
        pokemonlistView: withBackgroundColor2(styles.pokemonlistView),
        emptyDataText: withTextColor(styles.emptyDataText),
      }}
    >
      {children}
    </styleContext.Provider>
  );
}

let fontFamily = Platform.OS == 'android' ? 'monospace' : 'Courier';

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 35,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '500',
    fontFamily,
    textTransform: 'capitalize',
  },
  mainFlatlist: {
    marginTop: 15,
    paddingRight: 10,
    flex: 1,
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pokemonlistView: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '300',
    fontFamily,
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  pokemonlistIcon: { height: 150, width: 150, backgroundColor: 'transparent' },
  seperator: { height: 25, width: '100%' },
  listHeader: {
    borderWidth: 2,
    textAlign: 'center',
    flex: 1,
    width: '100%',
    height: 50,
  },
  horizontalFlatListItem: {
    paddingHorizontal: 15,
    fontFamily,
    fontWeight: '200',
    fontSize: 13,
    marginTop: 15,
  },
  horizontalFlatListIcon: {
    paddingHorizontal: 15,
    marginTop: 30,
  },
  blankSpace: { width: '100%', height: 180 },
  stickyHeader: {
    position: 'absolute',
    top: 5,
  },
  switch: { position: 'absolute', left: 30, top: 30 },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  typeIcon: {
    borderRadius: 25,
    height: 25,
    width: 65,
    marginTop: 15,
    marginHorizontal: 5,
  },
  typeFilters: {
    borderRadius: 25,
    height: 25,
    width: 65,
    marginVertical: 2,
  },
  typeFiltersView: {
    position: 'absolute',
    left: 20,
  },
  contentContainerHorizontal: {
    width: Platform.OS == 'web' ? Dimensions.get('window').width / 1.3 : null,
    justifyContent: 'center',
  },
  emptyDataText: {
    width: 150,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
    fontFamily,
    textAlign: 'center',
  },
});

export { styleContext, StyleContextProvider };
