import { Image, StyleSheet, TextInput, View } from 'react-native';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { TextComponent } from './TextComponent';
import { useState } from 'react';
import { calendar, takePhoto, uploadPhoto } from '../Assets';
import {
  currentDate,
  formatDateToCustomFormat,
  uploadFromCamera,
  uploadFromGalary,
} from '../Services/GlobalFunctions';
import { Touchable } from './Touchable';
import ThemeButton from './ThemeButton';
import { errorMessage } from '../Config/NotificationMessage';
import DatePicker from 'react-native-date-picker';

const ModalReciptComp = ({ btnTitle, onPress }) => {
  const [formState, setFormState] = useState({
    selectedDate: currentDate,
    selectedImg: null,
    comment: null,
    inputPrice: null,
  });

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const [datePickerState, setDatePickerState] = useState(null);

  const { comment, inputPrice, selectedDate, selectedImg } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  return (
    <View style={styles.modalContainer}>
      <View>
        <TextComponent
          text={'Select date*'}
          family={'400'}
          isThemeColor
          size={'2'}
        />
        <View style={styles.categoryContainer}>
          <TextComponent
            text={
              formatDateToCustomFormat(selectedDate ?? currentDate) ??
              '25/Jun/2025'
            }
            size={'1.8'}
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
      <TextComponent
        text={'Upload Receipt'}
        family={'400'}
        isThemeColor
        size={'2'}
        styles={{ marginBottom: hp('2') }}
      />
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
      <View style={styles.categoryContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Type price"
          keyboardType="numeric"
          placeholderTextColor={'gray'}
          value={inputPrice}
          onChangeText={e => onChangeVal('inputPrice', e)}
        />
        <TextComponent text={'$'} />
      </View>
      {/* <TextComponent
        text={'Add amount*'}
        family={'400'}
        isThemeColor
        size={'2'}
      /> */}
      {/* <View style={styles.priceMainView}>
        <View style={styles.priceInnerView}>
          <TextComponent text={'$'} size={'2.5'} />
          <TextInput
            placeholder="0"
            onChangeText={text => {
              onChangeVal('inputPrice', text);
              setInputWidth(Math.max(20, text.length * 14)); // dynamic width
            }}
            style={[styles.priceInput, { width: inputWidth }]}
            value={inputPrice}
            placeholderTextColor={'gray'}
            keyboardType="numeric"
          />
        </View>
        {btnTitle && (
          <TextComponent
            text={btnTitle}
            fade
            size={'1.5'}
            styles={styles.addIncomeText}
          />
        )}
      </View> */}
      {onPress && (
        <ThemeButton
          title={'Save'}
          onPress={() => {
            if (
              selectedDate != null &&
              inputPrice != null &&
              inputPrice != ''
            ) {
              onPress(formState);
              setFormState({
                selectedDate: null,
                selectedImg: null,
                comment: null,
                inputPrice: null,
              });
            } else errorMessage('Please complete required fields');
          }}
          style={{
            ...styles.modalBtn,
          }}
          isTheme
          textStyle={{ fontSize: hp('1.5') }}
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
    </View>
  );
};

export default ModalReciptComp;

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: hp('2'),
  },
  progressCard: {
    width: wp('90'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('2'),
    marginBottom: hp('2'),
  },
  progressCardInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
  },
  categoryContainer: {
    width: wp('90'),
    paddingVertical: hp('1.2'),
    paddingHorizontal: wp('1.5'),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    backgroundColor: Colors.white,
    marginVertical: hp('2'),
  },
  dateIcon: {
    width: wp('5'),
    height: hp('2'),
  },
  uploadedImageWrapper: {
    width: wp('90'),
    height: hp('15'),
    borderRadius: 10,
    marginBottom: hp('2'),
  },
  uploadedImage: {
    width: wp('90'),
    height: hp('15'),
    borderRadius: 10,
  },
  uploadOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('2'),
  },
  uploadImageBtn: {
    width: wp('42'),
    height: hp('13'),
  },
  commentInput: {
    flex: 1,
    fontSize: hp('1.8'),
  },
  priceMainView: {
    width: wp('90'),
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: hp('3'),
    borderRadius: 10,
    marginVertical: hp('2'),
    gap: hp('1'),
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
  },
  priceInnerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIncomeText: { textAlign: 'center', marginTop: hp('1') },
  priceInput: {
    fontSize: hp('2.5'),
    color: 'black',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalBtn: {
    width: wp('90'),
    alignSelf: 'center',
    marginTop: hp('2'),
    marginBottom: hp('5'),
    height: hp('5'),
  },
});
