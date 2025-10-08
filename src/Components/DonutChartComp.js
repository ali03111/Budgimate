import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Circle } from 'react-native-svg';
import { hp, wp } from '../Hooks/useResponsive';
import { TextComponent } from './TextComponent';
import LegendItem from './DotWithText';

const DonutChartComp = ({ expenseData }) => {
  // const expenseData = [
  //   { category: 'Childcare', total: '124.00' },
  //   { category: 'Travel', total: '250.00' },
  //   { category: 'Dining Out', total: '1400.00' },
  // ];

  // Simple color generator for each category
  const getColor = index => {
    const colors = [
      '#00CFFF',
      '#4A4A64',
      '#A100FF',
      '#FF0000',
      '#6E57E0',
      '#6DEFA3',
      '#FF8F72',
    ];
    return colors[index % colors.length];
  };

  const data = expenseData.map((item, index) => ({
    key: index + 1,
    value: parseFloat(item.total), // Convert string to number
    svg: { fill: getColor(index) }, // Use a color function
  }));

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <PieChart
        style={{ height: hp('20'), width: wp('50') }}
        data={data}
        outerRadius={'100%'}
        innerRadius={'70%'}
      >
        {/* Optional: add center white circle manually if needed */}
        {/* <G>
          <Circle cx="50%" cy="50%" r="35%" fill="white" />
        </G> */}
      </PieChart>

      <TextComponent
        text={'Expenses categories'}
        styles={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginVertical: hp('1'),
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: wp('80'),
        }}
      >
        {expenseData.map((item, index) => (
          <LegendItem
            key={index}
            text={item.category}
            dotColor={getColor(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default DonutChartComp;
