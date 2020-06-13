import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from '../routing';
import { Text, View, FlatList, Image } from 'react-native';
import { fetchPokemonInfo } from '../../store/actions/pokemonsAPIActions';
import MyActivityIndicator from '../../components/MyActivityIndicator';
import { styleContext } from '../../styles';
import Images from '../../assets';

export default function () {
  const { i } = useParams() || {};
  const { list, isError } = useSelector((state) => state.pokemonsAPI);
  const pokemon = list[i] || {};
  const dispatch = useDispatch();

  useEffect(() => {
    !pokemon.info && dispatch(fetchPokemonInfo(pokemon.name));
  }, []);

  useEffect(() => {
    let interval;
    isError
      ? (interval = setInterval(() => {
          dispatch(fetchPokemonInfo(pokemon.name));
        }, 5000))
      : clearInterval(interval);

    return () => clearInterval(interval);
  }, [isError]);

  const styles = useContext(styleContext);

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Text style={styles.title}>{pokemon.name}</Text>
        <Image
          source={{ uri: pokemon.icon }}
          style={[styles.pokemonlistIcon]}
        />
      </View>
      <View style={styles.blankSpace} />

      {!pokemon.info ? (
        isError ? (
          <Text style={styles.emptyDataText}> An Error Occurred </Text>
        ) : (
          <MyActivityIndicator />
        )
      ) : (
        <View style={styles.container}>
          <View style={styles.flexOne}>
            <Text style={styles.subtitle}> Types </Text>
            <FlatList
              data={pokemon.types}
              horizontal
              contentContainerStyle={styles.contentContainerHorizontal}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Image source={Images.icons[item]} style={styles.typeIcon} />
              )}
            />
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.subtitle}> Abilities </Text>
            <FlatList
              contentContainerStyle={styles.contentContainerHorizontal}
              data={pokemon.info.abilities}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Text style={styles.horizontalFlatListItem}>{item}</Text>
              )}
            />
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.subtitle}> Moves </Text>
            <FlatList
              contentContainerStyle={styles.contentContainerHorizontal}
              data={pokemon.info.moves}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Text style={styles.horizontalFlatListItem}>{item}</Text>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}
