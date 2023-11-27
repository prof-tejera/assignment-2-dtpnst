import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import TimeInput from "../generic/TimeInput";
import Duration from "../generic/Duration";
import Timer from "../generic/Timer";

const Stopwatch = () => {

    const [currentTime, setCurrentTime] = useState(0);
    const [endTime, setEndTime] = useState(new Duration(0, 0, 0));
    const [isRunning, setIsRunning] = useState(false);

    const handleStartStopClick = () => {
        setIsRunning(!isRunning);
    }

    const handleResetClick = () => {
        setCurrentTime(0);
    }

    const handleFastForwardClick = () => {
        setCurrentTime(endTime.getTotalSeconds());
        setIsRunning(false);
    }

    const handleEndTimeChange = (newEndTime) => {
        setEndTime(new Duration(newEndTime.hours, newEndTime.minutes, newEndTime.seconds));
    };

    useEffect(() => {
        let timerId;
        if (isRunning) {
          if (currentTime < endTime.getTotalSeconds()) {
            timerId = setInterval(() => {
              setCurrentTime((prevTime) => prevTime + 1); 
            }, 1000);
          } else {
            setIsRunning(false);
          }
        } else {
          clearInterval(timerId);
        }
    
        return () => clearInterval(timerId);
      }, [isRunning, currentTime, endTime]);
    
    

    return (
        <Panel>
            <Timer
                currentTime={currentTime}
                handleStartStopClick={handleStartStopClick}
                handleResetClick={handleResetClick}
                handleFastForwardClick={handleFastForwardClick}
                isRunning={isRunning}
            />
            <TimeInput label="Time" duration={endTime} onTimeChange={handleEndTimeChange} />   
        </Panel>
    );


};

export default Stopwatch;
