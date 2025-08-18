import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { incomeCircle, LoginBg, noteCircle, targetCircle } from '../../Assets';
import { TextComponent } from '../../Components/TextComponent';
import { hp } from '../../Hooks/useResponsive';
import ActiveAndInactiveCardComp from '../../Components/ActiveAndInactiveCardComp';

const AddExpenseBar = ({ navigation }) => {
  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <TextComponent
        text={'Select the following'}
        size={'1.5'}
        family={'500'}
        styles={{ marginVertical: hp('1'), marginHorizontal: hp('2') }}
      />
      <TextComponent
        text={
          'Choose the income fields below and manage your budget with budgimate.'
        }
        fade
        size={'1.2'}
        family={'400'}
        styles={{ marginHorizontal: hp('2') }}
      />
      <View style={{ alignItems: 'center', marginTop: hp('2'), gap: hp('2') }}>
        <ActiveAndInactiveCardComp
          onPress={() => navigation.navigate('ExpenseCategory')}
          title="Add Expense"
          subtitle="Add income to expense more"
          image={incomeCircle}
        />
        <ActiveAndInactiveCardComp
          // onPress={() => setActiveCard(activeCard === 'addIncome' ? null : 'addIncome')}
          title="Add expense to goals"
          subtitle="Contribute income to complete goals"
          image={targetCircle}
        />
        <ActiveAndInactiveCardComp
          // onPress={() => setActiveCard(activeCard === 'addIncome' ? null : 'addIncome')}
          title="Add expense to trace"
          subtitle="Trace your budget by adding income"
          image={noteCircle}
        />
      </View>
    </ImageBackground>
  );
};

export default AddExpenseBar;
