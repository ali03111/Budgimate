import { View, Text, ImageBackground } from 'react-native';
import React, { memo } from 'react';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { InputComponent } from '../../Components/InputComponent';
import useChangePasswordScreen from './useChangePasswordScreen';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import { lock, locksetting, LoginBg, passwordIcon } from '../../Assets';
import ThemeButton from '../../Components/ThemeButton';
import { Colors } from '../../Theme/Variables';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp } from '../../Hooks/useResponsive';

const ChangePasswordScreen = ({ navigation }) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    changePassword,
  } = useChangePasswordScreen(navigation);
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={LoginBg}
      showsVerticalScrollIndicator={false}
    >
      <HeaderComponent headerTitle={'Change Password'} isBack />
      <KeyBoardWrapper styles={styles.container}>
        <TextComponent text={'Change Password ?'} styles={styles.title} />
        <TextComponent
          text={'We will get back to your account'}
          styles={styles.subTitle}
        />
        <TextComponent text={'Old Password'} styles={styles.passText} />
        <InputComponent
          {...{
            name: 'password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Password*',
            isImage: locksetting,
            defaultValue: '',
            isSecure: true,
            isImage: passwordIcon,
            inputIconStyle: styles.lockstyle,
            viewStyle: styles.inputMain,
            placeholderTextColor: Colors.dkBorderColor,
            textStyle: { color: Colors.black, fontSize: hp('1.3') },
            errorStyle: { color: Colors.themeRed },
            selectionColor: 'black',
            rightIconColor: 'gray',
          }}
        />
        <TextComponent text={'New Password'} styles={styles.passText} />
        <InputComponent
          {...{
            name: 'new_password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'New Password*',
            isImage: locksetting,
            defaultValue: '',
            isSecure: true,
            isImage: passwordIcon,
            inputIconStyle: styles.lockstyle,
            viewStyle: styles.inputMain,
            placeholderTextColor: Colors.dkBorderColor,
            textStyle: { color: Colors.black, fontSize: hp('1.3') },
            errorStyle: { color: Colors.themeRed },
            selectionColor: 'black',
            rightIconColor: 'gray',
          }}
        />
        <InputComponent
          {...{
            name: 'confirm_password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Confirm Password*',
            isImage: locksetting,
            defaultValue: '',
            isSecure: true,
            isImage: passwordIcon,
            inputIconStyle: styles.lockstyle,
            viewStyle: styles.inputMain,
            placeholderTextColor: Colors.dkBorderColor,
            textStyle: { color: Colors.black, fontSize: hp('1.3') },
            errorStyle: { color: Colors.themeRed },
            selectionColor: 'black',
            rightIconColor: 'gray',
          }}
        />
        <ThemeButton
          title={'Save'}
          style={styles.saveBtn}
          onPress={handleSubmit(changePassword)}
          textStyle={styles.saveText}
        />
      </KeyBoardWrapper>
    </ImageBackground>
  );
};

export default memo(ChangePasswordScreen);
