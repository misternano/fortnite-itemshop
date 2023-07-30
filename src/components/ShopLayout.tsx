"use client";
import { Fragment } from "react";
import { useFetchData } from "@hooks";
import type { Item } from "@types";
import { ItemCard } from "@components";

const ShopLayout = ({ tab }: { tab: string }) => {
	const { data, error } = useFetchData("shop");

	if (!data) {
		return (
			<span className="mt-6 text-center text-lg animate-pulse">
				loading {tab}
			</span>
		);
	}

	if (error) {
		console.error(error);
		return (
			<span>An error occurred, see console.</span>
		);
	}

	switch (tab) {
		case "daily":
			return (
				<>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-1">
						{data?.daily?.map((d: Item) => (
							<ItemCard
								key={d.id}
								data={d}
							/>
						))}
					</div>
				</>
			);
		case "featured":
			return (
				<>
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-1">
						{data?.featured?.map((f: Item) => {
							return f.type !== "bundle" ?
								<ItemCard
									key={f.id}
									data={f}
								/>
								:
								<Fragment key={f.id} />
							;
						})}
					</div>
				</>
			);
		case "bundles":
			return (
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-1">
					{data?.featured?.map((b: Item) => {
						return b.type === "bundle" ?
							<ItemCard
								key={b.id}
								data={b}
							/>
							:
							<Fragment key={b.id} />
						;
					})}
				</div>
			);
		default:
			return <span>An error occurred, see console.</span>;
	}
};

export default ShopLayout;
