import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  bg: {
    width: wp('100'),
    height: hp('100'),
  },
  scrollContainer: {
    paddingHorizontal: wp('3'),
  },
  upperView: {
    width: wp('90'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: Platform.OS == 'ios' ? hp('6') : hp('3'),
    alignItems: 'center',
  },
  upperGreenText: {
    color: Colors.secondryColor,
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
    backgroundColor: Colors.greenBgColor,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.secondryColor,
  },
  headerText: {
    paddingTop: hp('3'),
    fontWeight: 'bold',
  },
  descriptionText: {
    paddingTop: hp('3'),
  },
  sectionHeader: {
    paddingTop: hp('5'),
    marginBottom: hp('2'),
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
    // backgroundColor: 'red',
    height: hp('9'),
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
