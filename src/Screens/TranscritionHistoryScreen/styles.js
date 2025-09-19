import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: wp('4'),
    alignItems: 'center',
    marginHorizontal: wp('1'),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  statLabel: {
    fontSize: hp('1.5'),
    color: Colors.textGray,
    marginBottom: hp('1'),
  },
  creditedValue: {
    fontSize: hp('2'),
    fontWeight: '600',
    color: 'green',
  },
  debitedValue: {
    fontSize: hp('2'),
    fontWeight: '600',
    color: 'red',
  },
});
