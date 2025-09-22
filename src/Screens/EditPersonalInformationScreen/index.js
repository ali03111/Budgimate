import { View, Text, ImageBackground } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { LoginBg } from '../../Assets';
import { CircleImage } from '../../Components/CircleImage';
import { hp, wp } from '../../Hooks/useResponsive';
import { InputComponent } from '../../Components/InputComponent';
import useEditPersonalInformationScreen from './useEditPersonalInformationScreen';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import ThemeButton from '../../Components/ThemeButton';

const EditPersonalInformationScreen = ({ navigation }) => {
  const { control, errors, reset, getValues, handleSubmit } =
    useEditPersonalInformationScreen(navigation);
  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Personal Information'} isBack />
      <CircleImage
        image={
          'https://images.pexels.com/photos/32891318/pexels-photo-32891318.jpeg'
        }
        uri={true}
        size={0.35}
        styles={{ alignSelf: 'center', marginTop: hp('2') }}
      />

      <KeyBoardWrapper styles={{ marginHorizontal: wp('5') }}>
        <InputComponent
          {...{
            heading: 'Full name',
            name: 'name',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'John Mayer',
            defaultValue: __DEV__ ? 'John Mayer' : '',
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.4 },
            headingStyles: { fontSize: hp('2') },
            textStyle: { fontSize: hp('1.8') },
          }}
        />
        <InputComponent
          {...{
            heading: 'Email',
            name: 'email',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Email',
            defaultValue: __DEV__ ? 'iphonexr@gmail.com' : '',
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.4 },
            headingStyles: { fontSize: hp('2') },
            textStyle: { fontSize: hp('1.8') },
            editable: false,
          }}
        />
        <ThemeButton
          title={'Update Profile'}
          style={{
            marginTop: hp('20'),
          }}
        />
      </KeyBoardWrapper>
    </ImageBackground>
  );
};

export default memo(EditPersonalInformationScreen);
