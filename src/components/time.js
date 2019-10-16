import React from 'react';
import SplitText from 'react-pose-text';

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

export default function Time({ hours, minutes, seconds }) {
  return (
    <div class="countdown-time">
      <span className="countdown-segment">
        <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
          {hours}
        </SplitText>
      </span>
      <span className="countdown-segment">
        <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
          {minutes}
        </SplitText>
      </span>
      <span className="countdown-segment">
        <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
          {seconds}
        </SplitText>
      </span>
    </div>
  );
}