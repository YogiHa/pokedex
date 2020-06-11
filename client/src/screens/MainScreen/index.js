import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchList } from '../../store/actions/pokemonActions';
import { Link, useHistory } from '../routing';
import { styleContext } from '../../styles';
import MyActivityIndicator from '../../components/MyActivityIndicator';
import Images from '../../assets';

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const pokemonList = useSelector((state) => state.pokemonList);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const { entries } = useHistory();

  useEffect(() => setIsLoading(false), [pokemonList]);

  useEffect(() => {
    if (entries && entries.length > 1) {
      let { pathname } = entries[entries.length - 1];
      scrollToIndex(pathname.slice(pathname.indexOf('/', 2) + 1));
    }
  }, []);

  const loadMore = () => {
    if (!isLoading && pokemonList.length < 151) {
      dispatch(fetchList());
      setIsLoading(true);
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current &&
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
  };
  const handleTypesFilter = (key) => {
    if (typeFilter.includes(key)) {
      setTypeFilter((prev) => prev.filter((type) => type != key));
    } else if (typeFilter.length == 2) {
      setTypeFilter((prev) => [prev[1], key]);
    } else setTypeFilter((prev) => [...prev, key]);
  };

  const styles = useContext(styleContext);
  const flatListRef = useRef(null);
  const { icons } = Images;

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.title}>Kanto Pokedex!</Text>
      <FlatList
        ref={flatListRef}
        onScrollToIndexFailed={(e) =>
          setTimeout(() => scrollToIndex(e.index), 100)
        }
        style={styles.mainFlatlist}
        data={pokemonList
          .filter((pokemon) => pokemon.name.includes(nameFilter.toLowerCase()))
          .filter((pokemon) =>
            typeFilter.every((type) => pokemon.types.includes(type))
          )}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <Link to={`/pokemon/${pokemonList.indexOf(item)}`}>
              <View style={styles.pokemonlistView}>
                <Text style={styles.subtitle}>{item.name}</Text>
                <Image
                  source={{ uri: item.icon }}
                  style={styles.pokemonlistIcon}
                />
              </View>
            </Link>
          );
        }}
        ListHeaderComponent={
          <TextInput
            style={styles.listHeader}
            onChangeText={(text) => setNameFilter(text)}
            value={nameFilter}
            placeholder={'search here by name'}
            placeholderTextColor={isDarkMode ? 'red' : 'black'}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => loadMore()}
        ListEmptyComponent={() => {
          !isLoading && loadMore();
          return !pokemonList.length && !isLoading ? (
            <MyActivityIndicator />
          ) : (
            !isLoading && (
              <Text style={styles.emptyDataText}>
                There is no pokemon at Kanto with that name
              </Text>
            )
          );
        }}
        stickyHeaderIndices={[0]}
        removeClippedSubviews={false}
        ListFooterComponent={isLoading && <MyActivityIndicator />}
      />
      <View style={styles.typeFiltersView}>
        {Object.entries(icons).map(([key, value]) => (
          <View
            key={key}
            style={{ opacity: typeFilter.includes(key) ? 1 : 0.2 }}
          >
            <TouchableHighlight onPress={() => handleTypesFilter(key)}>
              <Image style={styles.typeFilters} source={value} />
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </View>
  );
}
