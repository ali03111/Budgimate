import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  container: {
    resizeMode: 'contain',
    flex: 1,
  },
  buttonStyle: {
    marginTop: hp('2'),
    width: wp('90'),
    alignSelf: 'center',
    // borderRadius: 30,
    height: hp('5'),
  },
  skipBtn: {
    width: wp('19'),
    // alignItems: 'flex-end',
    paddingTop: Platform.OS == 'ios' ? hp('5') : hp('2'),
    paddingRight: wp('3'),
    marginLeft: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
