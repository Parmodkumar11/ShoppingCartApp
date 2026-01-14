import React, {useState, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useApp} from '../context/AppContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import LanguageModal from '../components/LanguageModal';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {products, translations} = useApp();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const handleSettingsPress = () => {
    setLanguageModalVisible(true);
  };

  const renderProduct = useCallback(
    ({item, index}: {item: typeof products[0]; index: number}) => {
      // Calculate the actual product index in the original products array
      const actualIndex = index % products.length;
      return <ProductCard product={item} index={actualIndex} />;
    },
    [products.length],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 140,
      offset: 140 * Math.floor(index / 2),
      index,
    }),
    [],
  );

  // Create infinite data by repeating the products array
  const infiniteData = Array.from({length: 1000}, (_, i) => products[i % products.length]);

  const keyExtractor = useCallback(
    (item: typeof products[0], index: number) => `product-${item.id}-${index}`,
    [],
  );

  return (
    <View style={styles.container}>
      <Header
        title={translations.home}
        onCartPress={handleCartPress}
        onSettingsPress={handleSettingsPress}
      />
      <FlatList
        data={infiniteData}
        renderItem={({item, index}) => renderProduct({item, index})}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        testID="products_list"
      />
      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default HomeScreen;
