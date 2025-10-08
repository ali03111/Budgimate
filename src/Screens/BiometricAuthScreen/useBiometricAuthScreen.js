import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import ReactNativeBiometrics, {
  BiometricOtherwayMode,
  BiometricErrorCode,
} from '@boindahood/react-native-biometrics';

const useBiometricAuthScreen = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState(null);
  const [authResult, setAuthResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    // Check if biometric authentication is available
    const checkBiometricSupport = async () => {
      try {
        const result = await ReactNativeBiometrics.checkBiometricAvailability();

        if (result.isAvailable && result.allowAccess) {
          setIsBiometricSupported(true);
          setBiometricType(result.biometricType);
          let typeMessage = '';
          switch (result.biometricType) {
            case 'touchId':
              typeMessage = 'TouchID is supported';
              break;
            case 'faceId':
              typeMessage = 'FaceID is supported';
              break;
            case 'fingerprint':
              typeMessage = 'Fingerprint is supported';
              break;
            case 'iris':
              typeMessage = 'Iris recognition is supported';
              break;
            default:
              typeMessage = 'Biometrics are supported';
          }
          console.log(typeMessage);
        } else {
          setIsBiometricSupported(false);
          console.log(`Biometrics not supported: ${result.errorMessage}`);
        }
      } catch (error) {
        console.error('Error checking biometric support:', error);
        setIsBiometricSupported(false);
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

    setIsLoading(true);
    setAuthResult(null);

    try {
      const result = await ReactNativeBiometrics.authenticateBiometric({
        titlePrompt: 'Authenticate to continue',
        otherwayWith: BiometricOtherwayMode.PIN,
        otherwayText: 'Use PIN',
      });

      if (result.success) {
        setAuthResult('Authentication successful!');
        Alert.alert('Success', 'Biometric authentication successful!');
      } else if (result.pressedOtherway) {
        setAuthResult('User chose PIN authentication');
        Alert.alert('Fallback', 'Using PIN authentication');
        // Optionally trigger PIN auth here
        // const pinResult = await ReactNativeBiometrics.authenticatePIN();
      } else {
        handleAuthError(result);
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      setAuthResult('Authentication error');
      Alert.alert('Error', 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthError = result => {
    let errorMessage = result.errorMessage || 'Authentication failed';

    switch (result.errorCode) {
      case BiometricErrorCode.BIOMETRIC_USER_CANCEL:
        errorMessage = 'Authentication was cancelled by user';
        break;
      case BiometricErrorCode.BIOMETRIC_NOT_ENROLLED:
        errorMessage =
          'No biometric credentials enrolled. Please set up biometrics in device settings.';
        break;
      case BiometricErrorCode.BIOMETRIC_LOCKOUT:
        errorMessage = 'Too many failed attempts. Try again later.';
        break;
      case BiometricErrorCode.BIOMETRIC_LOCKOUT_PERMANENT:
        errorMessage = 'Biometrics temporarily locked. Unlock device first.';
        break;
      case BiometricErrorCode.BIOMETRIC_AUTH_FAILED:
        errorMessage = 'Authentication failed. Please try again.';
        break;
      case BiometricErrorCode.BIOMETRIC_PRESSED_OTHER_WAY:
        errorMessage = 'User chose alternative authentication';
        break;
      default:
        errorMessage = `Authentication failed: ${errorMessage}`;
    }

    setAuthResult(errorMessage);
    Alert.alert('Error', errorMessage);
  };

  return {
    isBiometricSupported,
    biometricType,
    authResult,
    isLoading,
    handleBiometricAuth,
    isToggle,
    setIsToggle,
  };
};

export default useBiometricAuthScreen;
