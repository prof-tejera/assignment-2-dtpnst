import React from 'react';
import Panel from '../generic/Panel';
import DisplayTime from '../generic/DisplayTime';
import DisplayRound from '../generic/DisplayRound';
import styled from "styled-components";


//icons imported following this answer: https://stackoverflow.com/questions/69559558/how-do-i-use-font-awesome-icon-in-react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRotateLeft, faForward } from '@fortawesome/free-solid-svg-icons';

// style inspiration came from this image: https://www.istockphoto.com/vector/digital-stopwatch-icon-on-transparent-background-gm1284117436-381353450


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

const TimerContainer = styled.div`
    background-color: #4f635d;
    width: 175px;
    padding: 20px;
    padding-bottom: 50px;
    border: 20px;
    border-style: solid;
    border-color: #fcba03;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 100px;
    border-bottom-right-radius: 100px;
`;


const Timer = ({
  currentTime,
  currentRound,
  handleStartStopClick,
  handleResetClick,
  handleFastForwardClick,
  isRunning,
}) => {

  

  return (
    <Panel>
        <TimerContainer>
            <DisplayTime value={currentTime} />
            <div style={buttonContainerStyle}>
                <FontAwesomeIcon icon={isRunning ? faPause : faPlay} style={buttonStyle} onClick={handleStartStopClick}/>
                <FontAwesomeIcon icon={faRotateLeft} style={resetButtonStyle} onClick={handleResetClick}/>
                <FontAwesomeIcon icon={faForward} style={buttonStyle} onClick={handleFastForwardClick} />
            </div>
        </TimerContainer>
        {currentRound !== undefined && <DisplayRound value={currentRound} />}
    </Panel>
  );
};

export default Timer;