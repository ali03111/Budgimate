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
  formatDateToCustomFormat,
  uploadFromCamera,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';

const GoalDetailScreen = ({ navigation }) => {
  const { modalState, setModalState, inputWidth, setInputWidth } =
    useGoalDetailScreen();

  const total = 80000;
  const achieved = 34700;
  const targetDate = 'January 25, 2026';
  const credited = 34409.0;
  const debited = 6324.2;

  const progress = (achieved / total) * 100;

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
        <View style={styles.progressCard}>
          <TextComponent text={'Emergency fund'} family={'500'} size={'1.8'} />
          <View style={styles.progressCardInnerView}>
            <TextComponent text={'Achieved: $34,700'} size={'1.3'} />
            <TextComponent text={'$45,300 left of $80,000'} size={'1.3'} />
          </View>
          <View style={styles.progressBackground}>
            <View style={[styles.progressFill, { width: `${20}%` }]} />
          </View>
        </View>
        {modalState == 'withdrawFunds' && (
          <>
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
            text={
              modalState == 'addIncome'
                ? 'Add funds to your goal'
                : 'Withdraw funds from your goal'
            }
            fade
            size={'1.5'}
            styles={styles.addIncomeText}
          />
        </View>
      </View>
    );
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Goal Details'} isBack />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Progress Row */}
        <View style={styles.rowBetween}>
          <Text style={styles.infoText}>
            Achieved:{' '}
            <Text style={styles.bold}>${achieved.toLocaleString()}</Text>
          </Text>
          <Text style={styles.infoText}>
            Target: <Text style={styles.bold}>${total.toLocaleString()}</Text>
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        {/* Goal Info */}
        <Text style={styles.goalTitle}>Emergency fund</Text>
        <Text style={styles.goalDescription}>
          This is a long-term goal, so I’ll be contributing whenever I can. I’m
          excited to see how quickly it adds up so I’ll be contributing a small
          amount!
        </Text>

        <Text style={styles.targetDateLabel}>Target date</Text>
        <Text style={styles.targetDate}>{targetDate}</Text>

        {/* Credit / Debit Cards */}
        <View style={styles.rowBetween}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total credited:</Text>
            <Text style={styles.creditedValue}>
              ${credited.toLocaleString()}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total debited:</Text>
            <Text style={styles.debitedValue}>${debited.toLocaleString()}</Text>
          </View>
        </View>

        {/* Transaction History */}
        <Touchable style={styles.transactionRow}>
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
      {modalState && (
        <ModalViewComp
          heading={`Add ${
            modalState == 'addIncome' ? 'income' : 'expense'
          } to Goal`}
          subtitle={
            'You’ve left $2500 from the total budget of $2500 from the “Grocery”.'
          }
          isModal={modalState}
          btnTitle={modalState == 'addIncome' ? 'Add income' : 'Withdraw Funds'}
          childrenComp={<ModalViewData />}
          onBackPress={() => setModalState(null)}
          onPress={() => setModalState(null)}
        />
      )}
    </ImageBackground>
  );
};

export default GoalDetailScreen;
