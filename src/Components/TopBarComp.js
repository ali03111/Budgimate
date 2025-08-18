import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const TopBarComp = ({ screens, activeScreen, onScreenChange }) => {
  return (
    <View style={styles.container}>
      {screens.map((screen, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeScreen === screen ? styles.activeTab : null,
          ]}
          onPress={() => onScreenChange(screen)}
        >
          <Text
            style={[
              styles.tabText,
              activeScreen === screen ? styles.activeTabText : null,
            ]}
          >
            {screen}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '700',
  },
});

export default TopBarComp;
