export type Language = 'English' | 'Arabic';

export interface Translations {
  // UI Text
  home: string;
  cart: string;
  addToCart: string;
  added: string;
  emptyCart: string;
  selectLanguage: string;
  english: string;
  arabic: string;
  
  // Product names
  products: {
    [key: number]: string;
  };
}

export const translations: Record<Language, Translations> = {
  English: {
    home: 'Home',
    cart: 'Cart',
    addToCart: 'Add to Cart',
    added: 'Added',
    emptyCart: 'Your cart is empty',
    selectLanguage: 'Select Language',
    english: 'English',
    arabic: 'Arabic',
    products: {
      1: 'Laptop Computer',
      2: 'Wireless Mouse',
      3: 'Mechanical Keyboard',
      4: 'Gaming Headset',
      5: 'USB-C Cable',
      6: 'Power Bank',
      7: 'Bluetooth Speaker',
      8: 'Smart Watch',
      9: 'Tablet Stand',
      10: 'Webcam HD',
      11: 'External Hard Drive',
      12: 'USB Flash Drive',
      13: 'Wireless Charger',
      14: 'Phone Case',
      15: 'Screen Protector',
      16: 'Laptop Bag',
      17: 'Desk Lamp',
      18: 'Monitor Stand',
      19: 'Cable Organizer',
      20: 'Desk Mat',
    },
  },
  Arabic: {
    home: 'الرئيسية',
    cart: 'السلة',
    addToCart: 'أضف إلى السلة',
    added: 'تمت الإضافة',
    emptyCart: 'سلة التسوق فارغة',
    selectLanguage: 'اختر اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    products: {
      1: 'كمبيوتر محمول',
      2: 'ماوس لاسلكي',
      3: 'لوحة مفاتيح ميكانيكية',
      4: 'سماعات ألعاب',
      5: 'كابل USB-C',
      6: 'شاحن محمول',
      7: 'مكبر صوت بلوتوث',
      8: 'ساعة ذكية',
      9: 'حامل تابلت',
      10: 'كاميرا ويب HD',
      11: 'قرص صلب خارجي',
      12: 'ذاكرة USB',
      13: 'شاحن لاسلكي',
      14: 'غطاء هاتف',
      15: 'حامي الشاشة',
      16: 'حقيبة كمبيوتر',
      17: 'مصباح مكتب',
      18: 'حامل شاشة',
      19: 'منظم الكابلات',
      20: 'سجادة مكتب',
    },
  },
};

export const getTranslation = (language: Language): Translations => {
  return translations[language];
};



