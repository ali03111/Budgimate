import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { TextComponent } from './TextComponent';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';

const GoalCardComp = ({ item }) => {
  const remaining = item.goal - item.saved;
  const percentage = (item.saved / item.goal) * 100;

  return (
    <View style={[styles.card, { backgroundColor: item.bgColor }]}>
      <View style={styles.cardTop}>
        <View>
          <TextComponent text={item.title} family="bold" />
          <TextComponent
            text="Save $80,000 by the month of January 2027"
            size={'1.5'}
            styles={{
              marginTop: hp(0.5),
              width: wp('50'),
            }}
            fade
          />
        </View>
        <Image source={item.image} style={styles.goalImage} />
      </View>

      <View style={styles.progressRow}>
        <TextComponent
          text={`$${item.saved.toLocaleString()}`}
          size={'1.8'}
          family="bold"
        />
        <TextComponent
          text={`$${remaining.toLocaleString()} left of $${item.goal.toLocaleString()}`}
          size={'1.8'}
          color={Colors.grey}
        />
      </View>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentage}%`,
              backgroundColor: item.color,
            },
          ]}
        />
      </View>

      <TextComponent
        text="$2,450 this month"
        size={'1.8'}
        color={item.color}
        style={{ marginTop: hp(1) }}
      />
    </View>
  );
};

export default GoalCardComp;

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: wp(4),
    marginBottom: hp(2),
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalImage: {
    height: hp('9'),
    width: wp('36'),
  },
  progressRow: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBarBackground: {
    marginTop: hp(1),
    height: hp(1),
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
});
