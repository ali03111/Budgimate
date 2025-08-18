import { View, Text, ImageBackground } from 'react-native';
import React, { memo } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Colors } from '../../Theme/Variables';

const CreateNewTraceScreen = () => {
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Create a New Trace'} isBack />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: wp('95'),
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            width: wp('45'),
            paddingVertical: hp('3'),
            borderRadius: 10,
            borderWidth: 0.5,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors.dkBorderColor,
            gap: hp('1'),
            paddingHorizontal: wp('6'),
          }}
        >
          <TextComponent text={'Basic trace'} size={'1.5'} family={'500'} />
          <TextComponent
            text={'Simple limit-based tracking'}
            size={'1.2'}
            fade
            styles={{ textAlign: 'center' }}
          />
        </View>
        <View
          style={{
            width: wp('45'),
            paddingVertical: hp('3'),
            borderRadius: 10,
            borderWidth: 0.5,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors.dkBorderColor,
            gap: hp('1'),
            paddingHorizontal: wp('2'),
          }}
        >
          <TextComponent text={'Pro trace'} size={'1.5'} family={'500'} />
          <TextComponent
            text={'Advanced category-based tracking'}
            size={'1.2'}
            fade
            styles={{ textAlign: 'center' }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default memo(CreateNewTraceScreen);
