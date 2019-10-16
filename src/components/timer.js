import React, { useState, useEffect, useRef } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import ControlButtons from './controlButtons';
import ChangeButtons from './changeButtons';
import Time from './time';

function Controller() {
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);
  const [timerTime, setTimerTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [value, setValue] = useState("");
  const interval = useRef();

  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValue(result);
    },
  });

  const startEnabled = timerOn === false && (timerStart === 0 || timerTime === timerStart);
  const stopEnabled = timerOn === true && timerTime >= 1000;
  const resumeEnabled = timerOn === false &&
    (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0);
  const resetEnabled = (timerOn === false || timerTime < 1000) &&
    (timerStart !== timerTime && timerStart > 0);

  useEffect(() => {
    const newTime = timerTime - 1000;
    if (timerOn && newTime >= 0) {
      interval.current = setInterval(() => {
        setTimerTime(newTime);
      }, 1000);
    } else if (timerOn && timerTime === 0) {
      clearInterval(interval.current);
      setTimerOn(false);
      speak({ text: 'Time\'s up.' })
    }

    return () => clearInterval(interval.current);
  }, [timerTime, timerOn, speak]);

  useEffect(() => {
    if (value && stopEnabled && value.includes('stop' || 'pause')) {
      speak({ text: 'Pausing.' });
      setValue('');
      stopTimer();
      stop();
    }
  }, [speak, value, stop, stopEnabled]);

  useEffect(() => {
    if (value && resetEnabled && value.includes('reset')) {
      speak({ text: 'Reset timer' });
      setValue('');
      resetTimer();
      stop();
    }
  }, [speak, value, resetTimer, stop, resetEnabled]);

  useEffect(() => {
    if (value && startEnabled && value.includes('start')) {
      speak({ text: 'Starting' });
      setValue('');
      startTimer();
      stop();
    }

  }, [speak, value, stop, startTimer, startEnabled]);

  // Used in effect and for buttons
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function startTimer() {
    setTimerTime(timerTime);
    setTimerStart(timerTime);
    setTimerOn(true);
    if (initialTime === 0) {
      setInitialTime(timerTime);
    }
  }

  function stopTimer() {
    clearInterval(interval.current);
    setTimerOn(false);
  }

  // Used in effect and for buttons
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function resetTimer() {
    if (!timerOn) {
      setTimerTime(0);
      setTimerStart(0);
      setInitialTime(0);
    }
  }

  function adjustTimer(input) {
    if (!timerOn) {
      if (input === 'incHours') setTimerTime(timerTime + 3600000);
      else if (input === 'decHours') setTimerTime(timerTime - 3600000);
      else if (input === 'incMinutes') setTimerTime(timerTime + 60000);
      else if (input === 'decMinutes') setTimerTime(timerTime - 60000);
      else if (input === 'incSeconds') setTimerTime(timerTime + 1000);
      else if (input === 'decSeconds') setTimerTime(timerTime - 1000);
    }
  }

  const calculatePercentage = (value, from) => {
    if (value && from) return Math.ceil(value / from * 100);
    return null;
  }

  const calculatePercentsLeft = (percentage) => {
    return 100 - percentage;
  }

  const seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
  const minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
  const hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);
  const percentage = calculatePercentage(timerTime, initialTime);
  const inversePercentage = calculatePercentsLeft(percentage);
  const enableChanges = !timerOn && initialTime === 0;

  return (
    <div className="timer-container">
      <CircularProgressbar
        value={inversePercentage}
        text={inversePercentage ? `${inversePercentage}%` : ''}
        className="progress-bar"
        styles={buildStyles({
          pathColor: `rgb(61,220,151, ${inversePercentage / 100})`,
          textColor: '#231F20',
          trailColor: '#d6d6d6',
        })}
      />

      <div className="controls">
        <ChangeButtons adjustTimer={adjustTimer} type="up" disabled={!enableChanges} />
        <Time hours={hours} minutes={minutes} seconds={seconds} />
        <ChangeButtons adjustTimer={adjustTimer} type="down" disabled={!enableChanges} />

        <ControlButtons
          startTimer={startTimer}
          startEnabled={startEnabled}
          resumeEnabled={resumeEnabled}
          stopTimer={stopTimer}
          stopEnabled={stopEnabled}
          resetTimer={resetTimer}
          resetEnabled={resetEnabled}
          listen={listen}
          stop={stop}
          listening={listening}
        />
      </div>
      <div style = {{ opacity: listening ? 1 : 0 }}>Say "Start", "Pause", "Stop" or "Reset" to control the timer. </div>
    </div>

  );
};

export default Controller;

