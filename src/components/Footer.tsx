"use client";
import { Zap } from "lucide-react";
import Package from "../../package.json";

const Footer = () => {
	return (
		<footer className="m-2 p-3 grid grid-cols-3 items-center bg-neutral-900 text-sm rounded drop-shadow-lg">
			<p className="text-purple-400">v{Package.version}</p>
			<span className="justify-self-center">
				api by <a href="https://fnbr.co" target="norel noopen" className="text-center text-purple-400 hover:text-purple-500 underline transition-colors">fnbr.co</a>
			</span>
			<a href="https://nanos.club" target="norel noopen" className="justify-self-end w-fit py-1 px-2 flex flex-row gap-1 items-center bg-neutral-800 rounded hover:bg-neutral-700 transition-colors">
				<Zap size="15" className="fill-yellow-500 stroke-yellow-500" />
				<span>
					nanos.club
				</span>
			</a>
		</footer>
	);
};

export default Footer;
