import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Navigation, Footer } from "@components";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
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
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
