"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Calendar, RotateCw, ShoppingCart } from "lucide-react";
import { DateTime } from "luxon";

const Navigation = () => {
	const pathname = usePathname();
	const [countdown, setCountdown] = useState<string>("00:00");

	const getTime = (): (string | number)[] => {
		const hour: string = DateTime.utc().toFormat("HH");
		const minute: string = DateTime.utc().toFormat("mm");
		const second: string = DateTime.utc().toFormat("ss");
		const hourReset: number = Math.abs(23 - Number(hour));
		const minuteReset: number = Math.abs(59 - Number(minute));
		const secondReset: number = Math.abs(60 - Number(second));
		if (hourReset < 1)
			return [String(minuteReset).padStart(2, "0"), String(secondReset).padStart(2, "0")];
		return [hourReset, String(minuteReset).padStart(2, "0"), String(secondReset).padStart(2, "0")];
	};

	useEffect(() => {
		setCountdown(getTime().join(":"));
		const interval = setInterval((() => {
			setCountdown(getTime().join(":"));
			if (countdown === "00:01")
				window.location.reload();
			return countdown;
		}), 1000);

		return () => clearInterval(interval);
	}, [countdown]);

	return (
		<nav className="grid md:grid-cols-3 grid-cols-2 items-center m-2 p-3 text-center bg-neutral-900 rounded drop-shadow-lg">
			<p className="order-1 flex flex-row gap-1 items-center justify-self-start bg-neutral-800 py-1 px-2 rounded">
				<RotateCw size={15} className="stroke-purple-400" />
				<span className="text-sm">
					{countdown}
				</span>
			</p>
			<h1 className="hidden md:block order-2 text-xl justify-self-end md:justify-self-center">
				{DateTime.utc().toFormat("MMMM dd, yyyy")}
			</h1>
			<a href={pathname === "/" ? "/upcoming" : "/"} className="py-1 px-2 flex flex-row gap-1 items-center bg-neutral-800 rounded hover:bg-neutral-700 transition-colors order-3 justify-self-end">
				{pathname === "/" ?
					<Calendar size={15} className="stroke-purple-400" />
					:
					<ShoppingCart size={15} className="stroke-purple-400" />
				}
				<span className="text-sm">
					{pathname === "/" ? "Upcoming" : "Shop"}
				</span>
			</a>
		</nav>
	);
};

export default Navigation;
