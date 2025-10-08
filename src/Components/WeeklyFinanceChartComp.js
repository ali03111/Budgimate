// import React, { useMemo } from 'react';
// import { View, Dimensions, StyleSheet } from 'react-native';
// import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
// import * as shape from 'd3-shape';
// import { Text as SvgText } from 'react-native-svg';
// import { hp, wp } from '../Hooks/useResponsive';

// const screenWidth = Dimensions.get('window').width;

// const WeeklyFinanceChartComp = ({ chartDataArry }) => {
//   // Convert your raw array into chart-friendly data
//   const chartData = useMemo(() => {
//     return chartDataArry.map((item, index) => ({
//       x: index + 1, // e.g. day index
//       income: parseFloat(item.income) || 0,
//       expense: parseFloat(item.expense) || 0,
//     }));
//   }, [chartDataArry]);

//   const incomeData = chartData.map(d => d.income);
//   const expenseData = chartData.map(d => d.expense);

//   // Find min and max values for dynamic Y-axis range
//   const allValues = [...incomeData, ...expenseData];
//   const minValue = Math.min(...allValues, 0);
//   const maxValue = Math.max(...allValues, 100);

//   return (
//     <View style={styles.container}>
//       {/* Chart Title */}
//       <SvgText
//         x={wp('5')}
//         y={hp('2')}
//         fill="#1E3A8A"
//         fontSize={16}
//         fontWeight="bold"
//       >
//         Weekly Income vs. Expenses
//       </SvgText>

//       {/* Legend */}
//       <View style={styles.legend}>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
//           <SvgText x={wp('8')} y={hp('4')} fill="#1E3A8A" fontSize={12}>
//             Income
//           </SvgText>
//         </View>
//         <View style={styles.legendItem}>
//           <View style={[styles.legendDot, { backgroundColor: '#f87171' }]} />
//           <SvgText x={wp('20')} y={hp('4')} fill="#1E3A8A" fontSize={12}>
//             Expenses
//           </SvgText>
//         </View>
//       </View>

//       {/* Chart Area */}
//       <View style={{ flexDirection: 'row', padding: wp('2') }}>
//         {/* Y Axis */}
//         <YAxis
//           data={allValues}
//           contentInset={{ top: hp('2'), bottom: hp('2') }}
//           svg={{ fill: '#4B5563', fontSize: 10 }}
//           numberOfTicks={6}
//           formatLabel={value => `${value.toFixed(0)}`}
//           style={{ marginRight: wp('2') }}
//         />

//         <View style={{ flex: 1 }}>
//           {/* Line Chart - Income */}
//           <LineChart
//             style={{ height: hp('25'), width: wp('80') }}
//             data={incomeData}
//             svg={{ stroke: '#3b82f6', strokeWidth: 2 }}
//             contentInset={{ top: hp('2'), bottom: hp('2') }}
//             curve={shape.curveNatural}
//           >
//             <Grid
//               svg={{ stroke: '#E5E7EB', strokeOpacity: 0.5 }}
//               direction={Grid.Direction.HORIZONTAL}
//             />
//           </LineChart>

//           {/* Line Chart - Expenses (overlay) */}
//           <LineChart
//             style={StyleSheet.absoluteFill}
//             data={expenseData}
//             svg={{ stroke: '#f87171', strokeWidth: 2 }}
//             contentInset={{ top: hp('2'), bottom: hp('2') }}
//             curve={shape.curveNatural}
//           />

//           {/* X Axis */}
//           <XAxis
//             style={{ marginTop: hp('1'), marginHorizontal: wp('2') }}
//             data={chartData}
//             formatLabel={(value, index) => `${index + 1}`}
//             contentInset={{ left: wp('2'), right: wp('2') }}
//             svg={{ fontSize: hp('1.2'), fill: '#4B5563' }}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: wp('2'),
//     padding: wp('2'),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: hp('0.5') },
//     shadowOpacity: 0.1,
//     shadowRadius: wp('1'),
//     elevation: 3,
//   },
//   legend: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     marginVertical: hp('1'),
//     marginLeft: wp('5'),
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: wp('10'),
//   },
//   legendDot: {
//     width: wp('2'),
//     height: wp('2'),
//     borderRadius: wp('1'),
//     marginRight: wp('1'),
//   },
// });

// export default WeeklyFinanceChartComp;

import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { hp, wp } from '../Hooks/useResponsive';

const WeeklyFinanceChartComp = ({ chartDataArry }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = hp('40');

  // State to hold processed chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(78, 205, 196, ${opacity})`,
        legend: 'Income',
      },
      {
        data: [],
        color: (opacity = 1) => `rgba(255, 111, 97, ${opacity})`,
        legend: 'Expenses',
      },
    ],
  });

  // Mock API data (replace with actual fetch)
  const mockData = [
    { date: '2025-09-01', income: 42.0, expense: 0 },
    { date: '2025-09-02', income: 0, expense: 0 },
    { date: '2025-09-03', income: 0, expense: 0 },
    { date: '2025-09-04', income: 0, expense: 0 },
    { date: '2025-09-05', income: 0, expense: 0 },
    { date: '2025-09-06', income: 0, expense: 0 },
    { date: '2025-09-07', income: 0, expense: 0 },
    { date: '2025-09-08', income: 0, expense: 0 },
    { date: '2025-09-09', income: 0, expense: 0 },
    { date: '2025-09-10', income: 0, expense: 0 },
    { date: '2025-09-11', income: 0, expense: 0 },
    { date: '2025-09-12', income: 0, expense: 0 },
    { date: '2025-09-13', income: 0, expense: 0 },
    { date: '2025-09-14', income: 0, expense: 0 },
    { date: '2025-09-15', income: 0, expense: 0 },
    { date: '2025-09-16', income: 0, expense: 50.0 },
    { date: '2025-09-17', income: 0, expense: 50.0 },
    { date: '2025-09-18', income: 0, expense: 120.0 },
    { date: '2025-09-19', income: 0, expense: 0 },
    { date: '2025-09-20', income: 0, expense: 0 },
    { date: '2025-09-21', income: 0, expense: 200.0 },
    { date: '2025-09-22', income: 0, expense: 0 },
    { date: '2025-09-23', income: 0, expense: 0 },
    { date: '2025-09-24', income: 0, expense: 0 },
    { date: '2025-09-25', income: 0, expense: 0 },
    { date: '2025-09-26', income: 0, expense: 0 },
    { date: '2025-09-27', income: 0, expense: 0 },
    { date: '2025-09-28', income: 0, expense: 0 },
    { date: '2025-09-29', income: 0, expense: 0 },
    { date: '2025-09-30', income: 0, expense: 0 },
  ];

  // Fetch and process data
  useEffect(() => {
    const result = chartDataArry; // Using mock data for now

    // Extract labels and data
    const labels = result.map(item => item.date.split('-').slice(1).join('-')); // e.g., "09-01"
    const incomeData = result.map(item => item.income || 0);
    const expenseData = result.map(item => item.expense || 0);

    setChartData({
      labels: [],
      datasets: [
        {
          data: incomeData,
          color: (opacity = 1) => `rgba(78, 205, 196, ${opacity})`,
          legend: 'Income',
        },
        {
          data: expenseData,
          color: (opacity = 1) => `rgba(255, 111, 97, ${opacity})`,
          legend: 'Expenses',
        },
      ],
    });
  }, []);

  return (
    <View style={{ marginVertical: hp('2') }}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={chartHeight}
        yAxisLabel={'$'}
        yAxisSuffix={''}
        yAxisInterval={50} // Adjust based on your data range
        // verticalLabelRotation={90}
        withHorizontalLabels={true}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // Two decimal places for precision
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#ffffff',
          },
        }}
        bezier // Enables smooth wavy lines
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default WeeklyFinanceChartComp;
