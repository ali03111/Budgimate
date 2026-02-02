import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { calender, LoginBg, searchIcon } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import { keyExtractor } from '../../Utils';
import ModalViewComp from '../../Components/ModalViewComp';
import useAllocateToExpenseScreen from './useAllocateToExpenseScreen';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { formatPrice } from '../../Services/GlobalFunctions';
import DateRangeModalComp from '../../Components/DateRangeModalComp';
import { Touchable } from '../../Components/Touchable';
import AllocateCompleteModal from '../../Components/AllocateCompleteModal';

const AllocateToExpenseScreen = ({ navigation, route }) => {
  const {
    modalVisible,
    setModalVisible,
    catList,
    addAllocate,
    inputPrice,
    inputWidth,
    onChangeVal,
    setInputWidth,
    refetch,
    searchFun,
    dateRangeModal,
    setDateRangeModal,
    text,
    dateRange,
    setDateRange,
    filterData,
    afterAdd,
    setAfterAdd,
  } = useAllocateToExpenseScreen(navigation, route);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Pressable onPress={() => setModalVisible(item?.expense_category_id)}>
          <ExpenseProgressCard
            key={index}
            item={{
              ...item?.expense_category,
              spent: item?.expense_category?.total_expenses,
              limit: item?.limit_amount,
              budget: item?.limit_amount,
            }}
            isDisable={true}
          />
        </Pressable>
      );
    },
    [catList, filterData],
  );
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent
        headerTitle={'Allocate Leftover to Expense Category'}
        isBack
      />
      <ThemeButton
        title={`Leftover: ${formatPrice(route?.params?.leftOver)}`}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={`Add leftover amount of ${formatPrice(
          route?.params?.leftOver,
        )} or less, from “Last cycle” to your “Expense categories”.`}
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp('1'),
        }}
      >
        <View style={styles.searchContainer}>
          <Image
            source={searchIcon}
            resizeMode="contain"
            style={styles.searchIcon}
            tintColor={Colors.black}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories"
            placeholderTextColor={Colors.grayFaded}
            value={text}
            onChangeText={e => searchFun(e)}
          />
        </View>
        {/* <Touchable onPress={() => setDateRangeModal(true)}>
          <Image
            source={calender}
            resizeMode="contain"
            style={{ width: wp('6'), height: hp('3') }}
          />
        </Touchable> */}
      </View>

      <FlatList
        data={
          catList != null &&
          catList?.length > 0 &&
          (filterData.length >= 0 && text != '' ? filterData : catList)
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingBottom: hp('10') }}
      />
      {Boolean(modalVisible != null) && (
        <ModalViewComp
          isModal={Boolean(modalVisible != null)}
          heading={'Allocate Funds to Expense Categories'}
          childrenComp={
            <View>
              <TextComponent
                text={'Expense category name'}
                isDarkTheme
                size={'2'}
              />
              <View
                style={{
                  width: wp('90'),
                  paddingVertical: hp('1'),
                  paddingHorizontal: wp('2'),
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: Colors.dkBorderColor,
                  marginVertical: hp('1'),
                  height: hp('5'),
                }}
              >
                <TextInput
                  placeholder="Enter expense name"
                  placeholderTextColor={Colors.textGray}
                  style={{ flex: 1, fontSize: hp('1.8') }}
                  editable={false}
                  value={
                    catList.filter(
                      res => res?.expense_category_id == modalVisible,
                    )[0]?.expense_category?.name
                  }
                />
              </View>
              <TextComponent
                text={'Enter amount'}
                isDarkTheme
                size={'2'}
                styles={{ marginTop: hp('2') }}
              />
              <View
                style={{
                  width: wp('90'),
                  paddingVertical: hp('1'),
                  paddingHorizontal: wp('2'),
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: Colors.dkBorderColor,
                  marginVertical: hp('1'),
                  height: hp('5'),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TextInput
                  placeholder="Enter amount"
                  placeholderTextColor={Colors.textGray}
                  style={{ flex: 1, fontSize: hp('1.8') }}
                  // editable={false}
                  value={inputPrice}
                  onChangeText={e => onChangeVal('inputPrice', e)}
                  keyboardType="numeric"
                />
                <TextComponent text={'$'} />
              </View>
              {/* <View style={styles.priceMainView}>
                <View style={styles.priceInnerView}>
                  <TextComponent text={'$'} size={'4.5'} />

                  <TextInput
                    placeholder="0"
                    onChangeText={text => {
                      onChangeVal('inputPrice', text);
                      setInputWidth(Math.max(20, text.length * 22)); // dynamic width
                    }}
                    style={{
                      fontSize: hp('4.5'),
                      color: 'black',
                      width: inputWidth,
                    }}
                    value={inputPrice}
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                  />
                </View>
                <TextComponent
                  text={'Add income amount'}
                  fade
                  size={'1.5'}
                  styles={styles.addIncomeText}
                />
              </View> */}
            </View>
          }
          btnTitle={'Save'}
          onBackPress={() => setModalVisible(null)}
          onPress={() => {
            setModalVisible(null);
            addAllocate(modalVisible);
          }}
          // onBackPress={}
        />
      )}
      {dateRangeModal && (
        <DateRangeModalComp
          visible={dateRangeModal}
          onClose={() => setDateRangeModal(false)}
          onSelectRange={e => {
            setDateRange(e);
            setTimeout(() => {
              refetch();
            }, 100);
            setDateRangeModal(false);
          }}
          selectedRange={dateRange}
        />
      )}
      <AllocateCompleteModal
        isModal={afterAdd}
        onClose={() => setAfterAdd(false)}
      />
    </ImageBackground>
  );
};

export default memo(AllocateToExpenseScreen);
