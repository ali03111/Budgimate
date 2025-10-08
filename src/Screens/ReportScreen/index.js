import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { Colors } from '../../Theme/Variables';

// Example icons (replace with your own assets)
import {
  fuel,
  building,
  basket,
  dining,
  totalSpent,
  remainingLimit,
  debitIcon,
  creditIcon,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import useReportScreen from './useReportScreen';
import { imageUrl } from '../../Utils/Urls';
import {
  currentDate,
  formatDateToCustomFormat,
  formatPrice,
} from '../../Services/GlobalFunctions';
import DatePicker from 'react-native-date-picker';

const expenses = [
  { icon: fuel, amount: '$260', title: 'Fuel', bg: '#E6F2FF' },
  { icon: building, amount: '$120', title: 'House holds', bg: '#FFE6D9' },
  { icon: basket, amount: '$425', title: 'Food and grocery', bg: '#EFE6FF' },
  { icon: dining, amount: '$190', title: 'Dining Out', bg: '#FFE6EC' },
];

const ReportScreen = ({ navigation, route }) => {
  const {
    categoryArry,
    summary,
    traceObj,
    datePickerState,
    setDatePickerState,
    onChangeVal,
    startDate,
    endDate,
    dateSelector,
    refetch,
  } = useReportScreen(navigation, route);

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={'Report'} isBack />
      <ScrollView contentContainerStyle={{ paddingBottom: hp('10') }}>
        {/* Date Range */}
        <TextComponent
          text="Date Range"
          family="600"
          size={2}
          styles={styles.sectionTitle}
        />

        <View style={styles.dateRow}>
          <Touchable
            style={styles.dateBox}
            onPress={() => setDatePickerState('startDate')}
          >
            <Text style={styles.dateText}>
              {formatDateToCustomFormat(startDate ?? currentDate)}
            </Text>
          </Touchable>
          <Touchable
            style={styles.dateBox}
            onPress={() => setDatePickerState('endDate')}
          >
            <Text style={styles.dateText}>
              {formatDateToCustomFormat(endDate ?? currentDate)}
            </Text>
          </Touchable>
        </View>

        {/* Summary */}
        <TextComponent
          text="Summary"
          family="600"
          size={2}
          styles={styles.sectionTitle}
        />

        <View style={styles.summaryRow}>
          <View style={[styles.summaryBox, { backgroundColor: '#FFE6E6' }]}>
            <Image
              source={debitIcon}
              resizeMode="contain"
              style={styles.summaryIcon}
            />
            <TextComponent
              text={formatPrice(summary?.total_spent)}
              family="600"
              size={2}
            />
            <TextComponent text="Total spent" size={1.5} />
          </View>

          <View style={[styles.summaryBox, { backgroundColor: '#E6FFE9' }]}>
            <Image
              source={creditIcon}
              resizeMode="contain"
              style={styles.summaryIcon}
            />
            <TextComponent
              text={formatPrice(summary?.total_limit)}
              family="600"
              size={2}
            />
            <TextComponent text="Remaining limit" size={1.5} />
          </View>
        </View>
        {/* Expenses */}
        <TextComponent
          text="Expenses"
          family="600"
          size={2}
          styles={styles.sectionTitle}
        />

        {categoryArry.map((item, index) => (
          <View key={index} style={styles.expenseCard}>
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
              <Image
                source={{ uri: imageUrl(item.icon) }}
                resizeMode="contain"
                style={{ width: wp('15'), height: hp('5') }}
              />
            </View>
            <View style={styles.expenseInfo}>
              <TextComponent
                text={formatPrice(item.limit)}
                size={2}
                family="600"
              />
              <TextComponent text={item.category_name} size={1.6} isDarkFade />
            </View>
          </View>
        ))}
      </ScrollView>

      <DatePicker
        // mode={'datetime'}
        mode={'date'}
        open={Boolean(datePickerState)}
        date={dateSelector[datePickerState] ?? currentDate}
        is24hourSource="locale"
        locale="en"
        onCancel={() => setDatePickerState(null)}
        modal
        onConfirm={e => {
          console.log(
            'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
            e,
            new Date(e.getTime() + 24 * 60 * 60 * 1000),
            e.toDateString(),
          );
          // if (datePicker.stateName == 'perfEventList') {
          //   datePicker.onChange();
          //   onSelectValueInList(
          //     datePicker?.index,
          //     datePicker.modalType ?? 'date',
          //     e,
          //   );
          //   toggleDate(null);
          // } else {
          onChangeVal([datePickerState], e);
          // onChange(new Date(e.getTime() + 24 * 60 * 60 * 1000));
          // datePicker.onChange(e);
          // onSelectValue(datePicker.stateName, e);
          setDatePickerState(null);
          setTimeout(() => {
            refetch();
          }, 1000);
          // }
        }}
      />

      {/* Button */}
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Download report</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default memo(ReportScreen);
