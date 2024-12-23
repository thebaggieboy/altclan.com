import { useRouter } from 'next/router';
import { useRef } from 'react';

const usePreviousRoute = () => {
    const router = useRouter();

    const ref = useRef(null);

    router.events?.on('routeChangeStart', () => {
        ref.current = router.asPath;
    });

    return ref.current;
};

export default usePreviousRoute