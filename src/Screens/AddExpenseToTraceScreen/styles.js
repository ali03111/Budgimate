import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },

  // Expense Card
  expenseCard: {
    width: wp('95'),
    backgroundColor: 'white',
    borderRadius: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    alignSelf: 'center',
  },
  expenseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusIcon: {
    width: wp('4'),
    height: hp('2'),
  },
  limitSpentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2'),
  },

  progressBackground: {
    marginTop: hp('1'),
    height: hp('0.8'),
    backgroundColor: '#EDEDED',
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primaryColor,
    borderRadius: hp('1'),
  },

  // Description
  descriptionLabel: {
    width: wp('95'),
    alignSelf: 'center',
    marginTop: hp('5'),
  },
  descriptionBox: {
    width: wp('95'),
    backgroundColor: 'white',
    height: hp('10'),
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: Colors.darkBlueColor,
    alignSelf: 'center',
    marginTop: hp('1'),
    paddingTop: Platform.OS == 'ios' ? hp('1.2') : 0,
    paddingHorizontal: wp('2.5'),
    overflow: 'scroll',
  },
  descriptionInput: {
    fontSize: hp('1.5'),
    // height: hp('8'),
  },

  // Category
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
    marginTop: hp('2'),
  },
  categoryHelperText: {
    width: wp('95'),
    alignSelf: 'center',
    marginTop: hp('1'),
  },

  cardStyle: {
    width: wp(95),
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: hp(2),
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: hp('2'),
    paddingHorizontal: wp('4'),
    flexDirection: 'row',
    alignItems: 'center',
  },

  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5'),
  },

  // Modal
  modalContent: {
    marginTop: hp('5'),
  },
  modalInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: Colors.dkBorderColor,
    borderWidth: 0.5,
    width: wp('90'),
    marginVertical: hp('2'),
    // marginBottom: hp('5'),
  },
  modalInput: {
    fontSize: hp('1.5'),
  },

  // Button
  createBtn: {
    width: wp('90'),
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp('3'),
    // marginVertical: hp('10'),
  },

  // Existing styles kept as is
  traceOptionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
  },

  basicTraceBox: {
    width: wp('45'),
    paddingVertical: hp('3'),
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.dkBorderColor,
    gap: hp('1'),
    paddingHorizontal: wp('6'),
  },

  proTraceBox: {
    width: wp('45'),
    paddingVertical: hp('3'),
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.dkBorderColor,
    gap: hp('1'),
    paddingHorizontal: wp('2'),
  },

  textCenter: {
    textAlign: 'center',
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

  priceInput: {
    fontSize: hp('2.5'),
    color: 'black',
  },

  addIncomeText: {
    textAlign: 'center',
    marginTop: hp('1'),
  },

  traceLabel: {
    marginLeft: wp('2.3'),
    marginVertical: hp('1'),
  },

  traceNameBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: Colors.dkBorderColor,
    width: wp('95'),
    height: hp('5'),
    paddingHorizontal: wp('2'),
    alignSelf: 'center',
  },

  traceNameInput: {
    fontSize: hp('1.5'),
    color: 'black',
    flex: 1,
  },

  priceTimeView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp('2'),
    marginLeft: wp('2'),
  },
});
