import React from "react";
import { useEffect, useState } from "react";
import Panel from "../generic/Panel";
import Timer from "../generic/Timer";
import { useTimerContext } from "../TimerContext";

const Countdown = (timer) => {
    const { currentTimerId, isWorkoutRunning, fastForward } = useTimerContext();

    const [currentTime, setCurrentTime] = useState(timer.duration);

    useEffect(() => {
        let timerInterval;
        if (isWorkoutRunning && currentTimerId === timer.id) {
            console.log("Workout is running for timer " + timer.id);
            if (currentTime > 0) {
                timerInterval = setInterval(() => {
                    setCurrentTime((prevTime) => {
                        if (prevTime > 0) {
                            return prevTime - 1;
                        } else {
                            fastForward();
                            return prevTime;
                        }
                    });
                }, 1000);
            } else {
                fastForward();
            }
        } else {
            clearInterval(timerInterval);
        }

        return () => clearInterval(timerInterval);
    }, [timer, isWorkoutRunning, currentTimerId, currentTime, fastForward]);


    return (
      <Panel>
          <Timer
            currentTime={currentTime}
          />
      </Panel>
    );
};

export default Countdown;
