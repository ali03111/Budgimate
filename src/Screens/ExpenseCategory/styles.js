import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  searchContainer: {
    width: wp('90'),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('1'),
    alignSelf: 'center',
    marginBottom: hp('1'),
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
});
