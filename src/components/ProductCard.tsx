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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  productInfo: {
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: '#4CAF50',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addedButtonText: {
    color: '#fff',
  },
});

export default ProductCard;
