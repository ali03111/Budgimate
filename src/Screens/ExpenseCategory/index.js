import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import {
  calender,
  editWhiteIcon,
  LoginBg,
  plusBlue,
  plusCircle,
  plusWhite,
  searchIcon,
  trashWhite,
} from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import { styles } from './styles';
import DateRangeModalComp from '../../Components/DateRangeModalComp';
import { FloatingAction } from 'react-native-floating-action';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';
import useExpenseCategory from './useExpenseCategory';

const ExpenseCategory = ({ navigation }) => {
  const {
    dateRangeModal,
    arryList,
    setDateRangeModal,
    onDeleteCat,
    searchFun,
    filterData,
    text,
    setText,
    dateRange,
    setDateRange,
    refetch,
  } = useExpenseCategory();

  const actions = [
    {
      text: 'Create Expense',
      icon: plusCircle,
      name: 'bt_accessibility',
      position: 1,
    },
  ];

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ExpenseProgressCard
          key={index}
          item={item}
          onPres={() =>
            navigation.navigate('AddExpenseToCategoryScreen', {
              catVal: {
                id: item?.expense_category_id,
                name: item?.category_name,
              },
              price: item?.limit,
              module_type: 'basic',
            })
          }
        />
      );
    },
    [arryList, filterData],
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          console.log('kslnvklsdkvlsbdklvbskdlvlskvsdlkvsdvb', item);
          onDeleteCat(item?.module_category_id);
        }}
      >
        <Image
          source={trashWhite}
          style={styles.trashIcon}
          tintColor={'#EA4335'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          navigation.navigate('AddExpenseToCategoryScreen', {
            catVal: {
              id: item?.expense_category_id,
              name: item?.category_name,
            },
            price: item?.limit,
            module_type: 'basic',
          })
        }
      >
        <Image
          source={editWhiteIcon}
          style={styles.trashIcon}
          tintColor={'#1877F2'}
        />
      </TouchableOpacity>
    </View>
  );

  const listArry = [1, 2, 3];

  return (
    <ImageBackground style={styles.container} source={LoginBg}>
      <HeaderComponent
        headerTitle="Expenses categories"
        isBack
        rightIconImg={plusBlue}
        onRightPress={() =>
          navigation.navigate('AddCategoryScreen', { module_type: 'basic' })
        }
      />

      {arryList && arryList.length > 0 ? (
        <>
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
            <Touchable onPress={() => setDateRangeModal(true)}>
              <Image
                source={calender}
                resizeMode="contain"
                style={{ width: wp('6'), height: hp('3') }}
              />
            </Touchable>
          </View>

          <SwipeListView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.upComingFlatlistView}
            useFlatList
            data={
              arryList != null &&
              arryList?.length > 0 &&
              (filterData.length >= 0 && text != '' ? filterData : arryList)
            }
            // data={[]}
            // sections={bottomData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            previewRowKey={'0'}
            // previewOpenValue={-40}
            previewOpenDelay={3000}
            // previewOpenValue={-40}
            closeOnRowPress
            refreshing={false}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <TextComponent text={'Categories not found!'} family={'bold'} />
          <TextComponent
            text={
              'Create categories and expenses by tapping the “plus” button to manage your budget with budgimate.'
            }
            family={'300'}
            fade
            size={'1.3'}
            styles={styles.emptyText}
          />
          <ThemeButton
            title={'Create category'}
            isTheme
            style={{ width: wp('50') }}
            textStyle={{ fontSize: hp('1.5') }}
            onPress={() =>
              navigation.navigate('AddCategoryScreen', { module_type: 'basic' })
            }
          />
        </View>
      )}

      {/* {Array.from({ length: 6 }).map((_, index) => (
        <ExpenseProgressCard key={index} />
      ))} */}

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
    </ImageBackground>
  );
};

export default memo(ExpenseCategory);
