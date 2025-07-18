import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  upperWhiteView: {
    width: wp('100'),
    // marginVertical: hp('0.5'),
    // paddingVertical: hp('1'),
  },
  headingText: {
    fontWeight: 'bold',
    paddingLeft: wp('2'),
    marginBottom: hp('1'),
  },
  leftIconStyle: {
    width: wp('10'),
    height: hp('5'),
  },
});
