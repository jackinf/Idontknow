export function logDevMessage(...params: any[]) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(...params);
    }
}
