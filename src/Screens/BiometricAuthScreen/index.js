import { View, Text, Button, ImageBackground, Switch } from 'react-native';
import React, { memo } from 'react';
import useBiometricAuthScreen from './useBiometricAuthScreen';
import styles from './styles';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';

const BiometricAuthScreen = () => {
  const { isBiometricSupported, authResult, handleBiometricAuth } =
    useBiometricAuthScreen();

  return (
    <ImageBackground style={styles.container} source={LoginBg}>
      <HeaderComponent headerTitle={'Enable face ID'} isBack />
      <View style={styles.disableSection}>
        <TextComponent text={'Enable face ID'} size={'1.5'} />
        <Switch style={styles.switchStyle} />
      </View>
      {/* <Text style={styles.title}>Biometric Authentication</Text> */}

      {/* <Text style={styles.status}>
        {isBiometricSupported
          ? 'Biometric authentication is available'
          : 'Biometric authentication is not supported'}
      </Text>
      {authResult && <Text style={styles.result}>{authResult}</Text>}
      <Button
        title="Authenticate with Biometrics"
        onPress={handleBiometricAuth}
        disabled={!isBiometricSupported}
      /> */}
    </ImageBackground>
  );
};

export default memo(BiometricAuthScreen);
