import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  bg: {
    width: wp('100'),
    height: hp('100'),
  },
  scrollContainer: {
    paddingHorizontal: wp('3'),
  },
  headerText: {
    paddingTop: Platform.OS === 'ios' ? hp('9') : hp('3'),
    fontWeight: 'bold',
  },
  descriptionText: {
    paddingTop: hp('3'),
  },
  sectionHeader: {
    paddingTop: hp('5'),
    marginBottom: hp('2'),
  },
  totalView: {
    width: wp('95'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2'),
    paddingHorizontal: wp('4'),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
  },
  bulletPoint: {
    marginVertical: hp('0.5'),
    textAlign: 'justify',
  },
  greenLockIcon: {
    width: wp('30'),
    height: hp('15'),
    alignSelf: 'center',
    marginTop: hp('2'),
  },
  continueBtn: {
    marginTop: hp('5'),
  },
  footerNote: {
    marginTop: hp('5'),
    textAlign: 'center',
  },
});
