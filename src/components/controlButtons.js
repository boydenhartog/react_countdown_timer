import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

export default function ControlButtons({
  startTimer,
  startEnabled,
  resumeEnabled,
  stopTimer,
  stopEnabled,
  resetEnabled,
  resetTimer,
  listen,
  stop,
  listening
}) {
  const { speak } = useSpeechSynthesis();

  return (
    <div className="buttons">
      <button
        className="button is-primary control-button"
        onClick={() => { startTimer(); speak({ text: 'Started the timer' }) }}
      >
        <FontAwesomeIcon
          disabled={!startEnabled && !resumeEnabled}
          icon={faPlay}
          color="rgb(34, 34, 34)"
          size="1x"
        />
      </button>
      <button
        className="button is-primary control-button"
        onClick={() => { stopTimer(); speak({ text: 'Paused the timer' })}}
        disabled={!stopEnabled}
      >
        <FontAwesomeIcon
          icon={faPause}
          color="rgb(34, 34, 34)"
          size="1x"
        />
      </button>
      <button
        className="button is-primary control-button"
        onClick={() => { resetTimer(); speak({ text: 'I\'ve reset the timer' })}}
        disabled={!resetEnabled}
      >
        <FontAwesomeIcon
          icon={faUndo}
          color="rgb(34, 34, 34)"
          size="1x"
        />
      </button>
      {!listening && <button
        className="button is-primary control-button"
        onClick={() => {
          listen();
          speak({ text: 'I\'m listening' });
        }}>
          <FontAwesomeIcon
            icon={faMicrophone}
            color="rgb(34, 34, 34)"
            size="1x"
          />
        </button>
      }
      {listening && <button className="button is-primary control-button" onClick={() => stop()}>
        <FontAwesomeIcon
          icon={faMicrophoneSlash}
          color="rgb(34, 34, 34)"
          size="1x"
        />
        </button>
      }
    </div>
  )
}