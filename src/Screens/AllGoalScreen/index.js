import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import {
  calender,
  editWhiteIcon,
  LoginBg,
  plusBlue,
  plusCircle,
  searchIcon,
  trashWhite,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Touchable } from '../../Components/Touchable';
import GoalCardComp from '../../Components/GoalCardComp';
import useAllGoalsScreen from './useAllGoalScreen';

const AllGoalScreen = ({ navigation }) => {
  const { goalList, deleteGoal } = useAllGoalsScreen(navigation);

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
        <GoalCardComp
          key={index}
          item={item}
          mainView={{ marginVertical: hp('1') }}
        />
      );
    },
    [8],
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteGoal(item?.id)}
      >
        <Image
          source={trashWhite}
          style={styles.trashIcon}
          tintColor={'#EA4335'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => navigation.navigate('AddGoalScreen', item)}
      >
        <Image
          source={editWhiteIcon}
          style={styles.trashIcon}
          tintColor={'#1877F2'}
        />
      </TouchableOpacity>
    </View>
  );

  const listArry = [1];

  return (
    <ImageBackground source={LoginBg} style={styles.container}>
      <HeaderComponent
        headerTitle="My Goals"
        isBack
        rightIconImg={plusBlue}
        onRightPress={() => navigation.navigate('AddGoalScreen')}
      />

      {goalList.length > 0 ? (
        <>
          <TextComponent
            text={'Select goal to add income and expenses'}
            family={'500'}
            size={'1.8'}
            styles={{ marginLeft: wp('2') }}
          />
          <TextComponent
            text={
              'Choose the goal below to add your income and expenses in to complete your goal on time.'
            }
            family={'500'}
            size={'1.5'}
            fade
            styles={{ marginLeft: wp('2'), marginVertical: hp('1') }}
          />

          <SwipeListView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.upComingFlatlistView}
            useFlatList
            data={goalList}
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
          <TextComponent
            text={'Time to create your first goal!'}
            family={'bold'}
          />
          <TextComponent
            text={
              "Start by setting your first goal. Whether it's saving for something big or building better habits, every achievement begins with a single step."
            }
            family={'300'}
            fade
            size={'1.3'}
            styles={styles.emptyText}
          />
          <ThemeButton
            title={'Add a Goal '}
            isTheme
            style={{ width: wp('50') }}
            textStyle={{ fontSize: hp('1.5') }}
            onPress={() => navigation.navigate('AddGoalScreen')}
          />
        </View>
      )}

      {/* <View style={styles.searchContainer}>
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
        data={[]}
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
      /> */}

      {/* {Array.from({ length: 6 }).map((_, index) => (
        <ExpenseProgressCard key={index} />
      ))} */}

      {/* <DateRangeModalComp /> */}
    </ImageBackground>
  );
};

export default memo(AllGoalScreen);
