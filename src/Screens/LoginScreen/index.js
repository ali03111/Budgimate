import React, { memo, useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import {
  apple,
  facebook,
  google,
  lock,
  locksetting,
  logoImg,
  sms,
  tickemp,
  tickfill,
} from '../../Assets';
import { InputComponent } from '../../Components/InputComponent';
import { Controller } from 'react-hook-form';
import useLogin from './useLoginScreen';
import { Touchable } from '../../Components/Touchable';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import SocialBottomComp from '../../Components/SocialBottomComp';

const LoginScreen = ({ navigation }) => {
  const [check, setCheck] = useState();

  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    onPress,
    loginUser,
    appleIdlogin,
    googleLoginFunc,
    facebookLoginFunc,
    rememberValue,
    remember,
    socialLoginFun,
  } = useLogin(navigation);

  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <Image source={logoImg} resizeMode="contain" style={styles.logoImage} />

      <KeyBoardWrapper
        styles={styles.logInMain}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loginBottom}>
          <View style={styles.loginTop}>
            <TextComponent
              text={'Log in to continue'}
              styles={styles.signInText}
            />
          </View>

          <InputComponent
            {...{
              name: 'email',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Email',
              isImage: sms,
              defaultValue: __DEV__ ? 'iphonexr@gmail.com' : '',
              viewStyle: { height: hp('5') },
              inputIconStyle: { flex: 0.4 },
            }}
          />

          <InputComponent
            {...{
              name: 'password',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Password',
              isImage: locksetting,
              defaultValue: __DEV__ ? 'Test@123' : '',
              isSecure: true,
              inputIconStyle: styles.inputIconPassword,
              viewStyle: { height: hp('5') },
              inputIconStyle: { flex: 0.4 },
            }}
          />

          <View style={styles.forgotContainer}>
            <TextComponent
              text={'Forgot Password?'}
              styles={styles.forgetText}
              fade
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
            />
          </View>

          <View style={styles.buttonRow}>
            <ThemeButton
              onPress={() => navigation.navigate('SubscriptionScreen')}
              // onPress={handleSubmit(loginUser)}
              title={'Log In'}
              isTheme
              style={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
            <ThemeButton
              onPress={onPress}
              title={'Register'}
              isTransparent
              style={styles.buttonStyle}
              textStyle={styles.buttonText}
            />
          </View>

          <View style={styles.barMain}>
            <View style={styles.barLine}></View>
            <TextComponent
              text={'Or Continue With'}
              styles={styles.barText}
              fade
            />
            <View style={styles.barLine}></View>
          </View>

          <SocialBottomComp onSocialPress={socialLoginFun} />
        </View>
      </KeyBoardWrapper>
    </ImageBackground>
  );
};

export default memo(LoginScreen);
