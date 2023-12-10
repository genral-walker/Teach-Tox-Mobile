import { useRef, useState } from 'react';
import { View } from 'react-native';

const useElmDimension = () => {
    const elmRef = useRef<View | any>();

    const [elmDimensions, setElmDimensions] = useState<{
        width: number;
        height: number;
    }>();

    const getElmDimensions = () => {
        elmRef?.current?.measure((x: number, y: number, width: number, height: number) => {
            setElmDimensions({ width, height });
        });
    };

    return { elmRef, getElmDimensions, elmDimensions };
};

export default useElmDimension;
