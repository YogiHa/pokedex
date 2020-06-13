import React, { useContext } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { styleContext } from '../../../styles';
import MyActivityIndicator from '../../../components/MyActivityIndicator';

export default function ({ loadMore, isLoading }) {
  const isError = useSelector((state) => state.pokemonsAPI.isError);
  const styles = useContext(styleContext);
  loadMore();
  return isError ? (
    <Text style={styles.title}> an error occurred </Text>
  ) : !isLoading ? (
    <Text style={styles.emptyDataText}>
      There is no pokemon at Kanto with that name
    </Text>
  ) : (
    <MyActivityIndicator />
  );
}
