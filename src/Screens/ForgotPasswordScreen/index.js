import { View, Text, ImageBackground, Image } from 'react-native';
import React, { memo } from 'react';
import { arrowLeft, heart, LoginBg, sms, stepBg } from '../../Assets';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import { InputComponent } from '../../Components/InputComponent';
import useForgotPasswordScreen from './useForgotPasswordScreen';
import { Colors } from '../../Theme/Variables';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';
import { hp, wp } from '../../Hooks/useResponsive';

const ForgotPasswordScreen = ({ navigation }) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    forgotPassword,
  } = useForgotPasswordScreen(navigation);
  return (
    <>
      <ImageBackground source={LoginBg} style={styles.container}>
        <Touchable style={styles.skipBtn} onPress={navigation.goBack}>
          <Image
            source={arrowLeft}
            style={{
              resizeMode: 'contain',
              tintColor: 'black',
              width: wp('5'),
              // ...styles.arrowback,
              // ...backIconStyle,
            }}
          />
          <TextComponent
            text={'Back'}
            fade
            // onPress={() => handleNextStep[step]()}
          />
        </Touchable>
        <TextComponent
          text={'Recover Password'}
          styles={{
            fontSize: hp('2.5'),
            fontWeight: 'bold',
            marginLeft: wp('5'),
          }}
        />
        <TextComponent
          text={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          }
          styles={{
            marginLeft: wp('5'),
            marginVertical: hp('2'),
            fontSize: hp('1.8'),
            color: 'gray',
            width: wp('85'),
          }}
        />
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
            defaultValue: __DEV__ ? 'iphone15@gmail.com' : '',
            viewStyle: {
              height: hp('5'),
              width: wp('90'),
              alignSelf: 'center',
            },
            inputIconStyle: { flex: 0.5 },
          }}
        />
        <ThemeButton
          onPress={handleSubmit(forgotPassword)}
          title={'Send'}
          //   isYellowTheme
          isTheme
          textStyle={{ fontSize: hp('1.5') }}
          style={styles.buttonStyle}
        />
      </ImageBackground>
    </>
  );
};

export default memo(ForgotPasswordScreen);
