import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import { Colors } from '../Theme/Variables';
import { formatPrice, getDateMonthYear } from '../Services/GlobalFunctions';
import { Touchable } from './Touchable';

const IncomeSourceCardComp = ({ item, isSelected, onPress }) => {
  return (
    <Pressable
      style={{
        width: wp('92'),
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: isSelected ? 2 : 0.2,
        paddingVertical: hp('2'),
        paddingHorizontal: wp('2'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: isSelected ? Colors.primaryColor : Colors.grayBorder,
      }}
      onPress={onPress}
    >
      <View style={{ gap: hp('0.5') }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextComponent text={item?.name} family={'bold'} />
          {isSelected && (
            <TextComponent
              text={' (Primary Income)'}
              fade
              size={'1.5'}
              family={'bold'}
            />
          )}
        </View>
        <TextComponent
          text={`${item?.frequency} recurring added on ${
            getDateMonthYear(item?.created_at)?.day
          } ${getDateMonthYear(item?.created_at)?.monthName} ${
            getDateMonthYear(item?.created_at)?.year
          }`}
          fade
          size={1.5}
          family={'500'}
        />
      </View>
      <View style={{ alignItems: 'flex-end', gap: hp('0.5') }}>
        <TextComponent text={'Amount'} fade size={1.8} family={'500'} />
        <TextComponent
          text={formatPrice(item?.amount ?? 0)}
          isThemeColor
          family={'bold'}
        />
      </View>
    </Pressable>
  );
};

export default IncomeSourceCardComp;
