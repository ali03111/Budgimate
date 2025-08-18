import { View, Text, ImageBackground } from 'react-native';
import React, { memo, useState } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { home, LoginBg } from '../../Assets';
import TopBarComp from '../../Components/TopBarComp';
import TopBarNavigation from '../../Navigation/TopBarNavigation';
import AddIncomeBar from './AddIncomeBar';
import AddExpenseBar from './AddExpenseBar';

const AddNewScreen = ({ navigation }) => {
  const screens = [
    {
      name: 'Income',
      component: () => <AddIncomeBar navigation={navigation} />,
      label: 'Income',
    },
    {
      name: 'Expense',
      component: () => <AddExpenseBar navigation={navigation} />,
      label: 'Expense',
    },
  ];
  return (
    <ImageBackground style={{ flexGrow: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Add'} />
      <TopBarNavigation screens={screens} />
    </ImageBackground>
  );
};

export default memo(AddNewScreen);
