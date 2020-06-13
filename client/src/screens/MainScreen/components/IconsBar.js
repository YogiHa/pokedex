import React, { useContext } from 'react';
import { FlatList, TouchableWithoutFeedback, View, Image } from 'react-native';
import Images from '../../../assets';
import { styleContext } from '../../../styles';

export default function ({ typeFilter, handleTypeFilterPress }) {
  const styles = useContext(styleContext);
  const icons = Object.entries(Images.icons);

  return (
    <FlatList
      data={icons}
      style={styles.typeFiltersView}
      initialNumToRender={icons.length}
      keyExtractor={([key]) => key}
      getItemLayout={(data, index) => ({
        length: 35,
        offset: 38 * index,
        index,
      })}
      renderItem={({ item }) => {
        const [key, value] = item;
        return (
          <TouchableWithoutFeedback onPress={() => handleTypeFilterPress(key)}>
            <View style={{ opacity: typeFilter.includes(key) ? 1 : 0.2 }}>
              <Image style={styles.typeFilters} source={value} />
            </View>
          </TouchableWithoutFeedback>
        );
      }}
      ItemSeparatorComponent={() => <View style={styles.iconstypSeperator} />}
    />
  );
}
