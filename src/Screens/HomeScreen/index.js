import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import {
  addCircleWhite,
  arrowRight,
  arrRight,
  arrRightPurple,
  basket,
  blueCircle,
  building,
  cardReceive,
  cardSend,
  crossWhite,
  emptyWallet,
  HomeBg,
  moneyWallet,
  plusWhite,
  station,
  wallet,
  yellowCircle,
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
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import { keyExtractor } from '../../Utils';

const HomeScreen = ({ navigation }) => {
  const {
    totalExpense,
    totalIncome,
    recentExpenses,
    expenseData,
    chartData,
    spendungOverData,
    leftOver,
  } = useHomeScreen(navigation);
  const categoryItem = recentExpenses.map(res => ({
    title: res?.category?.name,
    leftIcon: { uri: imageUrl(res?.category?.icon) },
    rightText: formatPrice(res?.amount),
    // leftStyle: { width: wp('5'), height: hp('3') },
  }));

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ExpenseProgressCard
          key={index}
          item={item}
          // onPres={() =>
          //   navigation.navigate('AddExpenseToCategoryScreen', {
          //     catVal: {
          //       id: item?.expense_category_id,
          //       name: item?.category_name,
          //     },
          //     price: item?.limit,
          //     module_type: 'basic',
          //   })
          // }
        />
      );
    },
    [spendungOverData],
  );

  console.log(
    'spendungOverDataspendungOverDataspendungOverDataspendungOverData',
    spendungOverData?.categories_list,
  );

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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: wp('2'),
          marginTop: hp('2'),
        }}
      >
        <TextComponent text={'Cycle Frequency:'} isWhite size={'1.5'} />
        {spendungOverData?.budget_cycle?.frequency && (
          <TextComponent
            text={`${spendungOverData?.budget_cycle?.frequency}`}
            isThemeColor
            size={'1.5'}
          />
        )}
      </View>

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
      <View style={styles.cardContainer}>
        <ImageBackground
          source={yellowCircle}
          resizeMode="contain"
          style={{ width: wp('46'), height: hp('16'), alignItems: 'center' }}
        >
          <Image
            source={moneyWallet}
            resizeMode="contain"
            style={{
              width: wp('8'),
              height: hp('3'),
              marginTop: hp('2'),
              marginBottom: hp('1'),
            }}
          />
          <TextComponent
            text={formatPrice(spendungOverData?.income_available_to_budget)}
            size={'2.5'}
            family={'600'}
          />
          <TextComponent
            text={'Income Available to Budget'}
            size={'1.5'}
            styles={{
              textAlign: 'center',
              width: wp('30'),
              marginTop: hp('0.5'),
            }}
          />
        </ImageBackground>
        <ImageBackground
          source={blueCircle}
          resizeMode="contain"
          style={{ width: wp('54'), height: hp('16'), alignItems: 'center' }}
        >
          <Image
            source={emptyWallet}
            resizeMode="contain"
            style={{
              width: wp('8'),
              height: hp('3'),
              marginTop: hp('2'),
              marginBottom: hp('1'),
            }}
          />
          <TextComponent
            text={formatPrice(spendungOverData?.total_remaining_income)}
            size={'2.5'}
            family={'600'}
          />
          <TextComponent
            text={'Total Remaining Cycle Income'}
            size={'1.5'}
            styles={{
              textAlign: 'center',
              width: wp('30'),
              marginTop: hp('0.5'),
            }}
          />
        </ImageBackground>
      </View>
      {/* <View style={styles.budgetContainer}>
        <TextComponent
          text={formatPrice(totalIncome - totalExpense)}
          isGreen
          styles={styles.budgetAmount}
        />
      </View> */}
      {/* <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: calculatePercentage(totalExpense, totalIncome) },
          ]}
        />
      </View> */}

      {leftOver > 0 && (
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
            <TextComponent text={'💰Great Job!'} family={'600'} size={'2'} />
            {/* <Touchable>
            <Image
              source={crossWhite}
              resizeMode="contain"
              style={{ width: wp('4'), height: hp('1.8') }}
              tintColor={'black'}
            />
          </Touchable> */}
          </View>
          {/* <TextComponent
            text={`You’ve got ${formatPrice(
              leftOver,
            )} left unspent — that’s money working for you.`}
            size={'1.8'}
            styles={{ marginTop: hp('1') }}
          /> */}
          <TextComponent
            text={
              'You came under budget last cycle and have leftover funds to allocate.'
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
      )}
      <View style={styles.scrollContent}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: hp('60') }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHeader}>
            {/* {Array.isArray(spendungOverData?.categories_list) &&
              spendungOverData?.categories_list.length > 0 && (
            <>
            </>
                )} */}
            <TextComponent
              text="Spending Overview"
              styles={styles.sectionTitle}
            />
            <View style={styles.seeMoreContainer}>
              <TextComponent
                text="See more"
                size="1.6"
                isLightThemeColor
                disabled={!chartData && chartData.length === 0}
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
          {spendungOverData?.categories_list &&
          spendungOverData?.categories_list.length > 0 ? (
            <FlatList
              data={spendungOverData?.categories_list}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          ) : (
            <TextComponent
              text="No categories available"
              styles={{ textAlign: 'center', marginTop: hp('2') }}
            />
          )}

          {/* <MultiView
            data={categoryItem}
            viewStyle={styles.multiViewContainer}
            dividerStyles={styles.multiViewDivider}
            titleStyles={styles.categoryTitle}
            rightTextStyles={styles.categoryRightText}
          /> */}

          <View style={styles.sectionHeader}>
            <TextComponent text="Expenses chart" styles={styles.sectionTitle} />
            <View style={styles.detailsContainer}>
              <TextComponent
                text="See details"
                size="1.6"
                isLightThemeColor
                disabled={!expenseData || expenseData.length === 0}
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
          {expenseData && expenseData.length > 0 ? (
            <DonutChartComp expenseData={expenseData} />
          ) : (
            <TextComponent
              text="No expense data available"
              styles={{ textAlign: 'center', marginTop: hp('2') }}
            />
          )}

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
                disabled={!chartData || chartData.length === 0}
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
          {chartData && chartData.length > 0 ? (
            <WeeklyFinanceChartComp chartDataArry={chartData} />
          ) : (
            <TextComponent
              text="No chart data available"
              styles={{ textAlign: 'center', marginTop: hp('2') }}
            />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default memo(HomeScreen);
