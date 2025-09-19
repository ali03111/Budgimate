import { View, Text, ImageBackground, FlatList } from 'react-native';
import React, { memo } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { styles } from './styles';
import TranscitionCradComp from '../../Components/TranscitionCradComp';
import { keyExtractor } from '../../Utils';
import { hp } from '../../Hooks/useResponsive';
import useTranscritionHistoryScreen from './useTranscritionHistoryScreen';
import {
  formatDateToCustomFormat,
  formatPrice,
} from '../../Services/GlobalFunctions';

const TranscritionHistoryScreen = ({ navigation, route }) => {
  const { transcitionList, goalDetails } = useTranscritionHistoryScreen(
    navigation,
    route,
  );

  console.log('transcitionListtranscitionList', transcitionList);

  const renderItem = ({ item, index }) => {
    return (
      <TranscitionCradComp
        amount={parseInt(item?.amount)}
        isCredit={Boolean(item?.type == 'income')}
        date={formatDateToCustomFormat(item?.date)}
      />
    );
  };
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Transaction History'} isBack />
      {/* Credit / Debit Cards */}
      <View style={styles.rowBetween}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total credited:</Text>
          <Text style={styles.creditedValue}>
            {formatPrice(parseInt(goalDetails?.incomes_sum_amount ?? 0))}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total debited:</Text>
          <Text style={styles.debitedValue}>
            {formatPrice(parseInt(goalDetails?.expenses_sum_amount ?? 0))}
          </Text>
        </View>
      </View>
      <FlatList
        data={transcitionList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: hp('2'), alignSelf: 'center' }}
      />
    </ImageBackground>
  );
};

export default memo(TranscritionHistoryScreen);
