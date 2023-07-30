"use client";
import { useEffect, useState } from "react";
import type { ShopData } from "@types";

const useFetchData = (type: string) => {
	const [data, setData] = useState<ShopData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`https://fn.nanos.club/api/${type}`);
				const body = await response.json();
				setData(body.data);
			} catch (err) {
				setError((err as { message: string }).message);
			}
		})();
	});

	return { data, error };
};

export default useFetchData;
