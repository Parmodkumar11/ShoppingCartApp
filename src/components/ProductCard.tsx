import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Product, useApp} from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({product, index}) => {
  const {addToCart, isInCart, translations} = useApp();
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(product);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, inCart && styles.addedButton]}
        onPress={handleAddToCart}
        disabled={inCart}
        testID={`product_${index + 1}_add_button`}
        accessibilityLabel={`Add ${product.name} to cart`}
        accessibilityHint={`Product ${index + 1} add to cart button`}>
        <Text style={[styles.addButtonText, inCart && styles.addedButtonText]}>
          {inCart ? translations.added : translations.addToCart}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    height: 160,
    justifyContent: 'space-between',
  },
  productInfo: {
    marginBottom: 10,
    flex: 1,
    justifyContent: 'flex-start',
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0066ff',
  },
  addButton: {
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addedButton: {
    backgroundColor: '#34c759',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  addedButtonText: {
    color: '#fff',
  },
});

export default ProductCard;
