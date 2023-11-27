import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import TimeInput from "../generic/TimeInput";
import Duration from "../generic/Duration";
import Input from "../generic/Input";
import Timer from "../generic/Timer";

const XY = () => {
    const [currentTime, setCurrentTime] = useState(0); 
    const [countdownAmount, setCoundownAmount] = useState(new Duration(0, 0, 0)); 
    const [numRounds, setNumRounds] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const handleStartStopClick = () => {
        if(!isRunning && !isPaused) {
            setCurrentTime(countdownAmount.getTotalSeconds());
            setCurrentRound(1);
        }

        if(isRunning) {
            setIsPaused(true)
        }
        
        setIsRunning(!isRunning);
        
    }

    const handleResetClick = () => {
        setCurrentTime(countdownAmount.getTotalSeconds());
        setCurrentRound(1);
    }

    const handleFastForwardClick = () => {
        setCurrentTime(countdownAmount.getTotalSeconds());
        setCurrentRound((prevRound) => prevRound +1);
    }

    const handleCountdownAmountChange = (newCountdownAmount) => {
        setCoundownAmount(new Duration(newCountdownAmount.hours, newCountdownAmount.minutes, newCountdownAmount.seconds));
    };

    const handleNumRoundsChange = (newNumRounds) => {
        setNumRounds(newNumRounds)
    }

    useEffect(() => {
        let timerId;
        if (isRunning) {
            if (currentTime > 0) {
                timerId = setInterval(() => {
                    setCurrentTime((prevTime) => prevTime - 1);
                }, 1000);
            } else if (currentRound < numRounds) {
                setCurrentTime(countdownAmount.getTotalSeconds());
                setCurrentRound((currentRound) => currentRound + 1);
            } else {
                setIsRunning(false);
            }
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [isRunning, currentTime, countdownAmount, currentRound, numRounds]);

    return (
        <Panel>
            <Timer 
                currentTime={currentTime}
                currentRound={currentRound}
                handleStartStopClick={handleStartStopClick}
                handleResetClick={handleResetClick}
                handleFastForwardClick={handleFastForwardClick}
                isRunning={isRunning}
            />
            <TimeInput label="Time Per Round" duration={countdownAmount} onTimeChange={handleCountdownAmountChange} />
            <Input label="# of Rounds" type="number" min="0"  onChange={handleNumRoundsChange}/>  
        </Panel>
    );
};

export default XY;
