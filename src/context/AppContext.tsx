import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation, Language, Translations } from '../utils/translations';

export interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

interface AppContextType {
    products: Product[];
    cart: CartItem[];
    cartCount: number;
    language: Language;
    translations: Translations;
    isRTL: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    isInCart: (productId: number) => boolean;
    setLanguage: (lang: Language) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Base products with fixed prices (will be translated)
const BASE_PRODUCTS: Omit<Product, 'name'>[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    price: Math.floor(Math.random() * 100) + 10,
}));

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [language, setLanguage] = useState<Language>('English');

    // Load language and cart from AsyncStorage on mount
    useEffect(() => {
        loadLanguage();
        loadCart();
    }, []);

    // Save language to AsyncStorage whenever it changes
    useEffect(() => {
        saveLanguage();
    }, [language]);

    // Save cart to AsyncStorage whenever cart changes
    useEffect(() => {
        saveCart();
    }, [cart]);

    const loadLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('language');
            if (savedLanguage && (savedLanguage === 'English' || savedLanguage === 'Arabic')) {
                setLanguage(savedLanguage as Language);
            }
        } catch (error) {
            // Error loading language
        }
    };

    const saveLanguage = async () => {
        try {
            await AsyncStorage.setItem('language', language);
        } catch (error) {
            // Error saving language
        }
    };

    const loadCart = async () => {
        try {
            const savedCart = await AsyncStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart) as CartItem[]);
            }
        } catch (error) {
            // Error loading cart
        }
    };

    const saveCart = async () => {
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            // Error saving cart
        }
    };

    // Get translations for current language
    const translations = useMemo(() => getTranslation(language), [language]);

    // Determine if RTL layout is needed
    const isRTL = useMemo(() => language === 'Arabic', [language]);

    // Create products with translated names based on current language
    const products = useMemo(() => {
        return BASE_PRODUCTS.map(product => ({
            ...product,
            name: translations.products[product.id] || `Product ${product.id}`,
        }));
    }, [translations]);

    // Update cart items with translated names when language changes
    useEffect(() => {
        setCart((prevCart: CartItem[]) => {
            return prevCart.map(item => ({
                ...item,
                name: translations.products[item.id] || item.name,
            }));
        });
    }, [translations]);

    const addToCart = (product: Product) => {
        setCart((prevCart: CartItem[]) => {
            const existingItem = prevCart.find((item: CartItem) => item.id === product.id);
            if (existingItem) {
                return prevCart;
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart: CartItem[]) => prevCart.filter((item: CartItem) => item.id !== productId));
    };

    const isInCart = (productId: number): boolean => {
        return cart.some((item: CartItem) => item.id === productId);
    };

    const cartCount = cart.length;

    return (
        <AppContext.Provider
            value={{
                products,
                cart,
                cartCount,
                language,
                translations,
                isRTL,
                addToCart,
                removeFromCart,
                isInCart,
                setLanguage,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};
