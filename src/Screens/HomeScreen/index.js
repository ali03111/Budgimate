import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { memo } from 'react';
import {
  addCircleWhite,
  arrowRight,
  arrRight,
  arrRightPurple,
  basket,
  building,
  cardReceive,
  cardSend,
  crossWhite,
  HomeBg,
  plusWhite,
  station,
  wallet,
} from '../../Assets';
import { styles as globalStyles, styles } from './styles';
import HomeHeaderComp from '../../Components/HomeHeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import PriceCardComp from '../../Components/PriceCardComp';
import { Colors } from '../../Theme/Variables';
import { MultiView } from '../../Components/MultiView';
import DonutChartComp from '../../Components/DonutChartComp';
import WeeklyFinanceChartComp from '../../Components/WeeklyFinanceChartComp';
import ThemeButton from '../../Components/ThemeButton';
import useHomeScreen from './useHomeScreen';
import {
  calculatePercentage,
  formatPrice,
} from '../../Services/GlobalFunctions';
import { imageUrl } from '../../Utils/Urls';

const HomeScreen = ({ navigation }) => {
  const { totalExpense, totalIncome, recentExpenses, expenseData, chartData } =
    useHomeScreen(navigation);
  const categoryItem = recentExpenses.map(res => ({
    title: res?.category?.name,
    leftIcon: { uri: imageUrl(res?.category?.icon) },
    rightText: formatPrice(res?.amount),
    // leftStyle: { width: wp('5'), height: hp('3') },
  }));

  return (
    <ImageBackground source={HomeBg} style={globalStyles.ImgBg}>
      <HomeHeaderComp totalExpense={totalExpense} totalIncome={totalIncome} />

      {/* <View style={styles.budgetRow}>
        <Image source={wallet} resizeMode="contain" style={styles.walletIcon} />
        <TextComponent
          text="Remaining budget"
          isWhite
          styles={styles.remainingBudgetText}
        />
      </View> */}

      <View style={styles.cardContainer}>
        <PriceCardComp
          title="Total income:"
          img={cardReceive}
          price={formatPrice(totalIncome)}
        />
        <PriceCardComp
          title="Total expenses:"
          img={cardSend}
          price={formatPrice(totalExpense)}
          priceBgColor="rgba(255, 222, 222, 1)"
        />
      </View>
      <View style={styles.budgetContainer}>
        <TextComponent
          text={formatPrice(totalIncome - totalExpense)}
          isGreen
          styles={styles.budgetAmount}
        />
      </View>
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: calculatePercentage(totalExpense, totalIncome) },
          ]}
        />
      </View>

      <View
        style={{
          width: wp('95'),
          backgroundColor: Colors.secondryColor,
          marginTop: hp('2'),
          alignSelf: 'center',
          borderRadius: 10,
          paddingVertical: hp('2'),
          paddingHorizontal: wp('2'),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextComponent
            text={'💰Surplus Success!'}
            family={'600'}
            size={'2'}
          />
          <Touchable>
            <Image
              source={crossWhite}
              resizeMode="contain"
              style={{ width: wp('4'), height: hp('1.8') }}
              tintColor={'black'}
            />
          </Touchable>
        </View>
        <TextComponent
          text={'You’ve got $235 left unspent — that’s money working for you.'}
          size={'1.8'}
          styles={{ marginTop: hp('1') }}
        />
        <TextComponent
          text={
            'Smart spending leads to smarter choices. Ready to save, invest, or treat yourself?'
          }
          size={'1.8'}
          styles={{ marginTop: hp('1') }}
        />
        <ThemeButton
          title={'Allocate funds'}
          style={{
            width: wp('32'),
            height: hp('4'),
            alignSelf: 'flex-end',
            backgroundColor: 'white',
          }}
          textStyle={{ fontSize: hp('1.8'), color: 'black' }}
          image={arrRightPurple}
          isRight
          imageStyle={{
            width: wp('3'),
            height: hp('1.5'),
            tintColor: Colors.black,
          }}
          onPress={() => navigation.navigate('AllocateFundScreen')}
        />
      </View>
      <View style={styles.scrollContent}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp('60') }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHeader}>
            <TextComponent
              text="Remaining expenses"
              styles={styles.sectionTitle}
            />
            <View style={styles.seeMoreContainer}>
              <TextComponent
                text="See more"
                size="1.6"
                isLightThemeColor
                onPress={() => navigation.navigate('IncomeVsExpenseScreen')}
              />
              <Image
                source={arrowRight}
                resizeMode="contain"
                style={styles.arrowIcon}
                tintColor={Colors.primaryColor}
              />
            </View>
          </View>

          <MultiView
            data={categoryItem}
            viewStyle={styles.multiViewContainer}
            dividerStyles={styles.multiViewDivider}
            titleStyles={styles.categoryTitle}
            rightTextStyles={styles.categoryRightText}
          />

          <View style={styles.sectionHeader}>
            <TextComponent text="Expenses chart" styles={styles.sectionTitle} />
            <View style={styles.detailsContainer}>
              <TextComponent
                text="See details"
                size="1.6"
                isLightThemeColor
                onPress={() => navigation.navigate('IncomeVsExpenseScreen')}
              />
              <Image
                source={arrowRight}
                resizeMode="contain"
                style={styles.arrowIcon}
                tintColor={Colors.primaryColor}
              />
            </View>
          </View>

          <DonutChartComp expenseData={expenseData} />

          <View style={styles.sectionHeader}>
            <TextComponent
              text="Income vs. Expenses"
              styles={styles.sectionTitle}
            />
            <View style={styles.detailsContainer}>
              <TextComponent
                text="View details"
                size="1.6"
                isLightThemeColor
                onPress={() => navigation.navigate('IncomeVsExpenseScreen')}
              />
              <Image
                source={arrowRight}
                resizeMode="contain"
                style={styles.arrowIcon}
                tintColor={Colors.primaryColor}
              />
            </View>
          </View>
          {chartData && chartData.length > 0 && (
            <WeeklyFinanceChartComp chartDataArry={chartData} />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default memo(HomeScreen);
