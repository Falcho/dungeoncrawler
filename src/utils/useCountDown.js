import { useState, useEffect, useRef } from "react";

export default function useCountdown(initialSeconds, onComplete) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeLeft(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (onComplete) onComplete();
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    if (onComplete) onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [onComplete, timeLeft]);

    return timeLeft;
}
