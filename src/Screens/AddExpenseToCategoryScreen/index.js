import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import {
  arrDown,
  arrRightPurple,
  calendar,
  editIcon,
  LoginBg,
  plusCircle,
  takePhoto,
  trashWhite,
  upload,
  uploadPhoto,
} from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import { Touchable } from '../../Components/Touchable';
import { styles } from './styles';
import { hp, wp } from '../../Hooks/useResponsive';
import ModalViewComp from '../../Components/ModalViewComp';
import { Colors } from '../../Theme/Variables';
import useAddExpenseToCategoryScreen from './useAddExpenseToCategoryScreen';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import PlusCardComp from '../../Components/plusCardComp';
import DatePicker from 'react-native-date-picker';
import {
  calculatePercentage,
  convertToLocalTime,
  formatDateToCustomFormat,
  formatDateToLong,
  uploadFromCamera,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';
import { keyExtractor } from '../../Utils';
import { set } from 'react-hook-form';
import { SwipeListView } from 'react-native-swipe-list-view';
import { imageUrl } from '../../Utils/Urls';

const AddExpenseToCategoryScreen = ({ navigation, route }) => {
  const currentDate = new Date();

  const {
    inputWidth,
    setInputWidth,
    price,
    catName,
    onAddExpense,
    onUpdateVal,
    modalSate,
    expensesArry,
    setModalState,
    datePickerState,
    setDatePickerState,
    setInputPrice,
    catDataFromAPi,
    expensesArryFromApi,
    onChangeVal,
    comment,
    inputPrice,
    selectedDate,
    selectedImg,
    onSubmit,
    setFormState,
    isEdit,
    onDeleteExpense,
    formState,
    catLimit,
    onUpdateCatLimit,
    catUpateLimit,
    setCatUpdareLimit,
  } = useAddExpenseToCategoryScreen(navigation, route);

  // const ModalViewData = () => {
  //   return (
  //     <View style={{ marginTop: hp('2') }}>
  //       <TextComponent
  //         text={'Category'}
  //         family={'400'}
  //         isThemeColor
  //         size={'1.5'}
  //       />
  //       <View style={{ ...styles.categoryContainer, width: wp('90') }}>
  //         <TextInput
  //           style={{ flex: 1, fontSize: hp('1.5') }}
  //           placeholder="Enter Category"
  //           placeholderTextColor={'gray'}
  //         />

  //         {/* <TextComponent text={'Grocery'} size={'1.5'} />
  //         <Image
  //           source={arrDown}
  //           resizeMode="contain"
  //           style={{ width: wp('3'), height: hp('2') }}
  //           tintColor={Colors.dkBorderColor}
  //         /> */}
  //       </View>
  //       <View style={styles.priceMainView}>
  //         <View style={styles.priceInnerView}>
  //           <TextComponent text={'$'} size={'2.5'} />

  //           <TextInput
  //             placeholder="0"
  //             onChangeText={text => {
  //               setInputWidth(Math.max(20, text.length * 14)); // increase width based on content
  //             }}
  //             style={{
  //               fontSize: hp('2.5'),
  //               color: 'black',
  //               width: inputWidth,
  //             }}
  //             placeholderTextColor={'gray'}
  //             keyboardType="numeric"
  //           />
  //         </View>
  //         <TextComponent
  //           text={'Set amount limit for your category'}
  //           fade
  //           size={'1.5'}
  //           styles={styles.addIncomeText}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

  const handlePriceChange = useCallback(
    text => {
      onChangeVal('inputPrice', text);
      setInputWidth(Math.max(20, text.length * 14));
    },
    [onChangeVal, setInputWidth],
  );

  const handleCommentChange = useCallback(text => {
    onChangeVal('comment', text);
  }, []);

  const renderData = useCallback(
    ({ item, index }) => {
      return (
        <PlusCardComp
          remaining={`Spend : $${parseInt(item?.amount)}`}
          category={item?.name}
          onPlusPress={() => {
            console.log('get item', item);
            setFormState({
              selectedDate: item?.date ? new Date(item?.date) : null,
              selectedImg: { uri: item?.receipt },
              comment: item?.name,
              inputPrice: parseInt(item?.amount).toString(),
              isEdit: true,
              expenseID: item?.id,
            });
            setModalState(true);
          }}
        />
      );
    },
    [expensesArryFromApi],
  );

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Add Expense'} isBack />
      <View style={{ flexGrow: 1, paddingHorizontal: wp('2') }}>
        <View style={styles.header}>
          <TextComponent text={catName} family={'600'} size={'2.5'} />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              console.log(
                'pricepricepricepricepricepricepricepriceprice',
                price,
              );
              onChangeVal('catLimit', price.toString());
              onChangeVal('expenseID', expensesArryFromApi[0]?.id);
              setCatUpdareLimit(true);
            }}
          >
            <Image
              source={editIcon}
              style={styles.editIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* <TextComponent
          text={'Have to look on expenses in dubai.'}
          family={'300'}
          size={'1.5'}
          styles={styles.description}
        /> */}
        <View style={styles.progressContainer}>
          <View
            style={styles.progressBar(
              calculatePercentage(
                catDataFromAPi?.spent,
                catDataFromAPi?.limit ?? price,
              ),
            )}
          />
        </View>
        <View style={styles.limitContainer}>
          <TextComponent
            text={`Spent: ${catDataFromAPi?.spent ?? 0}$`}
            family={'400'}
            size={'1.8'}
            styles={{
              color:
                calculatePercentage(
                  catDataFromAPi?.spent,
                  catDataFromAPi?.limit,
                ) >= 100
                  ? Colors.themeRed
                  : Colors.primaryColor,
            }}
          />
          <TextComponent
            text={`Limit: ${catDataFromAPi?.limit ?? price ?? 0}$`}
            family={'400'}
            size={'1.8'}
          />
        </View>
        <View style={styles.expensesSection}>
          <TextComponent text="Expenses" family={'600'} size={'2'} />
          <Touchable
            style={styles.addButton}
            onPress={() => {
              setFormState({
                selectedDate: null,
                selectedImg: null,
                comment: null,
                inputPrice: null,
              });
              setModalState(true);
            }}
          >
            <TextComponent
              text="+ Add new"
              family={'600'}
              size={'1.8'}
              styles={styles.addText}
              isThemeColor
            />
          </Touchable>
        </View>
        <TextComponent
          text="Choose an expense first helps you keep your spending organized and easy to track."
          family={'300'}
          size={'1.8'}
          styles={styles.expenseDescription}
        />
        <FlatList
          data={expensesArryFromApi}
          keyExtractor={keyExtractor}
          renderItem={renderData}
          contentContainerStyle={{ alignSelf: 'center' }}
          //   contentContainerStyle={{ flex: 1 }}
        />
      </View>
      {modalSate && (
        <ModalViewComp
          isModal={modalSate}
          heading={'Add Expense'}
          subtitle={`You’ve left $${catDataFromAPi?.spent} from the total budget of $${price} from the ${catName}.`}
          childrenComp={
            <View style={styles.modalContainer}>
              <View>
                <TextComponent
                  text={'Select date'}
                  family={'400'}
                  isThemeColor
                  size={'1.8'}
                />
                <View style={styles.categoryContainer}>
                  <TextComponent
                    text={formatDateToLong(selectedDate ?? currentDate)}
                    size={'1.8'}
                    onPress={() => {
                      setDatePickerState(selectedDate ?? currentDate);
                    }}
                  />
                  <Image
                    source={calendar}
                    resizeMode="contain"
                    style={styles.dateIcon}
                    tintColor={Colors.dkBorderColor}
                  />
                </View>
              </View>

              {selectedImg?.uri ? (
                <Touchable
                  style={styles.uploadedImageWrapper}
                  onPress={async () => {
                    const image = await uploadFromGalary();
                    onChangeVal('selectedImg', image);
                  }}
                >
                  <Image
                    source={{
                      uri: selectedImg?.name
                        ? selectedImg?.uri
                        : imageUrl(selectedImg?.uri),
                    }}
                    style={styles.uploadedImage}
                  />
                </Touchable>
              ) : (
                <View style={styles.uploadOptionsRow}>
                  <Touchable
                    onPress={async () => {
                      const image = await uploadFromGalary();
                      onChangeVal('selectedImg', image);
                    }}
                  >
                    <Image
                      source={uploadPhoto}
                      resizeMode="contain"
                      style={styles.uploadImageBtn}
                    />
                  </Touchable>
                  <Touchable
                    onPress={async () => {
                      const image = await uploadFromCamera();
                      onChangeVal('selectedImg', image);
                    }}
                  >
                    <Image
                      source={takePhoto}
                      resizeMode="contain"
                      style={styles.uploadImageBtn}
                    />
                  </Touchable>
                </View>
              )}

              <TextComponent
                text={'Add comments'}
                family={'400'}
                isThemeColor
                size={'1.8'}
              />
              <View
                style={{
                  ...styles.categoryContainer,
                  paddingVertical: Platform.OS == 'ios' ? hp('1.2') : 0,
                }}
              >
                <TextInput
                  style={styles.commentInput}
                  placeholder="Type comment"
                  placeholderTextColor={'gray'}
                  value={comment}
                  onChangeText={handleCommentChange}
                />
              </View>
              <TextComponent
                text={'Price'}
                family={'400'}
                isThemeColor
                size={'1.8'}
              />
              <View style={styles.priceMainView}>
                <View style={styles.priceInnerView}>
                  <TextComponent text={'$'} size={'1.5'} />
                  <TextInput
                    placeholder="0"
                    onChangeText={handlePriceChange}
                    style={[styles.priceInput, { width: wp('70') }]}
                    value={inputPrice}
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          }
          onBackPress={() => setModalState(false)}
          onPress={() => {
            onSubmit();
          }}
          onNewBtnPress={id => {
            onDeleteExpense();
          }}
          isNewBtn={isEdit}
          btnTitle={isEdit ? 'Update Expense' : 'Save Expense'}
          // onBackPress={}
        />
      )}
      {catUpateLimit && (
        <ModalViewComp
          isModal={catUpateLimit}
          heading={'Update Category Limit'}
          subtitle={`You’ve left $${catDataFromAPi?.spent} from the total budget of $${price} from the ${catName}.`}
          childrenComp={
            <View style={styles.priceMainView}>
              <View style={styles.priceInnerView}>
                <TextComponent text={'$ '} size={'1.5'} />
                <TextInput
                  placeholder="Enter price"
                  onChangeText={e => onChangeVal('catLimit', e)}
                  style={[styles.priceInput, { width: wp('70') }]}
                  value={catLimit}
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                />
              </View>
            </View>
          }
          onBackPress={() => setCatUpdareLimit(false)}
          onPress={() => {
            if (catLimit != '') onUpdateCatLimit();
          }}
          btnTitle={'Update Limit'}
          // onBackPress={}
        />
      )}

      <DatePicker
        // mode={'datetime'}
        mode={'date'}
        open={Boolean(datePickerState)}
        date={selectedDate ?? currentDate}
        is24hourSource="locale"
        locale="en"
        onCancel={() => setDatePickerState(null)}
        modal
        onConfirm={e => {
          console.log(
            'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
            e,
            new Date(e.getTime() + 24 * 60 * 60 * 1000),
            e.toDateString(),
          );
          // if (datePicker.stateName == 'perfEventList') {
          //   datePicker.onChange();
          //   onSelectValueInList(
          //     datePicker?.index,
          //     datePicker.modalType ?? 'date',
          //     e,
          //   );
          //   toggleDate(null);
          // } else {
          onChangeVal('selectedDate', e);
          // onChange(new Date(e.getTime() + 24 * 60 * 60 * 1000));
          // datePicker.onChange(e);
          // onSelectValue(datePicker.stateName, e);
          setDatePickerState(null);
          // }
        }}
      />
    </ImageBackground>
  );
};

export default memo(AddExpenseToCategoryScreen);
