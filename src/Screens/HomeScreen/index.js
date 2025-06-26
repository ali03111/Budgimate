import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import React, { memo } from 'react';
import {
  addCircleWhite,
  arrowRight,
  arrRight,
  basket,
  building,
  cardReceive,
  cardSend,
  HomeBg,
  plusWhite,
  station,
  wallet,
} from '../../Assets';
import { styles } from './styles';
import HomeHeaderComp from '../../Components/HomeHeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import PriceCardComp from '../../Components/PriceCardComp';
import { Colors } from '../../Theme/Variables';
import { MultiView } from '../../Components/MultiView';
import DonutChartComp from '../../Components/DonutChartComp';
import WeeklyFinanceChartComp from '../../Components/WeeklyFinanceChartComp';

const categoryItem = [
  {
    title: `Fuel`,
    leftIcon: station,
    rightText: '$358.30',
  },
  {
    title: 'House holds',
    leftIcon: building,
    rightText: '$358.30',
  },
  {
    title: 'Food and grocery',
    leftIcon: basket,
    rightText: '$358.30',
  },
];

const HomeScreen = () => {
  return (
    <ImageBackground source={HomeBg} style={styles.ImgBg}>
      <HomeHeaderComp />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp('2'),
        }}
      >
        <Image
          source={wallet}
          resizeMode="contain"
          style={{ width: wp('5') }}
        />
        <TextComponent
          text={'Remaining budget'}
          isWhite
          styles={{ marginLeft: wp('1'), fontSize: hp('1.5') }}
        />
      </View>
      <View
        style={{
          width: wp('95'),
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TextComponent
          text={'$18675.80'}
          isGreen
          styles={{ fontSize: hp('2.5'), fontWeight: 'bold' }}
        />
        <Touchable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: wp('19'),
          }}
        >
          <Image
            source={plusWhite}
            resizeMode="contain"
            style={{ width: wp('5'), height: hp('2') }}
          />
          <TextComponent
            text={'Add new'}
            isWhite
            styles={{ fontSize: hp('1.5') }}
          />
        </Touchable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: wp('95'),
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: hp('1'),
        }}
      >
        <PriceCardComp
          title={'Total income:'}
          img={cardReceive}
          price={'$25000.00'}
        />
        <PriceCardComp
          title={'Total expenses:'}
          img={cardSend}
          price={'$6324.20'}
          priceBgColor={'rgba(255, 222, 222, 1)'}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: hp('2'),
          paddingHorizontal: wp('2.5'),
          paddingBottom: hp('10'),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp('1'),
          }}
        >
          <TextComponent
            text={'Remaining expenses'}
            styles={{ fontWeight: 'bold' }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp('17'),
            }}
          >
            <TextComponent text={'See more'} size={'1.3'} isLightThemeColor />
            <Image
              source={arrowRight}
              resizeMode="contain"
              style={{ width: wp('5') }}
              tintColor={Colors.primaryColor}
            />
          </View>
        </View>
        <TextComponent text={'May 2025'} isDarkFade size={'1.3'} />
        <MultiView
          data={categoryItem}
          viewStyle={{
            alignSelf: 'center',
            width: wp('100'),
            marginTop: hp('2'),
          }}
          dividerStyles={{ marginLeft: wp('8') }}
          // leftStyles={styles.leftIconStyle}
          titleStyles={{ fontSize: hp('1.2') }}
          rightTextStyles={{ color: 'red' }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp('1'),
          }}
        >
          <TextComponent
            text={'Expenses chart'}
            styles={{ fontWeight: 'bold' }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp('18'),
            }}
          >
            <TextComponent
              text={'See details'}
              size={'1.3'}
              isLightThemeColor
            />
            <Image
              source={arrowRight}
              resizeMode="contain"
              style={{ width: wp('5') }}
              tintColor={Colors.primaryColor}
            />
          </View>
        </View>
        <DonutChartComp />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp('1'),
          }}
        >
          <TextComponent
            text={'Income vs. Expenses'}
            styles={{ fontWeight: 'bold' }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: wp('18'),
            }}
          >
            <TextComponent
              text={'View details'}
              size={'1.3'}
              isLightThemeColor
            />
            <Image
              source={arrowRight}
              resizeMode="contain"
              style={{ width: wp('5') }}
              tintColor={Colors.primaryColor}
            />
          </View>
        </View>
        <WeeklyFinanceChartComp />
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(HomeScreen);
