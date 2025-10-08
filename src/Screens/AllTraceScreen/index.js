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
  createText,
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
import useAllTraceScreen from './useAllTraceScreen';
import NavigationService from '../../Services/NavigationService';
import ModalViewComp from '../../Components/ModalViewComp';

const AllTraceScreen = ({ navigation, route }) => {
  const {
    deleteTrace,
    traceList,
    searchFun,
    text,
    setText,
    filterData,
    setModalState,
    modalState,
    inputWidth,
    setInputWidth,
    comment,
    inputPrice,
    onChangeVal,
    onAddIncome,
    screenName,
  } = useAllTraceScreen(route, navigation);

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
          onPres={() => {
            if (route?.params?.type == 'income') setModalState(item?.id);
            else {
              navigation.navigate('AddExpenseToTraceScreen', {
                catVal: { id: item?.id },
                price: parseInt(item?.budget),
                module_type: 'trace',
                module_id: 3,
                traceType: item?.type,
              });
            }
          }}
        />
      );
    },
    [filterData, traceList],
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteTrace(item.id)} // Assuming item has an id
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
          navigation.navigate('AddExpenseToTraceScreen', {
            catVal: { id: item?.id },
            price: parseInt(item?.budget),
            module_type: 'trace',
            module_id: 3,
            traceType: item?.type,
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

  return (
    <ImageBackground source={LoginBg} style={styles.container}>
      <HeaderComponent
        headerTitle="Traces"
        isBack={Boolean(screenName != 'AllBottomTraceScreen')}
        rightIconImg={createText}
        onRightPress={() => navigation.navigate('CreateNewTraceScreen')}
        rightIconStyle={{
          width: wp('10'),
          height: hp('3'),
        }}
        // isAnotherRightChildern={
        //   <TextComponent
        //     text={'Create'}
        //     isThemeColor
        //     styles={{ backgroundColor: 'red' }}
        //   />
        // }
      />

      {traceList && traceList.length > 0 ? (
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
                placeholder="Search traces"
                placeholderTextColor={Colors.grayFaded}
                value={text}
                onChangeText={e => searchFun(e)} // Call searchFun on text change
              />
            </View>
            {/* <Touchable>
              <Image
                source={calender}
                resizeMode="contain"
                style={{ width: wp('7'), height: hp('3') }}
              />
            </Touchable> */}
          </View>

          <SwipeListView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.upComingFlatlistView}
            useFlatList
            data={
              traceList != null &&
              traceList?.length > 0 &&
              (filterData.length >= 0 && text != '' ? filterData : traceList)
            } // Use filterData or fallback to traceList
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenDelay={3000}
            closeOnRowPress
            refreshing={false}
            scrollEnabled
          />
        </>
      ) : (
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
      {modalState != null && (
        <ModalViewComp
          isModal={Boolean(modalState != null)}
          heading={'Add Income'}
          btnTitle={'Add Income'}
          // subtitle={
          //   modalState == 'newCategory' &&
          //   `You’ve left ${formatPrice(
          //     parseInt(spend),
          //   )} from the total budget of ${formatPrice(
          //     parseInt(limit),
          //   )} from the ${traceName} trace.`
          // }
          childrenComp={
            <View>
              <TextComponent
                text={'Add comments'}
                family={'400'}
                isThemeColor
                size={'2'}
              />
              <View style={styles.categoryContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Type comment"
                  placeholderTextColor={'gray'}
                  value={comment}
                  onChangeText={e => onChangeVal('comment', e)}
                />
              </View>
              <TextComponent
                text={'Add amount*'}
                family={'400'}
                isThemeColor
                size={'2'}
              />
              <View style={styles.priceMainView}>
                <View style={styles.priceInnerView}>
                  <TextComponent text={'$'} size={'3.5'} />
                  <TextInput
                    placeholder="0"
                    onChangeText={text => {
                      onChangeVal('inputPrice', text);
                      setInputWidth(Math.max(20, text.length * 18)); // dynamic width
                    }}
                    style={[styles.priceInput, { width: inputWidth }]}
                    value={inputPrice}
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          }
          onBackPress={() => {
            setModalState(null);
          }}
          onPress={() => {
            onAddIncome(modalState);
            setModalState(null);
          }}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AllTraceScreen);
