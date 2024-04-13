export interface Item {
	id: number;
	name: string;
	images: {
		icon: string;
		featured: string;
	};
	description: string;
	price: number;
	priceIcon: boolean;
	legoAssoc: string;
	rarity: string;
	readableType: string;
	history: {
		occurrences: number;
		firstSeen: string;
		lastSeen: string;
		dates: string[];
	};
	type: string;
	slug: string;
}

export interface ShopData {
	status: number;
	data?: Item[];
	daily?: Item[];
	featured?: Item[];
}
