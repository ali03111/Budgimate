import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { wp, hp } from '../Hooks/useResponsive'; // optional, or replace with fixed dimensions
import { BlurView } from '@react-native-community/blur'; // optional if using blur effect
import { checkmark } from '../Assets'; // replace with your green checkmark image

const PremiumSuccessModal = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image
            source={checkmark}
            style={styles.checkmark}
            resizeMode="contain"
          />

          <Text style={styles.title}>You're Now a</Text>
          <Text style={[styles.title, styles.bold]}>
            BudgiMate Premium User
          </Text>

          <Text style={styles.description}>
            Start your budgeting journey with access to powerful tools:
          </Text>

          <View style={styles.bulletList}>
            <Text style={styles.bullet}>
              • Set up your first monthly budget
            </Text>
            <Text style={styles.bullet}>• Link your financial goals</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PremiumSuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: hp('4'),
    paddingHorizontal: wp('5'),
    width: wp('85'),
    alignItems: 'center',
    elevation: 5,
  },
  checkmark: {
    width: wp('40'),
    height: wp('30'),
    marginBottom: hp('2'),
  },
  title: {
    fontSize: hp('2.2'),
    color: '#111',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: hp('2'),
    fontSize: hp('1.8'),
    color: '#666',
    textAlign: 'center',
  },
  bulletList: {
    marginTop: hp('2'),
    alignSelf: 'flex-start',
  },
  bullet: {
    fontSize: hp('1.7'),
    color: '#444',
    marginVertical: hp('0.5'),
  },
  button: {
    marginTop: hp('3'),
    backgroundColor: '#2F80ED',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('20'),
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('1.8'),
    fontWeight: '600',
  },
});
