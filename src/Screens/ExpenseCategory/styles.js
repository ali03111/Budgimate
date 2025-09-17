import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
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
    width: wp('87'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingVertical: Platform.OS == 'ios' ? hp('1') : 0,
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
    fontSize: hp('1.8'),
  },
  upComingFlatlistView: {
    paddingBottom: hp('15'),
    flexGrow: 1,
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
    height: Platform.OS == 'android' ? hp('8.2') : hp('8'),
    borderRadius: 10,
    // textAlign: 'left',
    // alignItems: 'center',
  },
  backRightBtnLeft: {
    backgroundColor: '#1877F2',
    flex: 1,
    // height: Platform.OS == 'ios' ? hp('10') : hp('10'),
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    // paddingTop: hp('0.5'),
    paddingLeft: wp('35'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  backRightBtnRight: {
    backgroundColor: '#EA4335',
    flex: 1,
    // height: Platform.OS == 'ios' ? hp('10') : hp('10'),
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    // paddingTop: hp('0.5'),
    paddingRight: wp('35'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  trashIcon: {
    width: wp('6'),
    height: hp('3'),
    resizeMode: 'contain',
  },
});
