import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { TextComponent } from './TextComponent'; // adjust path as needed
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { calculatePercentage, formatPrice } from '../Services/GlobalFunctions';
import { Touchable } from './Touchable';
import { imageUrl } from '../Utils/Urls';

const ExpenseProgressCard = ({
  icon,
  title = 'Fuel',
  percentageSpent = '43',
  remaining = '800',
  spentColor = 'red',
  item,
  isDisable,
  onPres,
}) => {
  const progressWidth = `${percentageSpent}%`;

  return (
    <Pressable style={styles.container} onPress={onPres} disabled={isDisable}>
      {item?.icon && (
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: imageUrl(item?.icon) }}
            style={styles.iconStyle}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <TextComponent
            text={item?.category_name ?? item?.name ?? title}
            styles={styles.titleText}
            size={'2'}
          />
          <View style={styles.amountRow}>
            <TextComponent
              text={`${formatPrice(item?.spent ?? item?.budget) ?? remaining}`}
              isThemeColor
              styles={styles.amountText}
              size={'1.8'}
            />
            <TextComponent
              text={'Remaining'}
              styles={styles.remainingLabel}
              size={'1.5'}
            />
          </View>
        </View>

        <TextComponent
          text={
            item?.type ??
            `${
              calculatePercentage(item?.spent, item?.limit) ?? percentageSpent
            }% of total expense spent`
          }
          styles={[styles.spentText, { color: spentColor }]}
          size={'1.5'}
        />

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill(
                calculatePercentage(
                  item?.spent ?? item?.expenses_sum_amount ?? 0,
                  item?.limit ?? item?.budget,
                ),
              ),
            ]}
          />
        </View>
      </View>
    </Pressable>
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
    // width: wp('12'),
    // height: wp('12'),
    backgroundColor: '#E7F2FF',
    borderRadius: wp('3'),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3'),
  },
  iconStyle: {
    width: wp('12'),
    height: wp('12'),
    borderRadius: 10,
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
  progressFill: progressRatio => ({
    height: '100%',
    backgroundColor:
      progressRatio >= 100 ? Colors.themeRed : Colors.primaryColor,
    borderRadius: hp('1'),
    width: progressRatio
      ? `${progressRatio >= 100 ? 100 : progressRatio}%`
      : '0%',
  }),
});
