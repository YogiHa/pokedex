import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from '../routing';
import { Text, View, FlatList, Image } from 'react-native';
import { fetchPokemonInfo } from '../../store/actions/pokemonActions';
import MyActivityIndicator from '../../components/MyActivityIndicator';
import { styleContext } from '../../styles';
import Images from '../../assets';

export default function () {
  const { i } = useParams() || {};
  const pokemon = useSelector((state) => state.pokemonList[i]) || {};
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemon.info && !isLoading) {
      dispatch(fetchPokemonInfo(pokemon.name));
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [pokemon.info]);

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
      {isLoading || !pokemon.info ? (
        <MyActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View style={styles.flexOne}>
            <Text style={styles.subtitle}> Types </Text>
            <FlatList
              data={pokemon.types}
              horizontal
              contentContainerStyle={styles.contentContainerHorizontal}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                return (
                  <Image source={Images.icons[item]} style={styles.typeIcon} />
                );
              }}
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
