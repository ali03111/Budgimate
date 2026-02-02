import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { editWhiteIcon, LoginBg, trashWhite } from '../../Assets';
import { HeaderComponent } from '../../Components/HeaderComp';
import IncomeSourceCardComp from '../../Components/IncomeSourceCardComp';
import { hp } from '../../Hooks/useResponsive';
import useAllIncomesScreen from './useAllIncomesScreen';
import { keyExtractor } from '../../Utils';
import { SwipeListView } from 'react-native-swipe-list-view';
import { styles } from './styles';

const AllIncomesScreen = ({ navigation }) => {
  const {
    incomeSource,
    mutateAsync,
    deleteIcome,
    onRefresh,
    onRowOpen,
    onRowClose,
  } = useAllIncomesScreen(navigation);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <IncomeSourceCardComp
        item={item}
        isSelected={Boolean(item?.is_primary == 1)}
        onPress={() => {
          Alert.alert(
            'Warning',
            'Are you sure you want to set this income source as primary?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => mutateAsync(item?.id),
              },
            ],
          );
        }}
      />
    );
  }, []);

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteIcome(item?.id)}
      >
        <Image
          source={trashWhite}
          style={styles.trashIcon}
          tintColor={'#EA4335'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          navigation.navigate('AddIncomeScreen', {
            ...item,
            isUpdate: true,
            basic: true,
          })
        }
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
    <ImageBackground style={{ flex: 1 }} source={LoginBg}>
      <HeaderComponent headerTitle={'Income Sources'} isBack />
      <SwipeListView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          gap: hp('1'),
          paddingBottom: hp('5'),
        }}
        useFlatList
        data={incomeSource}
        // data={[]}
        // sections={bottomData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        leftOpenValue={75}
        previewRowKey={'0'}
        // stopLeftSwipe
        previewOpenDelay={3000}
        onRefresh={onRefresh}
        refreshing={false}
        keyExtractor={keyExtractor}
        closeOnScroll={true}
        closeOnRowOpen={true}
        closeOnRowPress={true}
        onRowOpen={onRowOpen}
      />
      {/* <FlatList
        data={incomeSource}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          gap: hp('1'),
          paddingBottom: hp('5'),
        }}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      /> */}
    </ImageBackground>
  );
};

export default memo(AllIncomesScreen);
