import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(2.5),
    paddingBottom: hp(1.5),
  },
  backIcon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
    marginRight: wp(3),
  },
  goalImage: {
    width: wp('95'),
    height: hp(25),
    alignSelf: 'center',
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2'),
    borderBottomWidth: 0.5,
    borderColor: Colors.border || '#DADADA',
  },
});
