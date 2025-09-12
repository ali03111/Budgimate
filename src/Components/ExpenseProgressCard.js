import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TextComponent } from './TextComponent'; // adjust path as needed
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';

const ExpenseProgressCard = ({
  icon,
  title = 'Fuel',
  percentageSpent = '43',
  remaining = '800',
  spentColor = 'red',
}) => {
  const progressWidth = `${percentageSpent}%`;

  return (
    <View style={styles.container}>
      {/* <View style={styles.iconContainer}>
        <Image source={icon} style={styles.iconStyle} resizeMode="contain" />
      </View> */}

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <TextComponent text={title} styles={styles.titleText} size={'1.5'} />
          <View style={styles.amountRow}>
            <TextComponent
              text={`$${remaining}`}
              isThemeColor
              styles={styles.amountText}
              size={'1.2'}
            />
            <TextComponent
              text={'Remaining'}
              styles={styles.remainingLabel}
              size={'1.2'}
            />
          </View>
        </View>

        <TextComponent
          text={`${percentageSpent}% of total expense spent`}
          styles={[styles.spentText, { color: spentColor }]}
          size={'1.2'}
        />

        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
};

export default ExpenseProgressCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: wp('2'),
    alignItems: 'center',
    marginVertical: hp('0.5'),
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: wp('2'),
    paddingVertical: hp('1'),
    width: wp('97'),
    alignSelf: 'center',
  },
  iconContainer: {
    width: wp('12'),
    height: wp('12'),
    backgroundColor: '#E7F2FF',
    borderRadius: wp('3'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3'),
  },
  iconStyle: {
    width: wp('6'),
    height: wp('6'),
  },
  detailsContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '600',
  },
  amountRow: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontWeight: 'bold',
  },
  remainingLabel: {
    color: Colors.gray,
  },
  spentText: {
    marginTop: hp('0.5'),
  },
  progressBackground: {
    marginTop: hp('1'),
    height: hp('0.8'),
    backgroundColor: '#EDEDED',
    borderRadius: hp('1'),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primaryColor,
    borderRadius: hp('1'),
  },
});
