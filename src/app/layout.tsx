import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Navigation, Footer } from "@components";

export const metadata: Metadata = {
	viewport: "width=device-width, initial-scale=1",
	themeColor: "#202225",
	colorScheme: "dark",
	title: "Fortnite Item Shop",
	icons: ["assets/fort.png"],
	description: "Fortnite item shop, resets everyday at 00:00 UTC.",
	openGraph: {
		type: "website",
		locale: "en_US",
		title: "Item Shop",
		description: "Fortnite item shop, resets everyday at 00:00 UTC.",
		url: "fn.nanos.club"
	}
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	);
}
