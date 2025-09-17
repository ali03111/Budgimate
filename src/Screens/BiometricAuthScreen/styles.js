import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

const styles = StyleSheet.create({
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  result: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
});

export default styles;
