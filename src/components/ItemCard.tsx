/* eslint-disable camelcase */
"use client";
import { useState, useEffect } from "react";
import type { Item } from "@types";
import { useClickOutside } from "@hooks";
import { X } from "lucide-react";
import { DateTime } from "luxon";

export const rarityBackground: { [key: string]: string } = {
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

export const rarityText: { [key: string]: string } = {
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

export const readableRarity: { [key: string]: string } = {
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

const ItemCard = ({ data }: { data: Item }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const [progress, setProgress] = useState<number>(0);
	const intervalDuration = 7500;

	const alternatingColors: string[] = ["#262626", "#222222"];

	const toggleModal = () => {
		setIsOpen((prev) => !prev);
	};

	const modalRef = useClickOutside(() => {
		setIsOpen(false);
	});

	const outfitImages = [
		`https://image.fnbr.co/outfit/${data.id}/icon.png`,
		`https://image.fnbr.co/lego-outfit/${data.legoAssoc}/icon.png`
	];

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImageIndex(prevIndex => prevIndex === outfitImages.length - 1 ? 0 : prevIndex + 1);
		}, intervalDuration);
		return () => clearInterval(intervalId);
	}, [outfitImages.length]);

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
					<div title="Bundle" className="z-10 absolute w-7 h-7 top-2 right-2 p-1.5 bg-neutral-800/50 rounded-full backdrop-blur-sm">
						<svg fill="white" viewBox="0 0 16 16">
							<path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
						</svg>
					</div>
				}
				<div className={`${rarityBackground ? rarityBackground[data.rarity] : "rarity-common"} rounded-lg object-cover overflow-hidden`}>
					<img
						className="w-[200px] h-[200px] group-hover:scale-110 transition-transform"
						src={data.legoAssoc ? outfitImages[currentImageIndex] : data.images.icon} alt={`${data.name} ${data.readableType}`}
					/>
				</div>
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
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-5 h-5">
								<path fill="#FFFFFF" opacity="1.000000" stroke="none" d="
                                    M86.196671,117.332939
									C72.580940,122.128311 59.257168,122.531181 45.782448,118.043045
									C25.350933,111.237770 8.745368,88.909515 8.808174,67.467834
									C8.846189,54.490307 11.339722,42.579540 19.062965,32.265099
									C29.699253,18.060274 43.618565,9.634228 61.951965,8.879116
									C75.147232,8.335633 87.135788,11.240834 97.665581,19.032873
									C111.987617,29.631176 120.235649,43.633072 121.099289,61.876938
									C121.723389,75.060669 118.740158,86.993874 110.996635,97.607658
									C104.651253,106.305061 96.833160,113.318710 86.196671,117.332939
                                    M83.522491,43.000000
									C82.189728,43.000000 80.838440,43.142723 79.527748,42.972641
									C75.919724,42.504452 74.572548,43.850140 73.834549,47.605427
									C72.352463,55.147045 70.076180,62.541969 67.885567,69.925606
									C67.526115,71.137161 65.931671,71.982300 64.907997,72.996780
									C63.943565,71.920998 62.446793,70.992645 62.101391,69.745430
									C59.915958,61.854012 58.057724,53.872154 55.890438,45.975330
									C55.577217,44.834061 54.224560,43.187332 53.283756,43.139668
									C47.901775,42.867020 42.498882,43.007195 36.653522,43.007195
									C41.004066,57.371071 45.017414,71.048904 49.431118,84.596298
									C49.924294,86.110062 52.643677,87.751747 54.410667,87.846809
									C61.361870,88.220741 68.356522,87.763863 75.311455,88.101364
									C78.698814,88.265739 80.108521,86.709862 80.964218,83.996788
									C82.554848,78.953537 84.091850,73.892998 85.609077,68.827049
									C88.133438,60.398369 90.624588,51.959736 93.285736,43.000000
									C90.063293,43.000000 87.275429,43.000000 83.522491,43.000000
									z" />
							</svg>
							<span className="text-xl tracking-wider">
								{data.price}
							</span>
						</p>
					)}
				</div>
			</button>
			{isOpen &&
				<div className="fixed inset-0 h-full w-full bg-neutral-800/50 z-20">
					<div ref={modalRef}
					     className="w-[95%] sm:min-w-[400px] md:min-w-[700px] md:w-fit mx-auto p-6 pb-3 bg-neutral-800 border-2 border-[#202225] rounded-xl translate-y-10 md:translate-y-40">
						<button
							onClick={toggleModal}
							className="group absolute top-2 right-2 p-2 bg-neutral-700/50 hover:bg-neutral-700/75 rounded-full transition-colors"
						>
							<X size="16" className="group-hover:stroke-red-400" />
						</button>
						<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
							<aside>
								<div className="flex flex-col w-64 h-64 aspect-square">
									<img
									       className={`${rarityBackground ? rarityBackground[data.rarity] : "rarity-common"} w-[256px] h-[256px] rounded-lg`}
									       src={data.images.featured ? data.images.featured : data.images.icon}
									       alt={`${data.name} ${data.readableType}`}
									/>
								</div>
								{data.legoAssoc && (
									<div className="hidden md:block">
										<div className="flex py-1 items-center">
											<div className="flex-grow border-t-2 border-gray-400"></div>
											<span className="flex-shrink mx-2 text-gray-400">Available in LEGO</span>
											<div className="flex-grow border-t-2 border-gray-400"></div>
										</div>
										<div className="w-fit rounded-xl mx-auto">
											<img
												className={`${rarityBackground ? rarityBackground[data.rarity] : "rarity-common"} w-[128px] h-[128px] rounded-lg`}
												src={`https://image.fnbr.co/lego-outfit/${data.legoAssoc}/icon.png`}
												alt={`${data.name} LEGO ${data.readableType}`}
											/>
										</div>
									</div>
								)}
							</aside>
							<div className="w-full flex flex-col gap-6 justify-self-start">
								<div className="text-center md:text-left">
									<h3 className="text-2xl font-bold">
										{data.name}
									</h3>
									<div className="flex flex-row gap-2 items-center justify-center md:justify-start">
										{data.priceIcon && (
											<>
												<div className="flex flex-row gap-bullet items-center">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"
													     className="w-5 h-5">
														<path fill="#FFFFFF" opacity="1.000000" stroke="none" d="
                                                            M86.196671,117.332939
															C72.580940,122.128311 59.257168,122.531181 45.782448,118.043045
															C25.350933,111.237770 8.745368,88.909515 8.808174,67.467834
															C8.846189,54.490307 11.339722,42.579540 19.062965,32.265099
															C29.699253,18.060274 43.618565,9.634228 61.951965,8.879116
															C75.147232,8.335633 87.135788,11.240834 97.665581,19.032873
															C111.987617,29.631176 120.235649,43.633072 121.099289,61.876938
															C121.723389,75.060669 118.740158,86.993874 110.996635,97.607658
															C104.651253,106.305061 96.833160,113.318710 86.196671,117.332939
                                                            M83.522491,43.000000
															C82.189728,43.000000 80.838440,43.142723 79.527748,42.972641
															C75.919724,42.504452 74.572548,43.850140 73.834549,47.605427
															C72.352463,55.147045 70.076180,62.541969 67.885567,69.925606
															C67.526115,71.137161 65.931671,71.982300 64.907997,72.996780
															C63.943565,71.920998 62.446793,70.992645 62.101391,69.745430
															C59.915958,61.854012 58.057724,53.872154 55.890438,45.975330
															C55.577217,44.834061 54.224560,43.187332 53.283756,43.139668
															C47.901775,42.867020 42.498882,43.007195 36.653522,43.007195
															C41.004066,57.371071 45.017414,71.048904 49.431118,84.596298
															C49.924294,86.110062 52.643677,87.751747 54.410667,87.846809
															C61.361870,88.220741 68.356522,87.763863 75.311455,88.101364
															C78.698814,88.265739 80.108521,86.709862 80.964218,83.996788
															C82.554848,78.953537 84.091850,73.892998 85.609077,68.827049
															C88.133438,60.398369 90.624588,51.959736 93.285736,43.000000
															C90.063293,43.000000 87.275429,43.000000 83.522491,43.000000
															z" />
													</svg>
													<p>
														{data.price}
													</p>
												</div>
											</>
										)}
										<p>
											<span
												className={`${rarityText[data.rarity]}`}>{readableRarity[data.rarity]} </span>
											{data.readableType}
										</p>
									</div>
									{data.description && <p>{"\"" + data.description + "\""}</p>}
								</div>
								{data.history ?
									<div>
										<p>Occurrences: {data.history.occurrences}</p>
										<p>First
											Seen: {DateTime.fromISO(data.history.firstSeen).plus({ days: 1 }).toFormat("LLL d, yyyy")}</p>
										<p>Last
											Seen: {DateTime.fromISO(data.history.lastSeen).plus({ days: 1 }).toFormat("LLL d, yyyy")}</p>
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
															href={`https://fnbr.co/shop/${url.toLowerCase()}`}
															target="norel noopen"
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
						<a
							className="block pt-2 text-sm text-center text-purple-400 hover:text-purple-500 underline transition-colors"
							href={`https://fnbr.co/${data.type}/${data.slug}`} target="norel noopen"
						>
							browse on fnbr.co
						</a>
					</div>
				</div>
			}
		</>
	);
};

export default ItemCard;
