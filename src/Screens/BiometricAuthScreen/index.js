import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Switch,
  ActivityIndicator,
} from 'react-native';
import React, { memo } from 'react';
import useBiometricAuthScreen from './useBiometricAuthScreen';
import styles from './styles';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import { Colors } from '../../Theme/Variables';

const BiometricAuthScreen = () => {
  const {
    isBiometricSupported,
    biometricType,
    authResult,
    isLoading,
    isToggle,
    setIsToggle,
    handleBiometricAuth,
  } = useBiometricAuthScreen();

  const getBiometricIcon = () => {
    switch (biometricType) {
      case 'faceId':
        return '👤'; // Face ID emoji
      case 'touchId':
      case 'fingerprint':
        return '👆'; // Fingerprint emoji
      case 'iris':
        return '👁️'; // Iris emoji
      default:
        return '🔐'; // Lock emoji
    }
  };

  const getBiometricLabel = () => {
    switch (biometricType) {
      case 'faceId':
        return 'Face ID';
      case 'touchId':
        return 'Touch ID';
      case 'fingerprint':
        return 'Fingerprint';
      case 'iris':
        return 'Iris Recognition';
      default:
        return 'Biometrics';
    }
  };

  return (
    <ImageBackground style={styles.container} source={LoginBg}>
      <HeaderComponent headerTitle={'Enable Biometric Auth'} isBack />

      <View style={styles.contentContainer}>
        {/* Enable Toggle Section */}
        <View style={styles.toggleSection}>
          <TextComponent
            text={'Enable Biometric Authentication'}
            size={'1.5'}
          />
          <Switch
            style={styles.switchStyle}
            trackColor={{
              false: Colors.grayFaded,
              true: 'transparent',
            }}
            thumbColor={isToggle ? Colors.primaryColor : '#EAF6ED'}
            ios_backgroundColor="#EAF6ED"
            value={isToggle}
            onValueChange={() => {
              setIsToggle(!isToggle);
            }}
          />
        </View>

        {/* Biometric Type Display */}
        <View style={styles.biometricInfo}>
          <Text style={styles.biometricIcon}>{getBiometricIcon()}</Text>
          <Text style={styles.biometricLabel}>
            {isBiometricSupported ? getBiometricLabel() : 'Not Supported'}
          </Text>
        </View>

        {/* Status and Result Display */}
        <View style={styles.statusSection}>
          <Text style={styles.title}>Biometric Authentication</Text>

          <Text
            style={[
              styles.status,
              { color: isBiometricSupported ? '#4CAF50' : '#f44336' },
            ]}
          >
            {isBiometricSupported
              ? `Biometric authentication is available (${getBiometricLabel()})`
              : 'Biometric authentication is not supported on this device'}
          </Text>

          {authResult && (
            <View
              style={[
                styles.resultContainer,
                {
                  backgroundColor: authResult.includes('successful')
                    ? '#d4edda'
                    : '#f8d7da',
                },
              ]}
            >
              <Text
                style={[
                  styles.result,
                  {
                    color: authResult.includes('successful')
                      ? '#155724'
                      : '#721c24',
                  },
                ]}
              >
                {authResult}
              </Text>
            </View>
          )}
        </View>

        {/* Authentication Button */}
        <TouchableOpacity
          style={[
            styles.authButton,
            (!isBiometricSupported || isLoading) && styles.disabledButton,
          ]}
          onPress={handleBiometricAuth}
          disabled={!isBiometricSupported || isLoading}
          activeOpacity={0.7}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText}>
                {biometricType === 'faceId'
                  ? 'Use Face ID'
                  : 'Authenticate with Biometrics'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Additional Actions */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={async () => {
            if (isBiometricSupported) {
              try {
                const result =
                  await ReactNativeBiometrics.requestBiometricPermission();
                if (result.success) {
                  Alert.alert('Success', 'Biometric permission granted');
                } else {
                  Alert.alert(
                    'Error',
                    `Permission failed: ${result.errorMessage}`,
                  );
                }
              } catch (error) {
                Alert.alert('Error', 'Failed to request permission');
              }
            }
          }}
          disabled={!isBiometricSupported}
        >
          <Text style={styles.secondaryButtonText}>
            Request Biometric Permission
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default memo(BiometricAuthScreen);
