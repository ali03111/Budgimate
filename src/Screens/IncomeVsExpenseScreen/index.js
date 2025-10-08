import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
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
import useIncomeVsExpenseScreen from './useIncomeVsExpenseScreen';
import { keyExtractor } from '../../Utils';
import { imageUrl } from '../../Utils/Urls';
import { formatPrice } from '../../Services/GlobalFunctions';

const IncomeVsExpenseScreen = ({ navigation }) => {
  const {
    totalExpense,
    totalIncome,
    expensesByCategory,
    expenseData,
    chartData,
    setDateType,
    refetch,
    dataType,
    activeTab,
    setActiveTab,
  } = useIncomeVsExpenseScreen(navigation);

  const tabs = [
    { key: 'graph', title: 'Graph' },
    { key: 'chart', title: 'Chart' },
  ];

  const renderLineChart = useCallback(() => {
    return <WeeklyFinanceChartComp chartDataArry={chartData} />;
  }, [chartData, dataType, activeTab, refetch]);

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Income vs. Expenses'} isBack />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('10') }}
      >
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        >
          <MultiSelectButton
            items={[
              {
                id: 'day',
                title: 'Day',
              },
              {
                id: 'week',
                title: 'Week',
              },
              {
                id: 'month',
                title: 'Month',
              },
            ]}
            // isDisable
            selectedAlter={dataType}
            isPrimaryColorStyle
            onSelectVal={(_, e) => {
              setDateType(e);
              setTimeout(() => {
                refetch();
                setActiveTab(activeTab);
              }, 1000);
            }}
          />
        </View> */}
        <IncomeExpensePriceComp
          totalExpense={totalExpense}
          totalIncome={totalIncome}
        />
        <TopTabComp
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
        {/* Content Area */}
        {activeTab === 'graph' ? (
          chartData && chartData.length > 0 && renderLineChart()
        ) : (
          <DonutChartComp expenseData={expenseData} />
        )}

        <TextComponent
          text={'Spending categories'}
          size={'1.8'}
          family={'bold'}
          styles={{ marginLeft: wp('2'), marginTop: hp('2') }}
        />

        <FlatList
          data={expensesByCategory}
          renderItem={({ item }) => (
            <CatCardComp
              icon={imageUrl(item.category_icon)}
              title={item.category_name}
              remaining={formatPrice(item.total_amount)}
              // color={item.color}
            />
          )}
          keyExtractor={keyExtractor}
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
