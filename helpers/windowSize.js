import { useState, useEffect, Fragment } from 'react';

let w = {};

if (process.browser) {
    // client-side-only code
    w = window;
}

export default (props) => {
    const { onResize } = props;

    const getSize = () => {
        const size = {
            width: w.innerWidth || 0,
            height: w.innerHeight || 0
        };
        if (onResize) onResize(size);
        return size;
    };

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getSize());
        };

        w.addEventListener('resize', handleResize);
        return () => w.removeEventListener('resize', handleResize);
    }, []);

    return <Fragment />;
};
