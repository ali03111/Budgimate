import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: wp('5%'),
    justifyContent: 'space-between',
  },
  toggleSection: {
    width: wp('95%'),
    alignSelf: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.darkBlueColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: hp('2%'),
  },
  switchStyle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  biometricInfo: {
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
  biometricIcon: {
    fontSize: hp('8%'),
    marginBottom: hp('1%'),
  },
  biometricLabel: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    // color: '#fff',
    textAlign: 'center',
    color: 'black',
  },
  statusSection: {
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  status: {
    fontSize: hp('2%'),
    textAlign: 'center',
    marginBottom: hp('2%'),
    fontWeight: '500',
    lineHeight: hp('2.5%'),
  },
  resultContainer: {
    padding: hp('1.5%'),
    borderRadius: 8,
    marginBottom: hp('3%'),
    minHeight: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  result: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    fontWeight: '500',
  },
  authButton: {
    backgroundColor: Colors.darkBlueColor,
    paddingVertical: hp('2%'),
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: hp('2%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: hp('1.5%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: hp('1.8%'),
    fontWeight: '500',
  },
});

export default styles;
