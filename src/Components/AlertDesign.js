import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../Theme/Variables';
import { wp, hp } from '../Hooks/useResponsive';

export const AlertDesign = ({
  isVisible,
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
  cancelText,
  msgStyle,
  confirmButtonColor,
}) => {
  useEffect(() => {
    const backHandler = isVisible
      ? BackHandler.addEventListener('hardwareBackPress', () => {
          onCancel();
          return true;
        })
      : null;
    return () => backHandler?.remove();
  }, [isVisible, onCancel]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      backdropOpacity={0.6}
      style={styles.modal}
    >
      <View style={styles.content}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={[styles.modalMsg, msgStyle]}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelBtn]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>{cancelText ?? 'Not Now'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.confirmBtn,
              {
                borderColor: confirmButtonColor ?? '#FF4949',
              },
            ]}
            onPress={onConfirm}
          >
            <Text
              style={[
                styles.buttonText,
                { color: confirmButtonColor ?? '#FF4949' },
              ]}
            >
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: wp('5'),
    borderRadius: 10,
    alignItems: 'center',
    width: wp('80'),
    alignSelf: 'center',
  },
  modalTitle: {
    fontWeight: '600',
    color: Colors.primaryColor,
    fontSize: hp('2'),
  },
  modalMsg: {
    color: Colors.gray,
    fontSize: hp('1.5'),
    marginBottom: hp('2'),
    textAlign: 'center',
    marginTop: hp('1'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: wp('30'),
    height: hp('4'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: hp('1'),
  },
  cancelBtn: {
    backgroundColor: '#F6F6F6',
    borderColor: Colors.gray,
  },
  confirmBtn: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: hp('1.5'),
  },
});
