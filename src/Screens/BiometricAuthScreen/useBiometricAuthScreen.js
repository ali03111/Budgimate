import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const useBiometricAuthScreen = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [authResult, setAuthResult] = useState(null);

  // Initialize biometric sensor
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    // Check if biometric authentication is available
    const checkBiometricSupport = async () => {
      try {
        const { available, biometryType } =
          await rnBiometrics.isSensorAvailable();

        if (available && biometryType === BiometryTypes.TouchID) {
          setIsBiometricSupported(true);
          console.log('TouchID is supported');
        } else if (available && biometryType === BiometryTypes.FaceID) {
          setIsBiometricSupported(true);
          console.log('FaceID is supported');
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          setIsBiometricSupported(true);
          console.log('Generic Biometrics is supported');
        } else {
          setIsBiometricSupported(false);
          console.log('Biometrics not supported');
        }
      } catch (error) {
        console.error('Error checking biometric support:', error);
        Alert.alert('Error', 'Failed to check biometric support');
      }
    };

    checkBiometricSupport();
  }, []);

  // Handle biometric authentication
  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      Alert.alert(
        'Error',
        'Biometric authentication is not supported on this device',
      );
      return;
    }

    try {
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
        fallbackPromptMessage: 'Use device passcode',
        cancelButtonText: 'Cancel',
      });

      const { success, error } = result;

      if (success) {
        setAuthResult('Authentication successful!');
        Alert.alert('Success', 'Biometric authentication successful!');
      } else {
        setAuthResult(`Authentication failed: ${error}`);
        Alert.alert('Error', `Authentication failed: ${error}`);
      }
    } catch (error) {
      setAuthResult('Authentication error');
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'An error occurred during authentication');
    }
  };

  return { isBiometricSupported, authResult, handleBiometricAuth };
};

export default useBiometricAuthScreen;
