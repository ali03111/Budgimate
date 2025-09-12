import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  disableSection: {
    width: wp('95'),
    alignSelf: 'center',
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.darkBlueColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchStyle: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  descriptionText: {
    marginLeft: wp('2'),
    marginTop: hp('2'),
  },
  enableTitle: {
    marginLeft: wp('2'),
    marginTop: hp('2'),
  },
  bulletItem: {
    marginLeft: wp('2'),
    marginTop: hp('2'),
  },
  methodText: {
    marginLeft: wp('2'),
    marginTop: hp('2'),
  },
  methodOption: {
    width: wp('95'),
    alignSelf: 'center',
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.darkBlueColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2'),
  },
  radioImage: {
    width: wp('5'),
    height: hp('3'),
  },
  enableButton: {
    width: wp('95'),
    alignSelf: 'center',
    marginTop: hp('3'),
  },
});
