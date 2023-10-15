import { useCallback, useRef } from "react";

export default function useDebouncedCallback(cb: Function, delay = 1000) {
	const timeout = useRef<any>();

	return useCallback(
		(...args: any[]) => {
			timeout.current && clearTimeout(timeout.current);

			timeout.current = setTimeout(
				() => {
					cb(...args);
				},
				timeout.current ? delay : 0
			);
		},
		[cb, delay]
	);
}
