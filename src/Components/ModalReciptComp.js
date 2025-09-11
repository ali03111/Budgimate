import { Image, StyleSheet, TextInput, View } from 'react-native';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { TextComponent } from './TextComponent';
import { useState } from 'react';
import { calendar, takePhoto, uploadPhoto } from '../Assets';
import {
  formatDateToCustomFormat,
  uploadFromCamera,
  uploadFromGalary,
} from '../Services/GlobalFunctions';
import { Touchable } from './Touchable';

const ModalReciptComp = ({ btnTitle }) => {
  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputPrice: null,
  });

  const { comment, inputPrice, selectedDate, selectedImg } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

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
      <TextComponent
        text={'Upload Receipt'}
        family={'400'}
        isThemeColor
        size={'1.5'}
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
      <TextComponent
        text={'Add amount'}
        family={'400'}
        isThemeColor
        size={'1.5'}
      />
      <View style={styles.priceMainView}>
        <View style={styles.priceInnerView}>
          <TextComponent text={'$'} size={'2.5'} />
          <TextInput
            placeholder="0"
            onChangeText={text => {
              //   onChangeVal('InputPrice', text);
              //   setInputWidth(Math.max(20, text.length * 14)); // dynamic width
            }}
            style={[styles.priceInput, { width: 20 }]}
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
      </View>
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
    width: wp('3'),
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
    fontSize: hp('1.5'),
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
});
