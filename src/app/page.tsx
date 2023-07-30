import { ShopLayout } from "@components";

const Home = () => {
	return (
		<>
			<div className="w-[90%] mx-auto my-6 flex flex-col gap-12">
				<section className="flex flex-col gap-4 justify-center items-center">
					<h2 className="w-full p-1 text-center bg-neutral-900 rounded drop-shadow">
						Daily
					</h2>
					<ShopLayout tab="daily" />
				</section>
				<section className="flex flex-col gap-4 justify-center items-center">
					<h2 className="w-full p-1 text-center bg-neutral-900 rounded drop-shadow">
						Featured
					</h2>
					<ShopLayout tab="featured" />
				</section>
				<section className="flex flex-col gap-4 justify-center items-center">
					<h2 className="w-full p-1 text-center bg-neutral-900 rounded drop-shadow">
						Bundles
					</h2>
					<ShopLayout tab="bundles" />
				</section>
			</div>
		</>
	);
};

export default Home;
