import NProgress from "nprogress";
import {
    useCallback,
    useState
} from "react";

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = useCallback(() => {
        setIsLoading(true);
        NProgress.start();
    }, []);

    const stopLoading = useCallback(() => {
        setIsLoading(false);
        NProgress.done();
    }, []);

    const withLoading = useCallback(
        async (asyncFunction) => {
                try {
                    startLoading();
                    const result = await asyncFunction();
                    return result;
                } catch (error) {
                    throw error;
                } finally {
                    stopLoading();
                }
            },
            [startLoading, stopLoading]
    );

    return {
        isLoading,
        startLoading,
        stopLoading,
        withLoading,
    };
};