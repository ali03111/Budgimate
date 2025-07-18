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
  basket,
  building,
  cardReceive,
  cardSend,
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

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={HomeBg} style={globalStyles.ImgBg}>
      <HomeHeaderComp />

      <View style={styles.budgetRow}>
        <Image source={wallet} resizeMode="contain" style={styles.walletIcon} />
        <TextComponent
          text="Remaining budget"
          isWhite
          styles={styles.remainingBudgetText}
        />
      </View>

      <View style={styles.budgetContainer}>
        <TextComponent text="$18675.80" isGreen styles={styles.budgetAmount} />
        <Touchable style={styles.addNewButton}>
          <Image
            source={plusWhite}
            resizeMode="contain"
            style={styles.addIcon}
          />
          <TextComponent text="Add new" isWhite styles={styles.addNewText} />
        </Touchable>
      </View>

      <View style={styles.cardContainer}>
        <PriceCardComp
          title="Total income:"
          img={cardReceive}
          price="$25000.00"
        />
        <PriceCardComp
          title="Total expenses:"
          img={cardSend}
          price="$6324.20"
          priceBgColor="rgba(255, 222, 222, 1)"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <TextComponent
            text="Remaining expenses"
            styles={styles.sectionTitle}
          />
          <View style={styles.seeMoreContainer}>
            <TextComponent text="See more" size="1.3" isLightThemeColor />
            <Image
              source={arrowRight}
              resizeMode="contain"
              style={styles.arrowIcon}
              tintColor={Colors.primaryColor}
            />
          </View>
        </View>

        <TextComponent text="May 2025" isDarkFade size="1.3" />

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
            <TextComponent text="See details" size="1.3" isLightThemeColor />
            <Image
              source={arrowRight}
              resizeMode="contain"
              style={styles.arrowIcon}
              tintColor={Colors.primaryColor}
            />
          </View>
        </View>

        <DonutChartComp />

        <View style={styles.sectionHeader}>
          <TextComponent
            text="Income vs. Expenses"
            styles={styles.sectionTitle}
          />
          <View style={styles.detailsContainer}>
            <TextComponent text="View details" size="1.3" isLightThemeColor />
            <Image
              source={arrowRight}
              resizeMode="contain"
              style={styles.arrowIcon}
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
