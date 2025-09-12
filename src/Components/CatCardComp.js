// CategoryCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { chat } from '../Assets';
import { hp, wp } from '../Hooks/useResponsive';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; // you can use any icon set

const CatCardComp = ({ icon, title, remaining, color }) => {
  return (
    <View style={styles.card}>
      {/* Icon + Title */}
      <View style={styles.topRow}>
        <Image
          source={chat}
          resizeMode="contain"
          style={{ width: wp('5'), height: hp('3') }}
        />
        <View style={styles.amountBox}>
          <Text style={[styles.amount, { color: color }]}>${remaining}</Text>
          <Text style={styles.remainingText}>Remaining</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min((remaining / 1000) * 100, 100)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    margin: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: '600',
    fontSize: hp('1.5'),
  },
  remainingText: {
    fontSize: hp('1.2'),
    color: '#999',
  },
  title: {
    marginTop: 6,
    fontWeight: '500',
    fontSize: hp('1.3'),
    color: '#333',
  },
  progressBackground: {
    marginTop: 8,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
});

export default CatCardComp;
