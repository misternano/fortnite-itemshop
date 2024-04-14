"use client";
import { useFetchShop } from "@hooks";
import type { Item, Sections } from "@types";
import { ItemCard } from "@components";

const ShopLayout = () => {
	const { data, error } = useFetchShop("shop");

	if (!data) {
		return (
			<span className="mt-6 text-center text-lg animate-pulse">
				loading
			</span>
		);
	}

	if (error) {
		console.error(error);
		return (
			<span>An error occurred, see console.</span>
		);
	}

	const filterItemsBySection = (sectionKey: string) => {
		const section = data.sections?.find((s: Sections) => s.key === sectionKey);
		if (!section) return [];
		return data.featured?.filter((item: Item) => section.items.includes(item.id));
	};

	return (
		<>
			{data.sections
				?.sort((a,b) => a.sortOrder + b.sortOrder)
				?.map((s: Sections) => (
					<section key={s.key} id={s.key}>
						<h2 className="mb-2 p-1 text-center bg-neutral-900 rounded drop-shadow text-xl">
							{s.displayName}
						</h2>
						<div className="grid grid-cols-2 sm:flex flex-row flex-wrap justify-evenly gap-1">
							{filterItemsBySection(s.key)?.map((f: Item) => (
								<ItemCard
									key={f.id}
									data={f}
								/>
							))}
						</div>
					</section>
				))}
		</>
	);
};

export default ShopLayout;
