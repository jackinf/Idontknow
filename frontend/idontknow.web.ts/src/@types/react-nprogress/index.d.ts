declare module 'react-nprogress' {
    interface NProgress {
        start(): void;

        done(): void;
    }

    const nprogress: NProgress;

    export default nprogress;
}