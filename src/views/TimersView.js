import React from "react";
import styled from "styled-components";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import { useTimerContext } from "../components/TimerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faPause, faPlay, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const TimerControls = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const buttonStyle = {
  backgroundColor: "#fcba03",
  color: "white",
  borderRadius: "8px",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
  border: "5px",
  borderStyle: "solid",
  borderColor: "#bf8f0a",
};

const resetButtonStyle = {
  backgroundColor: "#d9311e",
  color: "white",
  borderRadius: "8px",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
  border: "5px",
  borderStyle: "solid",
  borderColor: "#ba3425",
};

const buttonContainerStyle = {
  paddingLeft: "16px",
}

const TimersView = () => {
  const { timers, startStop, fastForward, removeTimer, isWorkoutRunning, restart } = useTimerContext();

  const handleStartStopClick = () => {
    startStop();
  }

  const handleResetClick = () => {
    restart();
  }

  const handleFastForwardClick = () => {
    fastForward();
  }

  return (
    <Timers>
      <div style={buttonContainerStyle}>
        <FontAwesomeIcon icon={isWorkoutRunning ? faPause : faPlay} style={buttonStyle} onClick={handleStartStopClick}/>
        <FontAwesomeIcon icon={faRotateLeft} style={resetButtonStyle} onClick={handleResetClick}/>
        <FontAwesomeIcon icon={faForward} style={buttonStyle} onClick={handleFastForwardClick} />
      </div>
      {timers.map((timer, index) => {
        switch (timer.type) {
          case "Countdown":
            return (
              <Timer key={timer.id}>
                <TimerTitle>#{index+1} {timer.type}</TimerTitle>
                <Countdown
                  id={timer.id}
                  duration={timer.duration.getTotalSeconds()}
                />
              </Timer>
            );
          case "Stopwatch":
            return (
              <Timer key={timer.id}>
                <TimerTitle>#{index+1} {timer.type}</TimerTitle>
                <Stopwatch
                  id={timer.id}
                  duration={timer.duration.getTotalSeconds()}
                />
              </Timer>
            );

          case "Tabata":
            return (
              <Timer key={timer.id}>
                <TimerTitle>#{index+1} {timer.type}</TimerTitle>
                <Tabata
                  id={timer.id}
                  duration={timer.duration.getTotalSeconds()}
                  restTime={timer.restTime.getTotalSeconds()}
                  numRounds={timer.numRounds}
                />
              </Timer>
            );
          case "XY":
            return (
              <Timer key={timer.id}>
                <TimerTitle>#{index+1} {timer.type}</TimerTitle>
                <XY
                  id={timer.id}
                  duration={timer.duration.getTotalSeconds()}
                  numRounds={timer.numRounds}
                />
              </Timer>
            );
          default:
            return null;
        }
      })}
    </Timers>
  );
};

export default TimersView;