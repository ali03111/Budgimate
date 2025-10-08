import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { hp, wp } from '../Hooks/useResponsive'; // adjust path if needed
import { Colors } from '../Theme/Variables'; // adjust path if needed
import { formatPrice } from '../Services/GlobalFunctions';

const IncomeExpensePriceComp = ({ totalExpense, totalIncome }) => {
  return (
    <View style={styles.container}>
      {/* Income Card */}
      <View style={styles.incomeCard}>
        <Text style={styles.amountText}>{formatPrice(totalIncome)}</Text>
        <Text style={styles.labelText}>Total income</Text>
      </View>

      {/* Expense Card */}
      <View style={styles.expenseCard}>
        <Text style={styles.amountText}>{formatPrice(totalExpense)}</Text>
        <Text style={styles.labelText}>Total expenses</Text>
      </View>
    </View>
  );
};

export default IncomeExpensePriceComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90'),
    alignSelf: 'center',
    marginVertical: hp('2'),
  },
  incomeCard: {
    flex: 1,
    backgroundColor: '#E9FFF1', // light green
    borderRadius: 10,
    paddingVertical: hp('1'),
    paddingHorizontal: wp('4'),
    marginRight: wp('2'),
    borderLeftWidth: 4,
    borderLeftColor: '#1FD161', // green stripe
  },
  expenseCard: {
    flex: 1,
    backgroundColor: '#FFECEC', // light red
    borderRadius: 10,
    paddingVertical: hp('1'),
    paddingHorizontal: wp('4'),
    marginLeft: wp('2'),
    borderLeftWidth: 4,
    borderLeftColor: '#F37C7C', // red stripe
  },
  amountText: {
    fontSize: hp('1.8'),
    fontWeight: 'bold',
    color: Colors.black,
  },
  labelText: {
    fontSize: hp('1.5'),
    color: Colors.textGray,
    marginTop: hp('0.5'),
  },
});
