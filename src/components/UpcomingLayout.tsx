"use client";
import { ItemCard } from "@components";
import { useFetchShop } from "@hooks";
import type { Item } from "@types";

const UpcomingLayout = () => {
	const { data, error } = useFetchShop("upcoming");

	if (!data) {
		return (
			<span className="mt-6 text-center text-lg animate-pulse">
				loading upcoming
			</span>
		);
	}

	if (error) {
		console.error(error);
		return (
			<span>An error occurred, see console.</span>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-1">
				{Array.isArray(data) && data?.map((u: Item) => (
					<ItemCard
						key={u.id}
						data={u}
					/>
				))}
			</div>
		</>
	);
};

export default UpcomingLayout;
