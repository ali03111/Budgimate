import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },

  traceOptionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
  },

  basicTraceBox: isSelected => ({
    width: wp('45'),
    paddingVertical: hp('3'),
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: isSelected ? Colors.lightBlueBgColor : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: isSelected ? Colors.primaryColor : Colors.dkBorderColor,
    gap: hp('1'),
    paddingHorizontal: wp('6'),
  }),

  proTraceBox: isSelected => ({
    width: wp('45'),
    paddingVertical: hp('3'),
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: isSelected ? Colors.lightBlueBgColor : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: isSelected ? Colors.primaryColor : Colors.dkBorderColor,
    gap: hp('1'),
    paddingHorizontal: wp('2'),
  }),

  textCenter: {
    textAlign: 'center',
  },

  priceMainView: {
    width: wp('95'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('3'),
    borderRadius: 10,
    marginVertical: hp('2'),
    gap: hp('1'),
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

  createBtn: {
    width: wp('95'),
    alignSelf: 'center',
    marginVertical: hp('10'),
  },

  priceTimeView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp('2'),
    marginLeft: wp('2'),
  },
});
