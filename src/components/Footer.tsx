"use client";
import { Zap } from "lucide-react";
import Package from "../../package.json";

const Footer = () => {
	return (
		<footer className="m-2 p-3 flex flex-row justify-between items-center bg-neutral-900 rounded drop-shadow-lg">
			<p className="text-sm text-purple-400">v{Package.version}</p>
			<a href="https://nanos.club" target="norel noopen" className="w-fit py-1 px-2 flex flex-row gap-1 items-center bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
				<Zap size={15} className="fill-yellow-500 stroke-yellow-500" />
				<span className="text-sm">
					nanos.club
				</span>
			</a>
		</footer>
	);
};

export default Footer;
