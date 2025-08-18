import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { memo, useCallback } from 'react';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import {
  calender,
  editWhiteIcon,
  plusBlue,
  plusCircle,
  trashWhite,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';

const AllTraceScreen = ({ navigation }) => {
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

  const listArry = [];

  return (
    <View style={styles.container}>
      <HeaderComponent
        headerTitle="Traces"
        isBack
        rightIconImg={listArry.length > 0 ? calender : plusBlue}
      />

      {listArry.length > 0 ? null : (
        <View style={styles.emptyContainer}>
          <TextComponent
            text={'Time to create your first trace!'}
            family={'bold'}
          />
          <TextComponent
            text={
              "It looks like you haven't created a trace yet. A trace is a great way to monitor your activities and see your journey unfold. Let's create one now."
            }
            family={'300'}
            fade
            size={'1.3'}
            styles={styles.emptyText}
          />
          <ThemeButton
            title={'Create new trace '}
            isTheme
            style={{ width: wp('50') }}
            textStyle={{ fontSize: hp('1.5') }}
            onPress={() => navigation.navigate('CreateNewTraceScreen')}
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
    </View>
  );
};

export default memo(AllTraceScreen);
