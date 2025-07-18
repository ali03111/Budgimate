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
  subHeaderText: {
    paddingTop: hp('3'),
  },
  descriptionText: {
    paddingTop: hp('3'),
  },
  sectionHeader: {
    paddingTop: hp('5'),
    marginBottom: hp('2'),
  },
  bulletPoint: {
    marginVertical: hp('0.5'),
    textAlign: 'justify',
  },
  planContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3'),
    width: wp('94'),
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: hp('2'),
    marginTop: hp('5'),
  },
  familyPlan: {
    marginTop: hp('2'),
  },
  planIcon: {
    width: wp('10'),
    height: hp('5'),
  },
  planDetails: {
    width: wp('68'),
    marginLeft: wp('2'),
    justifyContent: 'space-between',
    height: hp('4.5'),
  },
  circleIcon: {
    width: wp('5'),
    height: hp('3'),
  },
  continueBtn: {
    marginTop: hp('5'),
  },
  footerNote: {
    marginTop: hp('5'),
    textAlign: 'center',
  },
});
