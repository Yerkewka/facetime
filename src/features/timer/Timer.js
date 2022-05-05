import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing';

const DEFAULT_TIME = 0.2;

export const Timer = ({
  focusSubject,
  onTimerEnd,
  clearSubject
}) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const handleChangeTime = (time) => {
    setMinutes(time);

    setProgress(1);

    setIsStarted(false);
  }

  const handleTimeEnd = () => {
    vibrate();

    setMinutes(DEFAULT_TIME);

    setProgress(1);

    setIsStarted(false);

    onTimerEnd();
  }

  const vibrate = () => {
    const interval = setInterval(() => Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(interval), 10000);
  }

  return (<View style={styles.container}>
    <View style={styles.countdown}>
      <Countdown minutes={minutes} isPaused={!isStarted} onProgress={setProgress} onEnd={handleTimeEnd} />
    </View>
    <View style={{ paddingTop: spacing.xxl }}>
      <Text style={styles.title}>Focus on:</Text>
      <Text style={styles.task}>{focusSubject}</Text>
    </View>
    <View style={{ paddingTop: spacing.sm }}>
      <ProgressBar 
        progress={progress}
        color="#5E84E2"
        style={styles.progress}
      />
    </View>
    <View style={styles.buttonContainer}>
      <Timing onChangeTime={handleChangeTime} />
    </View>
    <View style={styles.buttonContainer}>
      {isStarted 
        ? <RoundedButton title="pause" onPress={() => setIsStarted(false)} /> 
        : <RoundedButton title="start" onPress={() => setIsStarted(true)} />}
    </View>
    <View style={styles.clearSubject}>
      <RoundedButton title="-" size={50} onPress={clearSubject} /> 
    </View>
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    color: colors.white,
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    height: 10
  },
  buttonContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg
  }
})