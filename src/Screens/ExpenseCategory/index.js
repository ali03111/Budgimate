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
  plusCircle,
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

const ExpenseCategory = () => {
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

  return (
    <View style={styles.container}>
      <HeaderComponent
        headerTitle="Expenses categories"
        isBack
        rightIconImg={calender}
      />

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

      <SwipeListView
        showsVerticalScrollIndicator={false}
        style={styles.upComingFlatlistView}
        useFlatList
        // data={[1, 23, 4]}
        data={[1, 2, 3, 4, 5, 6]}
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

      {/* {Array.from({ length: 6 }).map((_, index) => (
        <ExpenseProgressCard key={index} />
      ))} */}
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
        position="right"
      />
      {/* <DateRangeModalComp /> */}
    </View>
  );
};

export default memo(ExpenseCategory);
