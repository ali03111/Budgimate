import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  ImgBg: {
    flex: 1,
  },
  priceMainView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('2'),
    borderRadius: 10,
  },
  priceInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIncomeText: { textAlign: 'center', marginTop: hp('1') },

  priceTimeView: {
    // width: wp('80'),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp('2'),
    marginLeft: wp('2'),
  },
  priceMultiView: {
    paddingHorizontal: wp('3'),
    backgroundColor: Colors.lightBlueBgColor,
    overflow: 'hidden',
    height: 'auto',
    paddingVertical: hp('1'),
    borderWidth: 1,
    borderColor: Colors.primaryColor,
  },

  catPickerView: {
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: 'white',
    height: hp('4'),
    paddingHorizontal: wp('2'),
    marginBottom: hp('1'),
    fontSize: hp('1.2'),
    color: 'black',
    justifyContent: 'center',
  },

  calenderIcon: { width: wp('5'), height: hp('3') },
  uploadImg: { width: wp('30'), height: hp('15') },
  inAppNotiText: { marginVertical: hp('2'), marginLeft: wp('6') },
  notiMultiView: { width: wp('95'), marginBottom: hp('2') },
  saveBtn: {
    width: wp('90'),
    height: hp('5'),
    alignSelf: 'center',
    marginTop: hp('30'),
  },
  inputStyle: { flex: 1, color: 'black', fontSize: hp('1.2') },

  textTouchBtn: {
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: 'white',
    height: hp('4'),
    paddingHorizontal: wp('2'),
    marginBottom: hp('1'),
    fontSize: hp('1.2'),
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    color: Colors.textGray,
  },
  // Component View

  mainView: {
    backgroundColor: 'transparent',
    paddingHorizontal: hp('2.3'),
    marginBottom: hp('1'),
  },
  compTitle: {
    fontSize: hp('1.5'),
    marginVertical: hp('1'),
    color: Colors.darkBlueColor,
  },
  innerView: {
    width: wp('90'),
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: 'white',
    height: hp('4'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2'),
    marginBottom: hp('1'),
  },
  errorText: {
    fontSize: hp('1.2'),
    color: 'red',
    marginLeft: wp('1'),
    marginBottom: hp('1'),
  },
});
