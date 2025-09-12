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
    fontSize: hp('1.5'),
  },
  leftIconStyle: {
    width: wp('7'),
    height: hp('5'),
  },
});
