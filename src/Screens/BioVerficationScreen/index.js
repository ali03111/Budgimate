import { View, Text, Image, ImageBackground } from 'react-native';
import React, { memo, use } from 'react';
import { blackLock, LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import useBioVerficationScreen from './useBioVerficationScreen';

const BioVerficationScreen = ({ navigation }) => {
  const { handleBiometricAuth } = useBioVerficationScreen(navigation);
  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      source={LoginBg}
    >
      <Image
        source={blackLock}
        resizeMode="contain"
        style={{ width: wp('15'), height: hp('7') }}
        tintColor={'black'}
      />
      <TextComponent
        text={'BudgiMate Locked'}
        styles={{ marginVertical: hp('2') }}
        size={'4'}
        family={'bold'}
        isThemeColor
      />
      <ThemeButton
        title={'Unlock It'}
        style={{ width: wp('50') }}
        textStyle={{ fontWeight: '600' }}
        onPress={handleBiometricAuth}
      />
    </ImageBackground>
  );
};

export default memo(BioVerficationScreen);
