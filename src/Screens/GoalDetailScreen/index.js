import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import { Touchable } from '../../Components/Touchable';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import {
  arrowLeft,
  arrowRight,
  calendar,
  LoginBg,
  takePhoto,
  uploadPhoto,
} from '../../Assets';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import ModalViewComp from '../../Components/ModalViewComp';
import { TextComponent } from '../../Components/TextComponent';
import useGoalDetailScreen from './useGoalDetailScreen';
import {
  calculatePercentage,
  currentDate,
  formatDateToCustomFormat,
  formatPrice,
  uploadFromCamera,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';
import DatePicker from 'react-native-date-picker';

const GoalDetailScreen = ({ navigation, route }) => {
  const {
    modalState,
    setModalState,
    inputWidth,
    setInputWidth,
    goalsDetails,
    comment,
    inputPrice,
    selectedDate,
    selectedImg,
    onChangeVal,
    onaddIncome,
    setDatePickerState,
    datePickerState,
    onaddExpense,
    setFormState,
  } = useGoalDetailScreen(navigation, route);

  console.log('goalsDetailsgoalsDetailsgoalsDetailsgoalsDetails', goalsDetails);

  const total = 80000;
  const achieved = 34700;
  const targetDate = 'January 25, 2026';
  const credited = 34409.0;
  const debited = 6324.2;

  const progress = (achieved / total) * 100;

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Goal Details'} isBack />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Progress Row */}
        <View style={styles.rowBetween}>
          <Text style={styles.infoText}>
            Achieved:{' '}
            <Text style={styles.bold}>
              $
              {parseInt(
                goalsDetails?.incomes_sum_amount -
                  goalsDetails?.expenses_sum_amount,
              )}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            Target:{' '}
            <Text style={styles.bold}>
              ${parseInt(goalsDetails?.target_amount)}
            </Text>
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${calculatePercentage(
                  parseInt(goalsDetails?.incomes_sum_amount ?? 0) -
                    parseInt(goalsDetails?.expenses_sum_amount ?? 0),
                  parseInt(goalsDetails?.target_amount ?? 0),
                )}%`,
              },
            ]}
          />
        </View>

        {/* Goal Info */}
        <Text style={styles.goalTitle}>{goalsDetails?.name}</Text>
        <Text style={styles.goalDescription}>{goalsDetails?.note}</Text>

        <Text style={styles.targetDateLabel}>Target date</Text>
        <Text style={styles.targetDate}>{goalsDetails?.completion_date}</Text>

        {/* Credit / Debit Cards */}
        <View style={styles.rowBetween}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total credited:</Text>
            <Text style={styles.creditedValue}>
              {formatPrice(parseInt(goalsDetails?.incomes_sum_amount ?? 0))}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total debited:</Text>
            <Text style={styles.debitedValue}>
              {formatPrice(parseInt(goalsDetails?.expenses_sum_amount ?? 0))}
            </Text>
          </View>
        </View>

        {/* Transaction History */}
        <Touchable
          style={styles.transactionRow}
          onPress={() =>
            navigation.navigate('TranscritionHistoryScreen', goalsDetails)
          }
        >
          <Text style={styles.transactionText}>View transaction history</Text>
          <Image source={arrowRight} style={styles.arrowRight} />
        </Touchable>

        {/* Action Buttons */}
        <View style={{ ...styles.rowBetween, marginTop: hp('25') }}>
          <Touchable
            style={styles.addButton}
            onPress={() => setModalState('addIncome')}
          >
            <Text style={styles.addButtonText}>Add Income</Text>
          </Touchable>
          <Touchable
            style={styles.withdrawButton}
            onPress={() => setModalState('withdrawFunds')}
          >
            <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
          </Touchable>
        </View>
      </ScrollView>

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

      {modalState && (
        <ModalViewComp
          heading={`Add ${
            modalState == 'addIncome' ? 'income' : 'expense'
          } to Goal`}
          // subtitle={
          //   'You’ve left $2500 from the total budget of $2500 from the “Grocery”.'
          // }
          isModal={modalState}
          btnTitle={modalState == 'addIncome' ? 'Add income' : 'Withdraw Funds'}
          childrenComp={
            <View style={styles.modalContainer}>
              <View style={styles.progressCard}>
                <TextComponent
                  text={goalsDetails?.name}
                  family={'500'}
                  size={'1.8'}
                />
                <View style={styles.progressCardInnerView}>
                  <TextComponent
                    text={`Achieved: ${parseInt(
                      goalsDetails?.incomes_sum_amount -
                        goalsDetails?.expenses_sum_amount,
                    )}`}
                    size={'1.3'}
                  />
                  <TextComponent
                    text={`${formatPrice(
                      parseInt(goalsDetails?.target_amount ?? 0) +
                        parseInt(goalsDetails?.expenses_sum_amount ?? 0) -
                        parseInt(goalsDetails?.incomes_sum_amount ?? 0),
                    )} left of ${parseInt(goalsDetails?.target_amount)}`}
                    size={'1.3'}
                  />
                </View>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${calculatePercentage(
                          parseInt(goalsDetails?.incomes_sum_amount ?? 0) -
                            parseInt(goalsDetails?.expenses_sum_amount ?? 0),
                          parseInt(goalsDetails?.target_amount ?? 0),
                        )}%`,
                      },
                    ]}
                  />
                </View>
              </View>
              <View>
                <TextComponent
                  text={'Select date'}
                  family={'400'}
                  isThemeColor
                  size={'1.5'}
                />
                <View style={styles.categoryContainer}>
                  <TextComponent
                    text={formatDateToCustomFormat(selectedDate ?? currentDate)}
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
              {modalState == 'withdrawFunds' && (
                <>
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
                </>
              )}

              <TextComponent
                text={'Add notes'}
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
              <View style={styles.categoryContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Type amount"
                  placeholderTextColor={'gray'}
                  keyboardType="numeric"
                  value={inputPrice}
                  onChangeText={e => onChangeVal('inputPrice', e)}
                />
                <TextComponent text={'$'} />
              </View>

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
                <TextComponent
                  text={
                    modalState == 'addIncome'
                      ? 'Add funds to your goal'
                      : 'Withdraw funds from your goal'
                  }
                  fade
                  size={'1.5'}
                  styles={styles.addIncomeText}
                />
              </View> */}
            </View>
          }
          onBackPress={() => {
            setModalState(null);

            setFormState({
              selectedDate: null,
              selectedImg: null,
              comment: null,
              inputPrice: null,
            });
          }}
          onPress={() => {
            setModalState(null);
            if (modalState == 'addIncome') onaddIncome();
            else onaddExpense();
          }}
        />
      )}
    </ImageBackground>
  );
};

export default GoalDetailScreen;
