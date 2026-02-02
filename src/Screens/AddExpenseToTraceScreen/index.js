import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import {
  arrowRight,
  arrRight,
  arrRightPurple,
  edit2,
  editIcon,
  editWhiteIcon,
  LoginBg,
  plusBlue,
  plusWhite,
  trashWhite,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { Touchable } from '../../Components/Touchable';
import ModalViewComp from '../../Components/ModalViewComp';
import useAddExpenseToTraceScreen from './useAddExpenseToTraceScreen';
import { keyExtractor } from '../../Utils';
import {
  calculatePercentage,
  formatDateToCustomFormat,
  formatPrice,
} from '../../Services/GlobalFunctions';
import ModalReciptComp from '../../Components/ModalReciptComp';
import { createExpenseCategoryUrl, getCategoryUrl } from '../../Utils/Urls';
import { SwipeListView } from 'react-native-swipe-list-view';
import { errorMessage } from '../../Config/NotificationMessage';

const AddExpenseToTraceScreen = ({ navigation, route }) => {
  const {
    modalState,
    setModalState,
    expenceAmount,
    setExpenceAmount,
    catName,
    setCatName,
    categoryArry,
    limit,
    spend,
    setInputWidth,
    inputWidth,
    inputPrice,
    setInputPrice,
    updateLimit,
    traceName,
    onChangeVal,
    selectedDate,
    selectedImg,
    comment,
    inputExpensePrice,
    addExpense,
    addExpenseToCategory,
    setCatIndex,
    catIndex,
    traceType,
    setFormState,
    traceId,
    deleteTraceCat,
    allocateToTrace,
    allocateToTraceExpense,
    inputTraceName,
  } = useAddExpenseToTraceScreen(navigation, route);

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={styles.cardStyle}>
          <View>
            <TextComponent
              text={item?.category_name}
              size={'1.8'}
              family={'bold'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={styles.innerView}>
                <TextComponent text={'Spent: '} fade size={'1.5'} />
                <TextComponent
                  text={formatPrice(item?.spent)}
                  size={'1.5'}
                  styles={{
                    color:
                      calculatePercentage(item?.spent, item?.limit) >= 100 &&
                      traceType
                        ? Colors.themeRed
                        : Colors.primaryColor,
                  }}
                />
              </View>
              {traceType && (
                <View style={styles.innerView}>
                  <TextComponent text={'Limit: '} fade size={'1.5'} />
                  <TextComponent
                    text={formatPrice(item?.limit)}
                    size={'1.5'}
                    fade
                  />
                </View>
              )}
            </View>
            {traceType && (
              <View style={{ ...styles.progressBackground, width: wp('70') }}>
                <View
                  style={[
                    styles.progressFill(
                      calculatePercentage(item?.spent, item?.limit),
                    ),
                  ]}
                />
              </View>
            )}
          </View>
          <Touchable
            onPress={() => {
              setCatIndex(index);
              setModalState('addExpense');
            }}
          >
            <Image
              source={plusBlue}
              resizeMode="contain"
              style={styles.plusIcon}
            />
          </Touchable>
        </View>
      );
    },
    [traceType, categoryArry],
  );

  const renderHiddenItem = ({ item, index }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteTraceCat(item.module_category_id)} // Assuming item has an id
      >
        <Image
          source={trashWhite}
          style={styles.trashIcon}
          tintColor={'#EA4335'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          if (traceType) {
            setCatName({
              name: item?.category_name,
              id: item?.expense_category_id,
            });
            if (!route?.params?.allocate) {
              setExpenceAmount(item?.limit.toString());
            }
            setCatIndex(item?.module_category_id);
            setModalState('newCategory');
          } else errorMessage('To update limit you need to a pro trace!');
        }}
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
    <ImageBackground source={LoginBg} style={styles.bgImage}>
      <HeaderComponent
        headerTitle={
          route?.params?.allocate
            ? 'Allocate Leftover to Trace'
            : 'Add Expense To Trace'
        }
        isBack
      />
      {Boolean(route?.params?.allocate) && (
        <ThemeButton
          title={`Total Leftover: ${formatPrice(
            route?.params?.leftOver ?? route?.params,
          )}`}
          isTransparent
          style={styles.themeButton}
          textStyle={styles.themeButtonText}
        />
      )}

      {/* Expense Card */}
      <View style={styles.expenseCard}>
        <View style={styles.expenseHeaderRow}>
          <View>
            <TextComponent text={traceName} family={'400'} />
          </View>
          <Touchable
            onPress={() => {
              if (!route?.params?.allocate) {
                setInputPrice(limit.toString());
                setInputWidth(Math.max(20, limit.length * 14));
                onChangeVal('traceName', traceName);
              }
              setModalState('editLimit');
            }}
          >
            <Image
              source={editIcon}
              resizeMode="contain"
              style={styles.plusIcon}
            />
          </Touchable>
        </View>

        <View style={styles.limitSpentRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextComponent text={`Spent: `} fade size={'1.6'} />
            <TextComponent
              text={`${formatPrice(parseInt(spend))}`}
              styles={{
                color:
                  calculatePercentage(spend, limit) >= 100
                    ? Colors.themeRed
                    : Colors.primaryColor,
              }}
              size={'1.6'}
            />
          </View>
          <TextComponent
            text={`Trace Limit: ${formatPrice(parseInt(limit))}`}
            fade
            size={'1.6'}
          />
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill(calculatePercentage(spend, limit))]}
          />
        </View>
      </View>

      {/* Description */}
      {/* <TextComponent
        text={'Description'}
        size={'1.8'}
        isDarkTheme
        styles={styles.descriptionLabel}
      />

      <View style={styles.descriptionBox}>
        <TextInput
          placeholder="Have to look on expenses in dubai."
          placeholderTextColor={'gray'}
          style={styles.descriptionInput}
          multiline
        />
      </View> */}

      {/* Category */}
      <View style={styles.categoryHeader}>
        <TextComponent text={'Category'} size={'1.8'} isDarkTheme />
        <TextComponent
          text={'+ Add new'}
          size={'1.8'}
          onPress={() => setModalState('newCategory')}
        />
      </View>

      <TextComponent
        text={
          'Choosing a category first helps you keep your spending organized and easy to track.'
        }
        fade
        size={'1.5'}
        styles={styles.categoryHelperText}
      />

      <SwipeListView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }}
        useFlatList
        data={categoryArry} // Use filterData or fallback to traceList
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
      {/* <FlatList
        data={categoryArry}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      /> */}

      {categoryArry.length > 0 && (
        <ThemeButton
          title={'Generate report'}
          isTheme
          style={styles.createBtn}
          onPress={() => {
            navigation.navigate('ReportScreen', { id: traceId });
          }}
        />
      )}
      {/* Modal */}
      <ModalViewComp
        isModal={modalState}
        heading={
          (modalState == 'editLimit' &&
            (route?.params?.allocate
              ? 'Allocate Leftover to Trace'
              : 'Edit Trace Limit')) ||
          (modalState == 'newCategory' &&
            (catIndex != null
              ? route?.params?.allocate
                ? 'Allocate Leftover to Category'
                : 'Update Category Limit'
              : 'Add New Category')) ||
          (modalState == 'addExpense' && 'Add Expense')
        }
        btnTitle={'Save'}
        subtitle={
          modalState == 'newCategory' &&
          `You’ve left ${formatPrice(
            parseInt(spend),
          )} from the total budget of ${formatPrice(
            parseInt(limit),
          )} from the ${traceName} trace.`
        }
        childrenComp={
          (modalState == 'editLimit' && (
            <View>
              {!route?.params?.allocate && (
                <View style={styles.categoryContainer}>
                  <TextInput
                    style={styles.commentInput}
                    placeholder="Enter name here"
                    placeholderTextColor={'gray'}
                    value={inputTraceName}
                    onChangeText={e => onChangeVal('traceName', e)}
                    maxLength={31}
                  />
                </View>
              )}
              <View style={styles.categoryContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Enter name here"
                  placeholderTextColor={'gray'}
                  value={inputPrice}
                  onChangeText={e => setInputPrice(e)}
                  maxLength={31}
                />
                <TextComponent text={'$'} />
              </View>
              {/* <View style={styles.priceMainView}>
                <View style={styles.priceInnerView}>
                  <TextComponent text={'$'} size={'2.5'} />
                  <TextInput
                    placeholder="0"
                    onChangeText={text => {
                      setInputPrice(text);
                      setInputWidth(Math.max(20, text.length * 14)); // dynamic width
                    }}
                    style={[styles.priceInput, { width: inputWidth }]}
                    value={inputPrice}
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                  />
                </View>
              </View> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: wp('90'),
                }}
              >
                <TextComponent text={'Spent so far: $1,070'} size={'1.5'} />
                <TextComponent text={'Remaining: $1,430'} size={'1.5'} />
              </View> */}
            </View>
          )) ||
          (modalState == 'newCategory' && (
            <View style={styles.modalContent}>
              <TextComponent text={'Category'} size={'1.8'} />
              <Touchable
                style={styles.modalInputBox}
                disabled={Boolean(catIndex != null)}
                onPress={() => {
                  setModalState(null);
                  navigation.navigate('CatViewScreen', {
                    onSelectValue: e => {
                      setCatName(e);
                      setModalState('newCategory');
                    },
                    selectedValue: [catName],
                    urlName: getCategoryUrl + `?module_type=trace`,
                  });
                }}
              >
                <TextComponent
                  text={catName?.name ?? 'Choose category here'}
                  size={'1.5'}
                />
                <Image
                  source={arrRightPurple}
                  resizeMode="contain"
                  style={{ width: wp('4'), height: hp('2') }}
                  tintColor={'black'}
                />
                {/* <TextInput
                  placeholder="Type category name"
                  placeholderTextColor={'gray'}
                  style={styles.modalInput}
                  value={catName}
                  onChangeText={setCatName}
                /> */}
              </Touchable>
              {traceType && (
                <>
                  <TextComponent text={'Spending limit'} size={'1.8'} />
                  <View style={styles.modalInputBox}>
                    <TextInput
                      placeholder="Spending limit"
                      placeholderTextColor={'gray'}
                      style={styles.modalInput}
                      value={expenceAmount}
                      onChangeText={e => setExpenceAmount(e)}
                      keyboardType="numeric"
                    />
                  </View>
                </>
              )}
            </View>
          )) ||
          (modalState == 'addExpense' && (
            <ModalReciptComp
              onPress={data => {
                setModalState(null);
                addExpenseToCategory(data);
              }}
            />
          ))
        }
        onBackPress={() => {
          setFormState({
            selectedDate: null,
            selectedImg: null,
            comment: null,
            inputPrice: null,
          });
          setCatIndex(null);
          setCatName(null);
          setExpenceAmount(null);
          setModalState(null);
        }}
        hideBtn={Boolean(modalState == 'addExpense')}
        onPress={() => {
          setModalState(null);
          if (modalState == 'editLimit') {
            if (route?.params?.allocate) allocateToTrace();
            else updateLimit();
          } else if (modalState == 'newCategory') {
            if (route?.params?.allocate) allocateToTraceExpense();
            else addExpense();
          }
        }}
      />
    </ImageBackground>
  );
};

export default memo(AddExpenseToTraceScreen);
