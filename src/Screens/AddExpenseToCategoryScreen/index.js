import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
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
  convertToLocalTime,
  currentDate,
  formatDateToCustomFormat,
  uploadFromCamera,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';

const AddExpenseToCategoryScreen = ({ navigation, route }) => {
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

  const ModalViewData = () => {
    const [formState, setFormState] = useState({
      selectedDate: null,
      selectedImg: null,
      comment: null,
      inputPrice: null,
    });

    const { comment, inputPrice, selectedDate, selectedImg } = formState;

    const updateState = data =>
      setFormState(prev => ({ ...formState, ...data }));

    const onChangeVal = (key, val) => updateState({ [key]: val });

    return (
      <View style={styles.modalContainer}>
        <View>
          <TextComponent
            text={'Select date'}
            family={'400'}
            isThemeColor
            size={'1.5'}
          />
          <View style={styles.categoryContainer}>
            <TextComponent
              text={formatDateToCustomFormat(selectedDate) ?? '25/Jun/2025'}
              size={'1.5'}
              onPress={() => {
                setDatePickerState(true);
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
          <View style={styles.uploadedImageWrapper}>
            <Image
              source={{ uri: selectedImg?.uri }}
              style={styles.uploadedImage}
            />
          </View>
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
          size={'1.5'}
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

        <View style={styles.priceMainView}>
          <View style={styles.priceInnerView}>
            <TextComponent text={'$'} size={'2.5'} />
            <TextInput
              placeholder="0"
              onChangeText={text => {
                onChangeVal('InputPrice', text);
                setInputWidth(Math.max(20, text.length * 14)); // dynamic width
              }}
              style={[styles.priceInput, { width: inputWidth }]}
              value={inputPrice}
              placeholderTextColor={'gray'}
              keyboardType="numeric"
            />
          </View>
          <TextComponent
            text={'Set amount limit for your category'}
            fade
            size={'1.5'}
            styles={styles.addIncomeText}
          />
        </View>

        <View style={styles.summaryRow}>
          <TextComponent text={'Spent so far: $1,070'} size={'1.5'} />
          <TextComponent text={'Remaining: $1,430'} size={'1.5'} />
        </View>
      </View>
    );
  };

  const renderData = useCallback(() => {
    return (
      <PlusCardComp
        remaining={`Remaining : $${120} of $${price ?? '200'}`}
        categoryName={'sdvsd'}
      />
    );
  }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Add Expense'} isBack />
      <View style={{ flexGrow: 1, paddingHorizontal: wp('2') }}>
        <View style={styles.header}>
          <TextComponent text={catName} family={'600'} size={'2.5'} />
          <TouchableOpacity style={styles.editButton}>
            <Image
              source={editIcon}
              style={styles.editIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TextComponent
          text={'Have to look on expenses in dubai.'}
          family={'300'}
          size={'1.5'}
          styles={styles.description}
        />
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        <View style={styles.limitContainer}>
          <TextComponent
            text={`Limit: ${price ?? 0}$`}
            family={'400'}
            size={'1.5'}
          />
          <TextComponent text={`Spent: ${'0'}`} family={'400'} size={'1.5'} />
        </View>
        <View style={styles.expensesSection}>
          <TextComponent text="Expenses" family={'600'} size={'2'} />
          <Touchable
            style={styles.addButton}
            onPress={() => {
              setModalState(true);
            }}
          >
            <TextComponent
              text="+ Add new"
              family={'600'}
              size={'1.5'}
              styles={styles.addText}
              isThemeColor
            />
          </Touchable>
        </View>
        <TextComponent
          text="Choose an expense first helps you keep your spending organized and easy to track."
          family={'300'}
          size={'1.5'}
          styles={styles.expenseDescription}
        />
        <FlatList
          data={expensesArry}
          keyExtractor={KeyBoardWrapper}
          renderItem={renderData}
          contentContainerStyle={{ alignSelf: 'center' }}
          //   contentContainerStyle={{ flex: 1 }}
        />
      </View>
      {modalSate && (
        <ModalViewComp
          isModal={modalSate}
          heading={'Add Expense'}
          subtitle={
            'You’ve left $2500 from the total budget of $2500 from the “Grocery”.'
          }
          childrenComp={<ModalViewData />}
          onBackPress={() => setModalState(false)}
          onPress={() => setModalState(false)}
          // onBackPress={}
        />
      )}

      <DatePicker
        // mode={'datetime'}
        mode={'date'}
        open={datePickerState}
        date={currentDate}
        is24hourSource="locale"
        locale="en"
        onCancel={() => setDatePickerState(false)}
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
          setDatePickerState(false);
          // }
        }}
      />
    </ImageBackground>
  );
};

export default memo(AddExpenseToCategoryScreen);
