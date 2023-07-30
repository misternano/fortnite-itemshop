"use client";
import { useEffect, useRef } from "react";

type ClickOutsideHandler = () => void;

const useClickOutside = (handler: ClickOutsideHandler) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const maybeHandler = (event: MouseEvent) => {
			if (modalRef.current && event.target instanceof Node && !modalRef.current.contains(event.target))
				handler();
		};

		document.addEventListener("mousedown", maybeHandler);
		return () => document.removeEventListener("mousedown", maybeHandler);
	}, [handler]);

	return modalRef;
};

export default useClickOutside;
