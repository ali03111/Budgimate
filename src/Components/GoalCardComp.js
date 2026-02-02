import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Touchable } from '../Components/Touchable';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { arrowRight } from '../Assets';
import { Image } from 'react-native';
import NavigationService from '../Services/NavigationService';
import { calculatePercentage, formatPrice } from '../Services/GlobalFunctions';

const GoalCardComp = ({ mainView, isDisable, item, type, onViewDetail }) => {
  const total = 80000;
  const achieved = 34700;
  const left = total - achieved;
  const progress = (achieved / total) * 100;

  console.log(
    'itemitemitemitemitemitemitem',
    calculatePercentage(
      parseInt(item?.incomes_sum_amount ?? 0) -
        parseInt(item?.expenses_sum_amount ?? 0),
      parseInt(item?.target_amount ?? 0),
    ),
  );

  return (
    <Pressable
      style={{ ...styles.card, ...mainView }}
      onPress={() =>
        NavigationService.navigate('GoalDetailScreen', { item, type })
      }
      disabled={isDisable}
    >
      {/* Top Row */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item?.name}</Text>
        {onViewDetail && (
          <Touchable
            onPress={() => {
              if (onViewDetail)
                NavigationService.navigate('GoalDetailScreen', { item, type });
            }}
          >
            <View style={styles.detailsRow}>
              <Text style={styles.details}>View details</Text>
              <Image
                source={arrowRight}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </Touchable>
        )}
      </View>

      {/* Subtitle */}
      {/* <Text style={styles.subtitle}>
        Save ${total.toLocaleString()} by the January 2027
      </Text> */}

      {/* Progress info */}
      <View style={styles.progressInfoRow}>
        <Text style={styles.achieved}>
          Achieved:{' '}
          <Text style={styles.bold}>
            {formatPrice(
              parseInt(item?.incomes_sum_amount ?? 0) -
                parseInt(item?.expenses_sum_amount ?? 0),
            )}
          </Text>
        </Text>
        <Text style={styles.left}>
          {formatPrice(
            parseInt(item?.target_amount ?? 0) +
              parseInt(item?.expenses_sum_amount ?? 0) -
              parseInt(item?.incomes_sum_amount ?? 0),
          )}{' '}
          left of{' '}
          <Text style={styles.bold}>${parseInt(item?.target_amount)}</Text>
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${calculatePercentage(
                parseInt(item?.incomes_sum_amount ?? 0) -
                  parseInt(item?.expenses_sum_amount ?? 0),
                parseInt(item?.target_amount ?? 0),
              )}%`,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default GoalCardComp;

const styles = StyleSheet.create({
  card: {
    width: wp('95'),
    backgroundColor: 'white',
    borderRadius: 12,
    padding: wp('2'),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    // marginVertical: hp('1'),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp('1.8'),
    fontWeight: '600',
    color: Colors.darkBlueColor,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    fontSize: hp('1.8'),
    color: Colors.primaryColor,
    marginRight: wp('1'),
  },
  arrowIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: Colors.primaryColor,
  },
  subtitle: {
    fontSize: hp('1.2'),
    color: Colors.textGray,
    marginTop: hp('0.5'),
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
  },
  achieved: {
    fontSize: hp('1.5'),
    color: Colors.textGray,
  },
  left: {
    fontSize: hp('1.5'),
    color: Colors.textGray,
  },
  bold: {
    fontWeight: '600',
    color: Colors.darkBlueColor,
  },
  progressBackground: {
    marginTop: hp('1'),
    height: hp('0.8'),
    backgroundColor: '#EDEDED',
    borderRadius: hp('1'),
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFA500', // orange progress
  },
});
