import React from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';

import { spacing, fontSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text style={[styles.historyItem, { color: item.status > 1 ? 'red' : 'green' }]}>
      {item.subject}
    </Text>
  )
}

export const FocusHistory = ({
  focusHistory,
  onClear
}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList 
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={(_, index) => index}
            />
            <View style={styles.clearContainer}>
              <RoundedButton title="Clear" size={75} onPress={onClear} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center'
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg
  },
  historyItem: {
    fontSize: fontSizes.md
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md
  }
});