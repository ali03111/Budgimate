import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { memo, useState } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { LoginBg } from '../../Assets';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import IncomeExpensePriceComp from '../../Components/IncomeExpensePriceComp';
import TopTabComp from '../../Components/TopTabComp';
import { styles } from './styles';
import WeeklyFinanceChartComp from '../../Components/WeeklyFinanceChartComp';
import DonutChartComp from '../../Components/DonutChartComp';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import CatCardComp from '../../Components/CatCardComp';

const IncomeVsExpenseScreen = () => {
  const [activeTab, setActiveTab] = useState('graph');

  const tabs = [
    { key: 'graph', title: 'Graph' },
    { key: 'chart', title: 'Chart' },
  ];

  const categories = [
    {
      id: 1,
      icon: 'fuel',
      title: 'Vehicle fuel',
      remaining: 800,
      color: '#2E86DE',
    },
    {
      id: 2,
      icon: 'home',
      title: 'House holds',
      remaining: 243,
      color: '#E67E22',
    },
    {
      id: 3,
      icon: 'basket',
      title: 'Food and grocery',
      remaining: 235,
      color: '#8E44AD',
    },
    {
      id: 4,
      icon: 'silverware-fork-knife',
      title: 'Dining Out',
      remaining: 243,
      color: '#E74C3C',
    },
    {
      id: 5,
      icon: 'home',
      title: 'House holds',
      remaining: 243,
      color: '#E67E22',
    },
    {
      id: 6,
      icon: 'fuel',
      title: 'Vehicle fuel',
      remaining: 800,
      color: '#2E86DE',
    },
  ];

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Income vs. Expenses'} isBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('10') }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <MultiSelectButton
            items={[
              {
                id: 'Day',
                title: 'Day',
              },
              {
                id: 'Week',
                title: 'Week',
              },
              {
                id: 'Month',
                title: 'Month',
              },
              {
                id: 'Year',
                title: 'Year',
              },
            ]}
            isDisable
            selectedAlter={{ id: 'Month', title: 'Month' }}
            isPrimaryColorStyle
          />
        </View>
        <IncomeExpensePriceComp />
        <TopTabComp
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
        {/* Content Area */}
        {activeTab === 'graph' ? (
          <View style={{ alignSelf: 'center' }}>
            <WeeklyFinanceChartComp />
          </View>
        ) : (
          <DonutChartComp />
        )}

        <TextComponent
          text={'Spending categories'}
          size={'1.8'}
          family={'bold'}
          styles={{ marginLeft: wp('2') }}
        />

        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CatCardComp
              icon={item.icon}
              title={item.title}
              remaining={item.remaining}
              color={item.color}
            />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default memo(IncomeVsExpenseScreen);
