"use client";
import { ShopLayout } from "@components";
import { useFetchData } from "@hooks";

const Home = () => {
	const { data } = useFetchData("shop");

	return (
		<>
			{data?.featured?.length !== 0 ? (
				<div className="w-[90%] mx-auto my-6 flex flex-col gap-12">
					<ShopLayout />
				</div>
			) : (
				<div className="mt-[35vh] mb-[55vh] grid place-items-center">
					<h1 className="font-burbank text-xl">No, really. The shop is empty.</h1>
					<div className="flex flex-row gap-2">
						<a href="https://status.epicgames.com/" target="norel noopen" className="text-lg text-purple-400 hover:text-purple-500 underline transition-colors">Fortnite Status</a>
						<div className="h-1/2 w-0.5 my-auto bg-neutral-500 rounded-full text-xs">&nbsp;</div>
						<a href="https://x.com/fortnitestatus/" target="norel noopen" className="text-lg text-purple-400 hover:text-purple-500 underline transition-colors">Twitter</a>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
