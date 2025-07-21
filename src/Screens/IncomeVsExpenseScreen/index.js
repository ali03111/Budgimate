import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';

const IncomeVsExpenseScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Income vs. Expenses'} isBack />
    </View>
  );
};

export default memo(IncomeVsExpenseScreen);
