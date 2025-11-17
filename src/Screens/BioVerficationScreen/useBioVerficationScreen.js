import { useState, useEffect } from 'react';
import { Alert, AppState } from 'react-native';
import ReactNativeBiometrics, {
  BiometricOtherwayMode,
  BiometricErrorCode,
} from '@boindahood/react-native-biometrics';
import useReduxStore from '../../Hooks/UseReduxStore';
import { biomatricTrue } from '../../Redux/Action/BiomatricAction';
import { bioVerifyTrue } from '../../Redux/Action/BioScreenAction';
import useAppState from 'react-native-appstate-hook';

const useBioVerficationScreen = ({ addListener }) => {
  const { dispatch, getState } = useReduxStore();

  const { appState } = useAppState();

  const { isBioMatric } = getState('isBioMatric');
  const { isBioMatricScreen } = getState('isBioMatricScreen');

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState(null);
  const [authResult, setAuthResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if biometric authentication is available
    const checkBiometricSupport = async () => {
      try {
        const result = await ReactNativeBiometrics.checkBiometricAvailability();

        if (result.isAvailable && result.allowAccess) {
          setIsBiometricSupported(true);
          await handleBiometricAuth();
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

    const unsubscribe = addListener('focus', () => {
      setTimeout(() => {
        if (appState == 'active') checkBiometricSupport();
      }, 1000);
    });
    return unsubscribe;
  }, [appState]);

  // Handle biometric authentication
  const handleBiometricAuth = async () => {
    try {
      const result = await ReactNativeBiometrics.authenticateBiometric({
        titlePrompt: 'Authenticate to continue',
        otherwayWith: BiometricOtherwayMode.PIN,
        otherwayText: 'Use PIN',
      });
      console.log('kkdjkdjkfjfkdjfdjfdkf', result);
      if (result.success) {
        dispatch(bioVerifyTrue());
      } else if (result.pressedOtherway) {
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
    isToggle: isBioMatric,
    dispatch,
  };
};

export default useBioVerficationScreen;
