import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  ImgBg: {
    flex: 1,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('2'),
  },
  walletIcon: {
    width: wp('5'),
  },
  remainingBudgetText: {
    marginLeft: wp('1'),
    fontSize: hp('1.5'),
  },
  budgetContainer: {
    width: wp('95'),
    alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: hp('2'),
  },
  budgetAmount: {
    fontSize: hp('2.5'),
    fontWeight: 'bold',
  },
  progressBackground: {
    marginTop: hp('1'),
    height: hp('0.8'),
    backgroundColor: Colors.secondryColor,
    borderRadius: hp('1'),
    overflow: 'hidden',
    width: wp('95'),
    alignSelf: 'center',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.themeRed,
    borderRadius: hp('1'),
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('19'),
  },
  addIcon: {
    width: wp('5'),
    height: hp('2'),
  },
  addNewText: {
    fontSize: hp('1.5'),
  },
  cardContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp('95'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: hp('2'),
    paddingHorizontal: wp('2.5'),
    paddingBottom: hp('10'),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  seeMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('17'),
  },
  arrowIcon: {
    width: wp('5'),
  },
  multiViewContainer: {
    alignSelf: 'center',
    width: wp('100'),
    marginTop: hp('2'),
  },
  multiViewDivider: {
    marginLeft: wp('8'),
  },
  categoryTitle: {
    fontSize: hp('1.2'),
  },
  categoryRightText: {
    color: 'red',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('18'),
  },
});
