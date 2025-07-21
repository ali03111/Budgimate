import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { TextComponent } from './TextComponent';

const DateRangeModalComp = ({
  visible,
  onClose,
  onSelectRange,
  selectedRange,
}) => {
  const [active, setActive] = useState(selectedRange || 'week');

  const handleSelect = range => {
    setActive(range);
    onSelectRange && onSelectRange(range);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TextComponent
            text="Date Range"
            size="2.2"
            styles={styles.modalTitle}
          />
          <TextComponent
            text="See data from the previous week or month to spot recent expense fast."
            size="1.6"
            fade
            styles={styles.modalDescription}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.rangeBtn, active === 'week' && styles.activeBtn]}
              onPress={() => handleSelect('week')}
            >
              <TextComponent
                text="Last week"
                size="1.5"
                styles={[styles.btnText]}
                isWhite={Boolean(active === 'week')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rangeBtn, active === 'month' && styles.activeBtn]}
              onPress={() => handleSelect('month')}
            >
              <TextComponent
                text="Last month"
                size="1.5"
                styles={[
                  styles.btnText,
                  active === 'month' && styles.activeBtnText,
                ]}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <TextComponent
                text="Reset"
                size="1.5"
                fade
                styles={styles.resetText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DateRangeModalComp;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp('90'),
    backgroundColor: 'white',
    borderRadius: 14,
    padding: wp('5'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: '600',
    marginBottom: hp('1'),
  },
  modalDescription: {
    marginBottom: hp('2'),
    lineHeight: hp('2.5'),
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2'),
  },
  rangeBtn: {
    borderWidth: 1,
    borderColor: Colors.borderGray || '#E0E0E0',
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    borderRadius: wp('5'),
  },
  activeBtn: {
    backgroundColor: Colors.backgroundTheme,
    borderColor: Colors.backgroundTheme,
  },
  btnText: {
    color: '#000',
  },
  activeBtnText: {
    color: '#fff',
  },
  resetText: {
    marginLeft: wp('18'),
  },
});
