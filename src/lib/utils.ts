import { EffectCallback, useEffect, useRef } from "react";

const UINT32_MASK = 2 ** 32 - 1;

// https://stackoverflow.com/questions/664014/what-integer-hash-function-are-good-that-accepts-an-integer-hash-key/12996028#12996028
export function hash(state: number) {
    state = ((state >> 16) ^ state) * 0x45d9f3b;
    state = ((state >> 16) ^ state) * 0x45d9f3b;
    state = (state >> 16) ^ state;
    return state;
}

export function hashRange(state: number, min: number, max: number) {
    return (hash(state) % (max - min)) + min;
}

// Returns a number between 0 and 1
export function hashFloat(state: number) {
    return hash(state) / 0x7fff_ffff;
}

export function hashFloatRange(state: number, min: number, max: number) {
    return hashFloat(state) * (max - min) + min;
}

export function useDebounce(
    fn: EffectCallback,
    dep: unknown,
    debounceInterval: number
) {
    const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );

    useEffect(() => {
        if (timerId.current !== undefined) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(fn, debounceInterval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceInterval, fn, dep]);
}
