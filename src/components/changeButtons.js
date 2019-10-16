import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function ChangeButtons({ adjustTimer, type, disabled }) {
  return (
    <div className="countdown-buttons">
      <button
        className="button is-primary timer-button"
        onClick={() => adjustTimer(type === 'up' ? 'incHours' : 'decHours')}
        disabled={disabled}
      >
        <FontAwesomeIcon
          icon={type === 'up' ? faChevronUp : faChevronDown}
          color="#231F20"
          size="1x"
        />
      </button>
      <button
        className="button is-primary timer-button"
        onClick={() => adjustTimer(type === 'up' ? 'incMinutes' : 'decMinutes')}
        disabled={disabled}
      >
        <FontAwesomeIcon
          icon={type === 'up' ? faChevronUp : faChevronDown}
          color="#231F20"
          size="1x"
        />
      </button>
      <button
        className="button is-primary timer-button"
        onClick={() => adjustTimer(type === 'up' ? 'incSeconds' : 'decSeconds')}
        disabled={disabled}
      >
        <FontAwesomeIcon
          icon={type === 'up' ? faChevronUp : faChevronDown}
          color="#231F20"
          size="1x"
        />
      </button>
    </div>
  )
}
