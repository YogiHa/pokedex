import React, { useContext } from 'react';
import MyActivityIndicator from '../../../components/MyActivityIndicator';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { styleContext } from '../../../styles';

export default function ({ isLoading, filteredList }) {
  const styles = useContext(styleContext);

  const isError = useSelector((state) => state.pokemons.isError);
  return isLoading ? (
    <MyActivityIndicator />
  ) : (
    isError && filteredList.length && (
      <Text style={styles.subtitle}> network error </Text>
    )
  );
}
