import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import {
  arrowRight,
  arrRight,
  edit2,
  editIcon,
  LoginBg,
  plusBlue,
  plusWhite,
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
import { formatDateToCustomFormat } from '../../Services/GlobalFunctions';
import ModalReciptComp from '../../Components/ModalReciptComp';

const AddExpenseToTraceScreen = ({ navigation }) => {
  const {
    modalState,
    setModalState,
    expenceAmount,
    setExpenceAmount,
    catName,
    setCatName,
    categoryArry,
    setCategoryArry,
  } = useAddExpenseToTraceScreen();

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.cardStyle}>
        <View>
          <TextComponent text={'House holds'} size={'1.5'} family={'bold'} />
          <View style={styles.innerView}>
            <TextComponent text={'Spent: '} fade size={'1.2'} />
            <TextComponent text={'$120'} size={'1.2'} isThemeColor />
          </View>
        </View>
        <Touchable onPress={() => setModalState('addExpense')}>
          <Image
            source={plusBlue}
            resizeMode="contain"
            style={styles.plusIcon}
          />
        </Touchable>
      </View>
    );
  }, []);

  return (
    <ImageBackground source={LoginBg} style={styles.bgImage}>
      <HeaderComponent headerTitle={'Add Expense to Trace'} isBack />

      {/* Expense Card */}
      <View style={styles.expenseCard}>
        <View style={styles.expenseHeaderRow}>
          <View>
            <TextComponent text={'Holiday in Dubai'} family={'400'} />
            <TextComponent
              text={'Have to look on expenses in dubai.'}
              fade
              size={'1.5'}
            />
          </View>
          <Touchable onPress={() => setModalState('editLimit')}>
            <Image
              source={editIcon}
              resizeMode="contain"
              style={styles.plusIcon}
            />
          </Touchable>
        </View>

        <View style={styles.limitSpentRow}>
          <TextComponent text={'Trace Limit: $2500'} fade size={'1.5'} />
          <TextComponent text={'Spent: $0'} fade size={'1.5'} />
        </View>

        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: '30%' }]} />
        </View>
      </View>

      {/* Description */}
      <TextComponent
        text={'Description'}
        size={'1.5'}
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
      </View>

      {/* Category */}
      <View style={styles.categoryHeader}>
        <TextComponent text={'Category'} size={'1.5'} isDarkTheme />
        <TextComponent
          text={'+ Add new'}
          size={'1.5'}
          onPress={() => setModalState('newCategory')}
        />
      </View>

      <TextComponent
        text={
          'Choosing a category first helps you keep your spending organized and easy to track.'
        }
        fade
        size={'1.2'}
        styles={styles.categoryHelperText}
      />

      {/* <View style={styles.cardStyle}>
        <TextComponent text={'House holds'} size={'1.5'} family={'bold'} />
        <View style={styles.innerView}>
          <TextComponent text={'Spent: '} fade size={'1.2'} />
          <TextComponent text={'$120'} size={'1.2'} isThemeColor />
        </View>
      </View> */}

      <FlatList
        data={categoryArry}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(10) }}
      />

      {categoryArry.length > 0 && (
        <ThemeButton
          title={'Create trace'}
          isTheme
          style={styles.createBtn}
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}
        />
      )}
      {/* Modal */}
      <ModalViewComp
        isModal={modalState}
        heading={
          (modalState == 'editLimit' && 'Edit Trace Limit') ||
          (modalState == 'newCategory' && 'Add new category') ||
          (modalState == 'addExpense' && 'Add Expense')
        }
        btnTitle={'Save'}
        subtitle={
          modalState == 'newCategory' &&
          'You’ve left $1650 from the total budget of $2500 from the “Monthly grocery” trace.'
        }
        childrenComp={
          (modalState == 'editLimit' && (
            <View>
              <View style={styles.priceMainView}>
                <View style={styles.priceInnerView}>
                  <TextComponent text={'$'} size={'2.5'} />
                  <TextInput
                    placeholder="0"
                    onChangeText={text => {
                      // onChangeVal('InputPrice', text);
                      // setInputWidth(Math.max(20, text.length * 14)); // dynamic width
                    }}
                    style={[styles.priceInput, { width: 20 }]}
                    // value={inputPrice}
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: wp('90'),
                }}
              >
                <TextComponent text={'Spent so far: $1,070'} size={'1.5'} />
                <TextComponent text={'Remaining: $1,430'} size={'1.5'} />
              </View>
            </View>
          )) ||
          (modalState == 'newCategory' && (
            <View style={styles.modalContent}>
              <TextComponent text={'Category'} size={'1.5'} />
              <View style={styles.modalInputBox}>
                <TextInput
                  placeholder="Type category name"
                  placeholderTextColor={'gray'}
                  style={styles.modalInput}
                  value={catName}
                  onChangeText={setCatName}
                />
              </View>

              <TextComponent text={'Expense amount'} size={'1.5'} />
              <View style={styles.modalInputBox}>
                <TextInput
                  placeholder="Spending amount"
                  placeholderTextColor={'gray'}
                  style={styles.modalInput}
                  value={expenceAmount}
                  onChangeText={setExpenceAmount}
                  keyboardType="numeric"
                />
              </View>
            </View>
          )) ||
          (modalState == 'addExpense' && <ModalReciptComp />)
        }
        onBackPress={() => setModalState(null)}
        onPress={() => {
          setModalState(null);
          setCategoryArry([...categoryArry, { catName, expenceAmount }]);
        }}
      />
    </ImageBackground>
  );
};

export default memo(AddExpenseToTraceScreen);
