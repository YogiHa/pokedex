import React, { createContext, useEffect, useState } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const styleContext = createContext();
function StyleContextProvider({ children }) {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  function onDimensionsChange() {
    let { height, width } = Dimensions.get('window');
    setDimensions({ height, width });
  }

  useEffect(() => {
    onDimensionsChange();
    Dimensions.addEventListener('change', onDimensionsChange);
    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  let withTextColor = (obj) => [obj, { color: isDarkMode ? 'red' : 'black' }];
  let withBackgroundColor = (obj) => [
    obj,
    { backgroundColor: isDarkMode ? 'blue' : 'darkred' },
  ];
  let withBackgroundColor2 = (obj) => [
    obj,
    { backgroundColor: isDarkMode ? 'darkblue' : 'red' },
  ];
  let withBackgroundColor3 = (obj) => [
    obj,
    { backgroundColor: isDarkMode ? 'black' : 'white' },
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
        safeAreaView: withBackgroundColor3(styles.safeAreaView),
        backgroundImage: [styles.backgroundImage, { ...dimensions }],
        typeFiltersView: [
          styles.typeFiltersView,
          { right: dimensions.width / 1.3 },
        ],

        contentContainerHorizontal: [
          styles.contentContainerHorizontal,
          { width: Platform.OS == 'web' ? dimensions.width / 1.3 : null },
        ],
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
    height: 180,
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
    alignSelf: 'center',
    width: 170,
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
  switch: { position: 'absolute', left: 30, top: 30, zIndex: 2 },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
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
    flex: 1,
    position: 'absolute',
    height: '100%',
    top: 70,
  },
  contentContainerHorizontal: {
    justifyContent: 'center',
  },
  emptyDataText: {
    width: 150,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '400',
    fontFamily,
    textAlign: 'center',
    alignSelf: 'center',
  },
  flatListContainer: { paddingBottom: 50 },
  iconstypSeperator: { height: 3 },
  safeAreaView: { flex: 1 },
  mainTouchableOpacity: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export { styleContext, StyleContextProvider };
