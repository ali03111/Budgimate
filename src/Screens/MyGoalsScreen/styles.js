import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  imgBg: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  backIcon: {
    height: hp(2.5),
    width: hp(2.5),
    resizeMode: 'contain',
    marginRight: wp(2),
  },
  card: {
    borderRadius: 14,
    padding: wp(4),
    marginBottom: hp(2),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalImage: {
    height: hp('9'),
    width: wp('36'),
  },
  progressRow: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarBackground: {
    marginTop: hp(1),
    height: hp(1),
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
});
