import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('2'),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: hp('1'),
    width: wp('60'),
  },

  searchContainer: {
    width: wp('95'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingVertical: Platform.OS == 'ios' ? hp('1.5') : 0,
    paddingHorizontal: wp('1'),
    // alignSelf: 'center',
    marginHorizontal: wp('2'),
  },
  searchIcon: {
    width: wp('5'),
    height: hp('1.5'),
  },
  searchInput: {
    flex: 1,
    color: 'black',
    fontSize: hp('1.5'),
  },
  upComingFlatlistView: {
    paddingBottom: hp('10'),
    // flexGrow: 1,
    // paddingTop: hp('2'),
    // paddingTop: hp('1'),
    // backgroundColor: '#fff',

    // alignSelf: 'center',
  },
  rowBack: {
    // width: wp('100'),
    // marginBottom: 10,
    // flex: 1,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: wp('3.5'),
    marginTop: hp('0.5'),
  },
  backRightBtn: {
    height: Platform.OS == 'ios' ? hp(8) : hp('8.2'),
    borderRadius: 10,
    // textAlign: 'left',
    // alignItems: 'center',
  },
  backRightBtnLeft: {
    // backgroundColor: '#1877F2',
    flex: 1,
    // height: Platform.OS == 'ios' ? hp('10') : hp('10'),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingTop: Platform.OS == 'ios' ? hp('0.2') : hp('0'),
    paddingLeft: wp('35'),
  },
  backRightBtnRight: {
    // backgroundColor: '#EA4335',
    flex: 1,
    // height: Platform.OS == 'ios' ? hp('10') : hp('10'),
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'flex-end',
    paddingTop: Platform.OS == 'ios' ? hp('0.2') : hp('0'),
    paddingRight: wp('35'),
  },
  trashIcon: {
    width: wp('6'),
    resizeMode: 'contain',
  },

  // Modal style
  categoryContainer: {
    width: wp('90'),
    paddingVertical: hp('1.2'),
    paddingHorizontal: wp('1.5'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: Colors.white,
    marginVertical: hp('2'),
  },
  commentInput: {
    flex: 1,
    fontSize: hp('1.8'),
  },
  priceMainView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('3'),
    borderRadius: 10,
    marginVertical: hp('2'),
    gap: hp('1'),
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
  },
  priceInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIncomeText: { textAlign: 'center', marginTop: hp('1') },
  priceInput: {
    fontSize: hp('3.5'),
    color: 'black',
  },
});
