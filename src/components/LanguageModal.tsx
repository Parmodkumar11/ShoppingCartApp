import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useApp} from '../context/AppContext';

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({visible, onClose}) => {
  const {language, setLanguage, translations} = useApp();

  const handleLanguageSelect = (lang: 'English' | 'Arabic') => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{translations.selectLanguage}</Text>
              <TouchableOpacity
                style={[
                  styles.option,
                  language === 'English' && styles.selectedOption,
                ]}
                onPress={() => handleLanguageSelect('English')}
                testID="language_english">
                <Text
                  style={[
                    styles.optionText,
                    language === 'English' && styles.selectedOptionText,
                  ]}>
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  language === 'Arabic' && styles.selectedOption,
                ]}
                onPress={() => handleLanguageSelect('Arabic')}
                testID="language_arabic">
                <Text
                  style={[
                    styles.optionText,
                    language === 'Arabic' && styles.selectedOptionText,
                  ]}>
                  Arabic
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LanguageModal;
