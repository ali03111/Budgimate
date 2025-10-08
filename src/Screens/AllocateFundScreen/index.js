import { View, Text, ImageBackground, FlatList } from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import PlusCardComp from '../../Components/plusCardComp';
import { keyExtractor } from '../../Utils';
import useAllocateFundScreen from './useAllocateFundScreen';
import { formatPrice } from '../../Services/GlobalFunctions';

const AllocateFundScreen = ({ navigation }) => {
  const { leftover } = useAllocateFundScreen(navigation);
  const renderData = useCallback(() => {
    return (
      <PlusCardComp
        remaining={`Remaining : $${120} of $${'200'}`}
        categoryName={'sdvsd'}
        rightText={'Allocate funds'}
      />
    );
  }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Allocate Leftover'} isBack />
      <View
        style={{
          width: wp('95'),
          borderRadius: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: hp('3'),
          alignSelf: 'center',
        }}
      >
        <TextComponent
          text={`Total Leftover Amount ${formatPrice(leftover)}`}
          size={'1.8'}
          family={'bold'}
        />
        <TextComponent
          text={`Your leftover amount is ${formatPrice(
            leftover,
          )}, from last cycle. You can allocate all funds to your income, goals, traces and increase spending limits.`}
          fade
          size={'1.3'}
          styles={{ width: wp('75'), textAlign: 'center', marginTop: hp('1') }}
        />
        <ThemeButton
          title={'Allocate all'}
          isTheme
          style={{ width: wp('40'), marginTop: hp('3'), height: hp('4') }}
          textStyle={{ fontSize: hp('1.5') }}
          onPress={() =>
            navigation.navigate('AllocateSelectorScreen', leftover)
          }
        />
      </View>
      <TextComponent
        text={'Leftover from Last Cycle'}
        size={'1.8'}
        family={'600'}
        styles={{ marginTop: hp('3'), marginLeft: wp('3') }}
      />
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={keyExtractor}
        renderItem={renderData}
        contentContainerStyle={{ alignSelf: 'center' }}
        //   contentContainerStyle={{ flex: 1 }}
      />
    </ImageBackground>
  );
};

export default memo(AllocateFundScreen);
