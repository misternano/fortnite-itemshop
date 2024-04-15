/* eslint-disable camelcase */
"use client";
import Image from "next/image";
import { FC, useState, useEffect } from "react";
import type { Item } from "@types";
import { useClickOutside } from "@hooks";
import { X } from "lucide-react";
import { DateTime } from "luxon";
import vbucks from "../assets/images/vbuck.svg";
import placeholder from "../assets/images/placeholder.jpg";

const ItemCard: FC<{ data: Item }> = ({ data }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const intervalDuration = 7500;

	const rarityBackground: { [key: string]: string } = {
		common: "bg-common",
		uncommon: "bg-uncommon",
		rare: "bg-rare",
		epic: "bg-epic",
		legendary: "bg-legendary",
		frozen: "bg-frozen",
		lava: "bg-lava",
		dark: "bg-dark",
		marvel: "bg-marvel",
		dc: "bg-dc",
		slurp: "bg-slurp",
		shadow: "bg-shadow",
		star_wars: "bg-starwars",
		gaming_legends: "bg-gaming",
		icon_series: "bg-icon",
		lamborghini: "bg-lamborghini",
		mclaren: "bg-mclaren"
	};

	const rarityText: { [key: string]: string } = {
		common: "text-common",
		uncommon: "text-uncommon",
		rare: "text-rare",
		epic: "text-epic",
		legendary: "text-legendary",
		frozen: "text-frozen",
		lava: "text-lava",
		dark: "text-dark",
		marvel: "text-marvel",
		dc: "text-dc",
		slurp: "text-slurp",
		shadow: "text-shadow",
		star_wars: "text-starwars",
		gaming_legends: "text-gaming",
		icon_series: "text-icon",
		lamborghini: "text-lamborghini",
		mclaren: "text-mclaren"
	};

	const readableRarity: { [key: string]: string } = {
		common: "Common",
		uncommon: "Uncommon",
		rare: "Rare",
		epic: "Epic",
		legendary: "Legendary",
		frozen: "Frozen",
		lava: "Lava",
		dark: "Dark",
		marvel: "Marvel",
		dc: "DC",
		slurp: "Slurp",
		shadow: "Shadow",
		star_wars: "Star Wars",
		gaming_legends: "Gaming Legends",
		icon_series: "Icon Series",
		lamborghini: "Lamborghini",
		mclaren: "McLaren"
	};

	const alternatingColors: string[] = ["#262626", "#222222"];

	const toggleModal = () => {
		setIsOpen((prev) => !prev);
	};

	const modalRef = useClickOutside(() => {
		setIsOpen(false);
	});

	const images = [
		`https://image.fnbr.co/outfit/${data.id}/icon.png`,
		`https://image.fnbr.co/lego-outfit/${data.legoAssoc}/icon.png`
	];

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImageIndex(prevIndex => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
		}, intervalDuration);
		return () => clearInterval(intervalId);
	}, [images.length]);

	useEffect(() => {
		const steps = intervalDuration / 100;
		let step = 0;
		const intervalId = setInterval(() => {
			step += 1;
			setProgress((step / steps) * 100);
			if (step >= steps) step = 0;
		}, 100);

		return () => clearInterval(intervalId);
	}, [currentImageIndex]);

	if (data.type === "lego-outfit") return null;

	return (
		<>
			<button onClick={toggleModal} className="group p-1 rounded-xl hover:saturate-[125%] hover:outline relative overflow-hidden">
				{data.type === "bundle" &&
					<div title="Bundle" className="absolute w-7 h-7 top-2 right-2 p-1.5 bg-neutral-800/50 rounded-full backdrop-blur-sm">
						<svg fill="white" viewBox="0 0 16 16">
							<path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
						</svg>
					</div>
				}
				<Image
					className={`${rarityBackground ? rarityBackground[data.rarity] : "rarity-common"} rounded-lg object-cover`}
					src={data.legoAssoc ? images[currentImageIndex] : data.images.icon ? data.images.icon : placeholder} alt={`${data.name} ${data.readableType}`} width={200} height={200} priority
				/>
				{data.legoAssoc && (
					<>
						<div
							className="absolute bottom-2 left-3 right-3 h-1 rounded-xl bg-white z-10"
							style={{ width: `calc(${progress}% - 24px)` }}
						/>
						<div className="absolute top-2 left-2 w-[calc(100%-16px)]">
							<div className="w-fit mx-auto p-1.5 px-2 rounded-full flex flex-row gap-2 justify-center bg-neutral-800/25 backdrop-blur">
								<div className={`${currentImageIndex === 0 ? "bg-white border-2 border-transparent" : "bg-transparent border-2 border-white"} w-2.5 h-2.5 rounded-full transition-all`} />
								<div className={`${currentImageIndex === 1 ? "bg-white border-2 border-transparent" : "bg-transparent border-2 border-white"} w-2.5 h-2.5 rounded-full transition-all`} />
							</div>
						</div>
					</>
				)}
				<div className="w-[calc(100%-8px)] absolute bottom-1 left-0 translate-x-[4px] transition-all bg-neutral-800/50 group-hover:bg-neutral-800/25 rounded-b-lg">
					<h3 className={`${data.name.length > 16 && "animate-marquee"} ${!data.priceIcon && "mb-2"} mt-1 px-2 text-2xl text-center whitespace-nowrap leading-tight`}>
						{data.name}
					</h3>
					{data.priceIcon && (
						<p className="group-hover:opacity-0 group-hover:-translate-y-5 group-hover:-mb-5 transition-all mb-2 flex flex-row gap-1 items-center justify-center">
							<Image className="w-5 h-5" src={vbucks} alt="vBucks" />
							<span className="text-xl tracking-wider">
								{data.price}
							</span>
						</p>
					)}
				</div>
			</button>
			{isOpen &&
				<div className="fixed inset-0 h-full w-full bg-neutral-800/50 z-20">
					<div ref={modalRef} className={`md:min-w-[700px] sm:min-w-[400px] w-[95%] md:w-fit mx-auto p-6 ${data.legoAssoc && "md:pb-8"} bg-neutral-800 border-2 border-[#202225] rounded translate-y-10 md:translate-y-40`}>
						<button
							onClick={toggleModal}
							className="group absolute top-2 right-2 p-2 bg-neutral-700/50 hover:bg-neutral-700/75 rounded-full transition-colors"
						>
							<X size="16" className="group-hover:stroke-red-400" />
						</button>
						<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
							<div className="flex flex-col w-64 h-64 aspect-square">
								<Image
									className={`${rarityBackground ? rarityBackground[data.rarity] : "rarity-common"} rounded-lg`} width={256} height={256} priority
									src={data.images ? data.images.featured ? data.images.featured : data.images.icon : placeholder} alt={`${data.name} ${data.readableType}`}
								/>
								{data.legoAssoc ? (
									<div className="hidden md:block">
										<div className="flex py-1 items-center">
											<div className="flex-grow border-t-2 border-gray-400"></div>
											<span className="flex-shrink mx-2 text-gray-400">Available in LEGO</span>
											<div className="flex-grow border-t-2 border-gray-400"></div>
										</div>
										<div className="w-fit rounded-xl mx-auto">
											<Image
												className={`${rarityBackground ? rarityBackground[data.rarity] : "rarity-common"} rounded-lg`}
												width={128} height={128}
												src={`https://image.fnbr.co/lego-outfit/${data.legoAssoc}/icon.png`} alt={`${data.name} LEGO ${data.readableType}`}
											/>
										</div>
									</div>
								) : null}
								<a
									className="text-sm text-center text-purple-400 hover:text-purple-500 underline transition-colors"
									href={`https://fnbr.co/${data.type}/${data.slug}`} target="norel noopen"
								>
									browse on fnbr.co
								</a>
							</div>
							<div className="w-full flex flex-col gap-6 justify-self-start md:mt-0 mt-6">
								<div className="text-center md:text-left">
									<h3 className="text-2xl font-bold">
										{data.name}
									</h3>
									<div className="flex flex-row gap-2 items-center justify-center md:justify-start">
										{data.priceIcon && (
											<>
												<div className="flex flex-row gap-bullet items-center">
													<Image className="w-5 h-5" src={vbucks} alt="vBucks" />
													<p>
														{data.price}
													</p>
												</div>
											</>
										)}
										<p>
											<span className={`${rarityText[data.rarity]}`}>{readableRarity[data.rarity]} </span>
											{data.readableType}
										</p>
									</div>
									{data.description && <p>{"\"" + data.description + "\""}</p>}
								</div>
								{data.history ?
									<div>
										<p>Occurrences: {data.history.occurrences}</p>
										<p>First Seen: {DateTime.fromISO(data.history.firstSeen).plus({ days: 1 }).toFormat("LLL d, yyyy")}</p>
										<p>Last Seen: {DateTime.fromISO(data.history.lastSeen).plus({ days: 1 }).toFormat("LLL d, yyyy")}</p>
										<div className="mr-4 p-1 px-2 grid grid-cols-2 gap-12 bg-neutral-900 font-bold">
											<p>Date</p>
											<p>Days Ago</p>
										</div>
										<div className="max-h-32 md:max-h-52 overflow-y-scroll">
											{data.history?.dates.sort().reverse().map((h: string, index: number) => {
												const url = DateTime.fromISO(h, { zone: "utc" }).toFormat("MMMM-dd-yyyy");
												const date = DateTime.utc().toFormat("yyyy MM dd");
												const since = DateTime.fromISO(h, { zone: "utc" }).toFormat("yyyy MM dd");
												const diff = Math.floor(Number(DateTime.fromFormat(date, "yyyy MM dd").diff(DateTime.fromFormat(since, "yyyy MM dd"), "days").toObject().days));
												return (
													<div
														key={index}
														className="grid grid-cols-2 gap-12 p-1 px-2"
														style={{ backgroundColor: alternatingColors[index % alternatingColors.length] }}
													>
														<a
															href={`https://fnbr.co/shop/${url.toLowerCase()}`} target="norel noopen"
															className="flex flex-col text-purple-400 hover:text-purple-500 underline transition-colors"
														>
															{DateTime.fromISO(h, { zone: "utc" }).toFormat("MMMM d, yyyy")}
														</a>
														<p>
															{diff <= 0 ? "Today" : diff}
														</p>
													</div>
												);
											})}
										</div>
									</div>
									:
									<p>No history data available.</p>
								}
							</div>
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default ItemCard;
