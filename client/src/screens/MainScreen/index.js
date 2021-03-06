import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchList } from '../../store/actions/pokemonsAPIActions';
import { Link, useHistory } from '../routing';
import { styleContext } from '../../styles';
import IconsBar from './components/IconsBar';
import ListEmptyComponent from './components/ListEmptyComponent';
import ListFooterComponent from './components/ListFooterComponent';
import useErrorTimeOut from '../../utils/useErrorTimeOut';

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const { list, isError } = useSelector((state) => state.pokemonsAPI);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const { entries } = useHistory();

  useEffect(() => {
    if (entries && entries.length > 1) {
      let { pathname } = entries[entries.length - 1];
      scrollToIndex(pathname.slice(pathname.indexOf('/', 2) + 1));
    }
  }, []);

  useEffect(() => {
    list.length && setIsLoading(false);
  }, [list]);

  useEffect(() => {
    isError && setIsLoading(false);
  }, [isError]);

  useEffect(() => {
    isLoading && dispatch(fetchList());
  }, [isLoading]);

  useErrorTimeOut(() => setIsLoading(true));

  const loadMore = () => list.length < 151 && !isError && setIsLoading(true);

  const scrollToIndex = (index) => {
    flatListRef.current &&
      flatListRef.current.props.data.length > index &&
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
  };

  const handleTypeFilterPress = (key) => {
    if (typeFilter.includes(key)) {
      setTypeFilter((prev) => prev.filter((type) => type !== key));
    } else if (typeFilter.length === 2) {
      setTypeFilter((prev) => [prev[1], key]);
    } else setTypeFilter((prev) => [...prev, key]);
  };

  const styles = useContext(styleContext);
  const flatListRef = useRef(null);

  let filteredList = [...list]
    .filter((pokemon) => pokemon.name.includes(nameFilter.toLowerCase()))
    .filter((pokemon) =>
      typeFilter.every((type) => pokemon.types.includes(type))
    );

  return (
    <View style={styles.mainScreen}>
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        style={styles.mainTouchableOpacity}
      />
      <IconsBar
        typeFilter={typeFilter}
        handleTypeFilterPress={handleTypeFilterPress}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.title}>Kanto Pokedex!</Text>
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={filteredList}
        ref={flatListRef}
        removeClippedSubviews={true}
        initialNumToRender={!!list.length ? 3 : 0}
        keyExtractor={(item) => item.name}
        onScrollToIndexFailed={(e) =>
          setTimeout(() => scrollToIndex(e.index), 100)
        }
        style={styles.mainFlatlist}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          <ListEmptyComponent loadMore={loadMore} isLoading={isLoading} />
        }
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <TextInput
            style={styles.listHeader}
            onChangeText={(text) => setNameFilter(text)}
            value={nameFilter}
            placeholder={'search here by name'}
            placeholderTextColor={isDarkMode ? 'red' : 'black'}
          />
        }
        getItemLayout={(data, index) => ({
          length: 180,
          offset: 205 * index,
          index,
        })}
        renderItem={({ item }) => (
          <Link to={`/pokemon/${list.indexOf(item)}`}>
            <View style={styles.pokemonlistView}>
              <Text style={styles.subtitle}>{item.name}</Text>
              <Image
                source={{ uri: item.icon }}
                style={styles.pokemonlistIcon}
              />
            </View>
          </Link>
        )}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        ListFooterComponent={
          <ListFooterComponent
            isLoading={isLoading}
            filteredList={filteredList}
          />
        }
      />
    </View>
  );
}
