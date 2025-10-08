import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

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
  scrollViewContent: {
    alignItems: 'center',
    marginTop: hp('2'),
    gap: hp('2'),
    paddingBottom: hp('10'),
  },
});
