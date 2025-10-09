import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';

const AllocateCompleteModal = ({ isModal, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal
      isVisible={isModal}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      useNativeDriver
    >
      <View style={styles.modalContainer}>
        {/* Target Icon */}
        <Text style={styles.emoji}>🎯</Text>

        {/* Title */}
        <Text style={styles.title}>👍 Keep up the momentum!</Text>

        {/* Description */}
        <Text style={styles.subtitle}>
          Your goal just got a boost — keep going, you’re getting closer!
        </Text>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Got it!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#3A7AFE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AllocateCompleteModal;
