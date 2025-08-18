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
import React, { memo, useCallback } from 'react';
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

const AddExpenseToCategoryScreen = () => {
  const { inputWidth, setInputWidth } = useAddExpenseToCategoryScreen();

  //   const ModalViewData = () => {
  //     return (
  //       <View style={{ marginTop: hp('2') }}>
  //         <TextComponent
  //           text={'Category'}
  //           family={'400'}
  //           isThemeColor
  //           size={'1.5'}
  //         />
  //         <View style={styles.categoryContainer}>
  //           <TextComponent text={'Grocery'} size={'1.5'} />
  //           <Image
  //             source={arrDown}
  //             resizeMode="contain"
  //             style={{ width: wp('3'), height: hp('2') }}
  //             tintColor={Colors.dkBorderColor}
  //           />
  //         </View>
  //         <View style={styles.priceMainView}>
  //           <View style={styles.priceInnerView}>
  //             <TextComponent text={'$'} size={'2.5'} />

  //             <TextInput
  //               placeholder="0"
  //               onChangeText={text => {
  //                 setInputWidth(Math.max(20, text.length * 14)); // increase width based on content
  //               }}
  //               style={{
  //                 fontSize: hp('2.5'),
  //                 color: 'black',
  //                 width: inputWidth,
  //               }}
  //               placeholderTextColor={'gray'}
  //               keyboardType="numeric"
  //             />
  //           </View>
  //           <TextComponent
  //             text={'Set amount limit for your category'}
  //             fade
  //             size={'1.5'}
  //             styles={styles.addIncomeText}
  //           />
  //         </View>
  //       </View>
  //     );
  //   };

  const ModalViewData = () => {
    return (
      <View style={{ marginTop: hp('2') }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <TextComponent
              text={'Category'}
              family={'400'}
              isThemeColor
              size={'1.5'}
            />
            <View style={styles.categoryContainer}>
              <TextComponent text={'Grocery'} size={'1.5'} />
              <Image
                source={arrDown}
                resizeMode="contain"
                style={{ width: wp('3'), height: hp('2') }}
                tintColor={Colors.dkBorderColor}
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
              <TextComponent text={'25/Jun/2025'} size={'1.5'} />
              <Image
                source={calendar}
                resizeMode="contain"
                style={{ width: wp('3'), height: hp('2') }}
                tintColor={Colors.dkBorderColor}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Touchable>
            <Image
              source={uploadPhoto}
              resizeMode="contain"
              style={{ width: wp('42'), height: hp('13') }}
            />
          </Touchable>
          <Touchable>
            <Image
              source={takePhoto}
              resizeMode="contain"
              style={{ width: wp('42'), height: hp('13') }}
            />
          </Touchable>
        </View>
        <View style={styles.priceMainView}>
          <View style={styles.priceInnerView}>
            <TextComponent text={'$'} size={'2.5'} />

            <TextInput
              placeholder="0"
              onChangeText={text => {
                setInputWidth(Math.max(20, text.length * 14)); // increase width based on content
              }}
              style={{
                fontSize: hp('2.5'),
                color: 'black',
                width: inputWidth,
              }}
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
      </View>
    );
  };

  const renderData = useCallback(() => {
    return <PlusCardComp />;
  }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Add Expense'} isBack />
      <View style={{ flexGrow: 1, paddingHorizontal: wp('2') }}>
        <View style={styles.header}>
          <TextComponent text={'category'} family={'600'} size={'2.5'} />
          <TouchableOpacity style={styles.editButton}>
            <Image
              source={editIcon}
              style={styles.editIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TextComponent
          text={'description'}
          family={'300'}
          size={'1.5'}
          styles={styles.description}
        />
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        <View style={styles.limitContainer}>
          <TextComponent
            text={`Limit: ${'limit'}`}
            family={'400'}
            size={'1.5'}
          />
          <TextComponent
            text={`Spent: ${'spent'}`}
            family={'400'}
            size={'1.5'}
          />
        </View>
        <View style={styles.expensesSection}>
          <TextComponent text="Expenses" family={'600'} size={'2'} />
          <Touchable style={styles.addButton}>
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
          data={[1, 2, 3, 4, 56]}
          keyExtractor={KeyBoardWrapper}
          renderItem={renderData}
          contentContainerStyle={{ alignSelf: 'center' }}
          //   contentContainerStyle={{ flex: 1 }}
        />
      </View>
      <ModalViewComp
        isModal={false}
        heading={'Add Expense'}
        subtitle={
          'You’ve left $2500 from the total budget of $2500 from the “Grocery”.'
        }
        childrenComp={<ModalViewData />}
        onBackPress={() => {}}
        onPress={() => {}}
        // onBackPress={}
      />
    </ImageBackground>
  );
};

export default memo(AddExpenseToCategoryScreen);
