import React, { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';

function CountDown() {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  useEffect(() => {
    let today = new Date();
    let tom = new Date();
    tom.setDate(today.getDate() + 1); // tomoorrow
    tom.setHours(0, 0, 0);

    let diffMs = tom.getTime() - today.getTime();

    let diffSeconds = Math.floor(diffMs / 1000);
    let diffMinutes = Math.floor(diffSeconds / 60);
    let diffHours = Math.floor(diffMinutes / 60);

    diffSeconds = diffSeconds % 60;
    diffMinutes = diffMinutes % 60;

    console.log(diffHours, diffMinutes, diffSeconds);

    setSeconds(diffSeconds);
    setMinutes(diffMinutes);
    setHours(diffHours);
  }, [])

  useEffect(() => {
    if (seconds != 0 || hours != 0 || minutes != 0) {
        const timer = setInterval(() => {
                if (seconds === 0) {
                    setSeconds(59);
                    if (minutes > 0) {
                        setMinutes(minutes - 1);
                    } else if (hours > 0) {
                        setMinutes(59);
                        setHours(hours - 1);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
        }, 1000);
        return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <div>
        <Heading size='md'>
            {hours.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
            })}:{minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2
            })}:{seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2
            })}
        </Heading>
    </div>
  )
}

export default CountDown