import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import {
  calender,
  editWhiteIcon,
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
  const { dateRangeModal, setDateRangeModal } = useExpenseCategory();

  const actions = [
    {
      text: 'Create Expense',
      icon: plusCircle,
      name: 'bt_accessibility',
      position: 1,
    },
  ];

  const renderItem = useCallback(
    (item, index) => {
      return <ExpenseProgressCard key={index} />;
    },
    [8],
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {}}
      >
        <Image source={trashWhite} style={styles.trashIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Image source={editWhiteIcon} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  );

  const listArry = [1, 2, 3];

  return (
    <View style={styles.container}>
      <HeaderComponent
        headerTitle="Expenses categories"
        isBack
        rightIconImg={plusBlue}
        onRightPress={() => navigation.navigate('AddCategoryScreen')}
      />

      {listArry.length > 0 ? (
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
            style={styles.upComingFlatlistView}
            useFlatList
            data={listArry}
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
            onPress={() => navigation.navigate('AddCategoryScreen')}
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
          onSelectRange={() => setDateRangeModal(false)}
        />
      )}
    </View>
  );
};

export default memo(ExpenseCategory);
