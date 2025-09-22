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
import { formatPrice } from '../../Services/GlobalFunctions';

const expenses = [
  { icon: fuel, amount: '$260', title: 'Fuel', bg: '#E6F2FF' },
  { icon: building, amount: '$120', title: 'House holds', bg: '#FFE6D9' },
  { icon: basket, amount: '$425', title: 'Food and grocery', bg: '#EFE6FF' },
  { icon: dining, amount: '$190', title: 'Dining Out', bg: '#FFE6EC' },
];

const ReportScreen = ({ navigation, route }) => {
  const { categoryArry, summary, traceObj } = useReportScreen(
    navigation,
    route,
  );

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={'Report'} isBack />
      {/* Date Range */}
      <TextComponent
        text="Date Range"
        family="600"
        size={2}
        styles={styles.sectionTitle}
      />

      <View style={styles.dateRow}>
        <Touchable style={styles.dateBox}>
          <Text style={styles.dateText}>Select</Text>
        </Touchable>
        <Touchable style={styles.dateBox}>
          <Text style={styles.dateText}>Select</Text>
        </Touchable>
      </View>

      {/* Expenses */}
      <TextComponent
        text="Expenses"
        family="600"
        size={2}
        styles={styles.sectionTitle}
      />

      <ScrollView
        contentContainerStyle={{ backgroundColor: 'red' }}
        style={{
          height: hp('21'),
          backgroundColor: 'yellow',
        }}
      >
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

      {/* Button */}
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Download report</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default memo(ReportScreen);
