import React, { useContext } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { styleContext } from '../../../styles';

export default function ({ loadMore, isLoading }) {
  const isError = useSelector((state) => state.pokemons.isError);
  const styles = useContext(styleContext);

  loadMore();
  return isError ? (
    <Text style={styles.title}> network error</Text>
  ) : (
    !isLoading && (
      <Text style={styles.emptyDataText}>
        There is no pokemon at Kanto with that name
      </Text>
    )
  );
}
