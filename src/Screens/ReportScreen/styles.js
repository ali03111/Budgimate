import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: wp('5'),
  },
  sectionTitle: {
    marginTop: hp('2'),
    marginBottom: hp('1'),
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBox: {
    width: wp('42'),
    height: hp('6'),
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: Colors.gray,
    fontSize: hp('1.8'),
  },
  expenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: hp('1'),
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
    elevation: 1,
  },
  iconBox: {
    width: wp('12'),
    height: wp('12'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3'),
  },
  icon: {
    width: wp('6'),
    height: hp('3'),
  },
  expenseInfo: {
    flexDirection: 'column',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
  },
  summaryBox: {
    width: wp('42'),
    borderRadius: 10,
    paddingVertical: hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryIcon: {
    width: wp('10'),
    height: hp('5'),
    marginBottom: hp('0.5'),
  },
  button: {
    marginTop: hp('4'),
    backgroundColor: Colors.primaryColor,
    paddingVertical: hp('1.8'),
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: hp('2'),
    fontWeight: '600',
  },
});
