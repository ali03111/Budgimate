import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { LoginBg } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { keyExtractor } from '../../Utils';
import GoalCardComp from '../../Components/GoalCardComp';
import { hp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import useAllocateTraceScreen from './useAllocateTraceScreen';
import ModalViewComp from '../../Components/ModalViewComp';
import { formatPrice } from '../../Services/GlobalFunctions';

const AllocateTraceScreen = ({ navigation, route }) => {
  const {
    modalVisible,
    setModalVisible,
    isProTrace,
    traceList,
    onChangeVal,
    inputPrice,
    inputWidth,
    setInputWidth,
    addAllocate,
  } = useAllocateTraceScreen(navigation, route);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          if (isProTrace) {
            navigation.navigate('AddExpenseToTraceScreen', {
              catVal: { id: item?.id },
              price: parseInt(item?.budget),
              module_type: 'trace',
              module_id: 3,
              traceType: item?.type,
              allocate: true,
              leftOver: route?.params?.leftOver ?? route?.params,
            });
          } else setModalVisible(item?.id);
        }}
      >
        <ExpenseProgressCard
          key={index}
          mainView={{ marginVertical: hp('1') }}
          isDisable
          item={item}
        />
      </Pressable>
    );
  }, []);
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Allocate Leftover to Trace'} isBack />
      <ThemeButton
        title={`Total Leftover: ${formatPrice(
          route?.params?.leftOver ?? route?.params,
        )}`}
        isTransparent
        style={styles.themeButton}
        textStyle={styles.themeButtonText}
      />
      <TextComponent
        text={`Add leftover amount of ${formatPrice(
          route?.params?.leftOver ?? route?.params,
        )} or less, from “Last cycle” to your “Trace”.`}
        fade
        styles={styles.textComponent}
        size={'1.3'}
      />
      <FlatList
        data={traceList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingBottom: hp('10') }}
      />
      {Boolean(modalVisible != null) && (
        <ModalViewComp
          isModal={Boolean(modalVisible != null)}
          heading={'Allocate Leftover to Trace'}
          childrenComp={
            <View>
              <TextComponent text={'Emergency fund'} />
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: hp('2'),
                }}
              >
                <TextComponent
                  text={'$34,700 raised'}
                  size={'1.3'}
                  family={'500'}
                />
                <TextComponent
                  text={'$45,300 left of $80,000'}
                  size={'1.3'}
                  family={'500'}
                />
              </View> */}
              <View style={styles.priceMainView}>
                <View style={styles.priceInnerView}>
                  <TextComponent text={'$'} size={'4.5'} />

                  <TextInput
                    placeholder="0"
                    onChangeText={text => {
                      onChangeVal('inputPrice', text);
                      setInputWidth(Math.max(20, text.length * 22)); // dynamic width
                    }}
                    style={{
                      fontSize: hp('4.5'),
                      color: 'black',
                      width: inputWidth,
                    }}
                    value={inputPrice}
                    placeholderTextColor={'gray'}
                    keyboardType="numeric"
                  />
                </View>
                <TextComponent
                  text={'Add income amount'}
                  fade
                  size={'1.5'}
                  styles={styles.addIncomeText}
                />
              </View>
            </View>
          }
          btnTitle={'Add funds'}
          onBackPress={() => setModalVisible(null)}
          onPress={() => {
            setModalVisible(null);
            addAllocate(modalVisible);
          }}
          // onBackPress={}
        />
      )}
    </ImageBackground>
  );
};

export default memo(AllocateTraceScreen);
