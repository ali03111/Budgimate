import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { hp, wp } from '../Hooks/useResponsive';
import { creditIcon, debitIcon } from '../Assets';
import { TextComponent } from './TextComponent';
import { formatPrice } from '../Services/GlobalFunctions';

const TranscitionCradComp = ({ type, amount, description, date, isCredit }) => {
  return (
    <View style={styles.card}>
      <Image
        source={isCredit ? creditIcon : debitIcon}
        resizeMode="contain"
        style={styles.icon}
      />
      <View>
        <TextComponent text={`${formatPrice(amount)}$`} size={'1.5'} />
        <TextComponent text={'Credited from leftover'} fade size={'1.2'} />
      </View>
      <TextComponent text={date} fade size={'1.3'} styles={styles.dateText} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp('95'),
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.5'),
  },
  icon: {
    width: wp('10'),
    height: hp('5'),
    marginRight: wp('2'),
  },
  dateText: {
    marginLeft: wp('26'),
  },
});

export default TranscitionCradComp;
