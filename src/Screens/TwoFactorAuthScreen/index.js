import { View, Text, ImageBackground, Switch, Image } from 'react-native';
import React, { memo } from 'react';
import { LoginBg, radioCircle } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { styles } from './styles';

const TwoFactorAuthScreen = () => {
  return (
    <ImageBackground source={LoginBg} style={styles.container}>
      <HeaderComponent headerTitle={'Two-factor authentication'} isBack />
      <View style={styles.disableSection}>
        <TextComponent
          text={'Disable two - factor authentication'}
          size={'1.5'}
        />
        <Switch style={styles.switchStyle} />
      </View>
      <TextComponent
        text={
          'Two-Factor Authentication (2FA) helps protect your account by requiring a verification code in addition to your password when signing in.'
        }
        fade
        size={'1.5'}
        styles={styles.descriptionText}
      />
      <TextComponent
        text={'Enable two-factor authentication'}
        styles={styles.enableTitle}
      />
      <TextComponent
        text={'* Keep your account safe from unauthorized access'}
        styles={styles.bulletItem}
        size={1.5}
      />
      <TextComponent
        text={'* Get instant alerts on login attempts'}
        styles={styles.bulletItem}
        size={1.5}
      />
      <TextComponent
        text={'* Only you can access your data'}
        styles={styles.bulletItem}
        size={1.5}
      />
      <TextComponent
        text={"Choose how you'd like to receive your verification codes:"}
        isLightThemeColor
        size={'1.5'}
        styles={styles.methodText}
      />
      <View style={styles.methodOption}>
        <TextComponent text={'Text message'} size={'1.5'} />
        <Image
          source={radioCircle}
          resizeMode="contain"
          style={styles.radioImage}
        />
      </View>
      <View style={styles.methodOption}>
        <TextComponent text={'Email'} size={'1.5'} />
        <Image
          source={radioCircle}
          resizeMode="contain"
          style={styles.radioImage}
        />
      </View>
      <ThemeButton
        title={'Enable two-factor authentication'}
        isTheme
        style={styles.enableButton}
      />
    </ImageBackground>
  );
};

export default memo(TwoFactorAuthScreen);
