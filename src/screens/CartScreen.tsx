import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useApp} from '../context/AppContext';
import Header from '../components/Header';

interface CartScreenProps {
  navigation: {
    goBack: () => void;
  };
}

const CartScreen: React.FC<CartScreenProps> = ({navigation}) => {
  const {cart, removeFromCart, translations, isRTL} = useApp();

  const handleBack = () => {
    navigation.goBack();
  };

  const renderCartItem = ({item, index}: {item: typeof cart[0]; index: number}) => (
    <View style={[styles.cartItem, isRTL && styles.cartItemRTL]} testID={`cart_item_${item.id}`}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        style={[styles.deleteButton, isRTL && styles.deleteButtonRTL]}
        testID={`cart_item_delete_${item.id}`}
        accessibilityLabel={`Delete ${item.name} from cart`}>
        <Image
          source={require('../utils/bin.png')}
          style={styles.deleteIcon}
          testID={`cart_item_delete_icon_${item.id}`}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={translations.cart}
        onCartPress={handleBack}
        onSettingsPress={() => {}}
        showBackButton={true}
      />
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{translations.emptyCart}</Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={item => `cart-item-${item.id}`}
          contentContainerStyle={styles.listContent}
          testID="cart_list"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cartItemRTL: {
    flexDirection: 'row-reverse',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  deleteButtonRTL: {
    marginLeft: 0,
    marginRight: 12,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});

export default CartScreen;
