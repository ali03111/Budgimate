import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  themeButton: {
    width: 'auto',
    paddingHorizontal: wp('2'),
    alignSelf: 'flex-start',
    height: hp('3.5'),
    marginLeft: wp('2'),
  },
  themeButtonText: {
    fontSize: hp('1.8'),
  },
  textComponent: {
    marginLeft: wp('2'),
    marginVertical: hp('1'),
  },
  priceMainView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('2'),
    borderRadius: 10,
    marginTop: hp('3'),
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
  },
  priceInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIncomeText: { textAlign: 'center', marginTop: hp('1') },
  inputStyle: { flex: 1, color: 'black', fontSize: hp('1.8') },
  traceNameBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: Colors.dkBorderColor,
    width: wp('90'),
    height: hp('5'),
    paddingHorizontal: wp('2'),
    alignSelf: 'center',
    borderWidth: 0.5,
    marginTop: hp('2'),
  },

  traceNameInput: {
    fontSize: hp('1.8'),
    color: 'black',
    flex: 1,
  },
});
