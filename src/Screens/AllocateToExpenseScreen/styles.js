import { Platform, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeButton: {
    width: 'auto',
    paddingHorizontal: wp('2'),
    alignSelf: 'flex-start',
    height: hp('3.5'),
    marginLeft: wp('2'),
  },
  themeButtonText: {
    fontSize: hp('1.8'),
  },
  textComponent: {
    marginLeft: wp('2'),
    marginVertical: hp('1'),
  },
  searchContainer: {
    width: wp('96'),
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
  scrollViewContent: {
    alignItems: 'center',
    marginTop: hp('2'),
    gap: hp('2'),
    paddingBottom: hp('10'),
  },
  priceMainView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('2'),
    borderRadius: 10,
    marginTop: hp('3'),
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
  },
  priceInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIncomeText: { textAlign: 'center', marginTop: hp('1') },
});
