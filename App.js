import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2
}

const STORAGE_KEY = 'focusHistory';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(focusHistory));
    } catch (ex) {
      console.log(ex);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(STORAGE_KEY);

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  }

  const clearHistory = () => {
    setFocusHistory([]);
  }

  return (
    <View style={styles.container}>
      {focusSubject 
        ? (<Timer 
            focusSubject={focusSubject} 
            onTimerEnd={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);

              setFocusSubject(null);
            }} 
            clearSubject={() => {
              addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);

              setFocusSubject(null);
            }}
          />)
        : (
            <View style={{ flex: 1 }}>
              <Focus addSubject={setFocusSubject} />
              <FocusHistory focusHistory={focusHistory} onClear={clearHistory} />
            </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg
  }
});
