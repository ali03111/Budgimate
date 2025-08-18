import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp('2'),
    paddingTop: hp('2'),
  },
  categoryContainer: {
    width: wp('95'),
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
    marginVertical: hp('1'),
  },
  arrowIcon: {
    width: wp('3'),
    height: hp('2'),
  },

  switchStyle: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
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

  addIncomeText: { textAlign: 'center', marginTop: hp('1') },

  priceTimeView: {
    // width: wp('80'),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp('2'),
    marginLeft: wp('2'),
  },

  inAppNotiText: { marginVertical: hp('2') },
  //   notiMultiView: { marginBottom: hp('2') },
});
