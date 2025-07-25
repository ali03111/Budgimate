import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  ImgBg: {
    flex: 1,
    // paddingHorizontal: hp('2'),
  },
  headingStyle: {
    fontWeight: 'bold',
    marginLeft: wp('3'),
    marginBottom: hp('2'),
  },
});
