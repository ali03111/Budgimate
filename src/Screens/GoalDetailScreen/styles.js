import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2'),
  },
  backIcon: {
    width: wp('5'),
    height: wp('5'),
    resizeMode: 'contain',
    tintColor: Colors.black,
    marginRight: wp('2'),
  },
  headerTitle: {
    fontSize: hp('2.2'),
    fontWeight: '600',
    color: Colors.black,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2'),
  },
  infoText: {
    fontSize: hp('2'),
    color: Colors.textGray,
  },
  bold: {
    fontWeight: '600',
    color: Colors.black,
  },
  progressBackground: {
    height: hp('1'),
    backgroundColor: '#EDEDED',
    borderRadius: hp('1'),
    marginTop: hp('1'),
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFA500',
  },
  goalTitle: {
    fontSize: hp('2'),
    fontWeight: '600',
    color: Colors.black,
    marginTop: hp('3'),
  },
  goalDescription: {
    fontSize: hp('1.8'),
    color: Colors.textGray,
    marginTop: hp('1'),
    lineHeight: hp('2.2'),
  },
  targetDateLabel: {
    fontSize: hp('2'),
    color: Colors.textGray,
    marginTop: hp('3'),
  },
  targetDate: {
    fontSize: hp('1.8'),
    fontWeight: '600',
    color: Colors.black,
    marginTop: hp('0.5'),
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
    fontSize: hp('1.8'),
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
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: hp('3'),
  },
  transactionText: {
    fontSize: hp('1.8'),
    color: Colors.primaryColor,
  },
  arrowRight: {
    width: wp('5'),
    height: wp('5'),
    resizeMode: 'contain',
    tintColor: Colors.primaryColor,
  },
  addButton: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    borderRadius: 8,
    paddingVertical: hp('1.8'),
    alignItems: 'center',
    marginRight: wp('2'),
    marginTop: hp('3'),
  },
  addButtonText: {
    fontSize: hp('1.8'),
    color: 'white',
    fontWeight: '600',
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: hp('1.8'),
    alignItems: 'center',
    marginLeft: wp('2'),
    marginTop: hp('3'),
  },
  withdrawButtonText: {
    fontSize: hp('1.8'),
    color: 'white',
    fontWeight: '600',
  },

  //Modal styling

  modalContainer: {
    marginTop: hp('2'),
  },
  progressCard: {
    width: wp('90'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('2'),
    marginBottom: hp('2'),
  },
  progressCardInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
  },
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
  dateIcon: {
    width: wp('3'),
    height: hp('2'),
  },
  uploadedImageWrapper: {
    width: wp('90'),
    height: hp('15'),
    borderRadius: 10,
    marginBottom: hp('2'),
  },
  uploadedImage: {
    width: wp('90'),
    height: hp('15'),
    borderRadius: 10,
  },
  uploadOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2'),
  },
  uploadImageBtn: {
    width: wp('42'),
    height: hp('13'),
  },
  commentInput: {
    flex: 1,
    fontSize: hp('1.5'),
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
    fontSize: hp('2.5'),
    color: 'black',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
