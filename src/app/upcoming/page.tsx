import { UpcomingLayout } from "@components";

const Upcoming = () => {
	return (
		<>
			<div className="w-[90%] mx-auto my-6">
				<section className="flex flex-col gap-4 justify-center items-center">
					<h2 className="w-full p-1 text-center bg-neutral-900 rounded drop-shadow">
						Upcoming Items
					</h2>
					<UpcomingLayout />
				</section>
			</div>
		</>
	);
};

export default Upcoming;
