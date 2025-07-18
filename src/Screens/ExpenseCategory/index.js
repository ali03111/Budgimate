import { View, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { calender, searchIcon } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import ExpenseProgressCard from '../../Components/ExpenseProgressCard';
import { styles } from './styles';

const ExpenseCategory = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent
        headerTitle="Expenses categories"
        isBack
        rightIconImg={calender}
      />

      <View style={styles.searchContainer}>
        <Image
          source={searchIcon}
          resizeMode="contain"
          style={styles.searchIcon}
          tintColor={Colors.black}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
          placeholderTextColor={Colors.grayFaded}
        />
      </View>

      {Array.from({ length: 6 }).map((_, index) => (
        <ExpenseProgressCard key={index} />
      ))}
    </View>
  );
};

export default memo(ExpenseCategory);
