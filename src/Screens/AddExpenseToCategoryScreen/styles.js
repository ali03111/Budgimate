import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  card: {
    width: wp('90'),
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('3'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.5') },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: hp('1'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  editButton: {
    padding: wp('2'),
  },
  editIcon: {
    width: wp('4'),
    height: hp('2'),
  },
  description: {
    marginBottom: hp('1'),
    color: Colors.textGray,
  },
  progressContainer: {
    height: hp('1'),
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    marginBottom: hp('1'),
  },
  progressBar: {
    height: '100%',
    width: '0%', // Adjust dynamically based on spent/limit ratio if data is available
    backgroundColor: Colors.primaryColor,
    borderRadius: 5,
  },
  limitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1'),
  },
  expensesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp('2'),
  },
  addButton: {
    borderRadius: 5,
    paddingVertical: hp('0.5'),
    paddingHorizontal: wp('2'),
  },
  expenseDescription: {
    color: Colors.textGray,
  },
  categoryContainer: {
    width: wp('43'),
    paddingVertical: hp('1.2'),
    paddingHorizontal: wp('1.5'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: Colors.white,
    marginVertical: hp('2'),
  },
  priceMainView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('3'),
    borderRadius: 10,
    marginVertical: hp('2'),
    gap: hp('1'),
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
  },
  priceInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIncomeText: { textAlign: 'center', marginTop: hp('1') },
});
