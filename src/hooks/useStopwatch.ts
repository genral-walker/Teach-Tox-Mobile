import { useEffect, useState } from 'react';

const useStopwatch = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        intervalId = setInterval(() => setTime((prev) => prev + 1), 1000);

        return () => clearInterval(intervalId);
    }, [time]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return { seconds, minutes };
};

export default useStopwatch;
