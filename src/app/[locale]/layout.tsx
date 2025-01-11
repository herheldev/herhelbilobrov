import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { getMessages, getRequestConfig } from "next-intl/server";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { app } from "@/bd/firebase";
import { getDocs, getFirestore, doc, collection } from "firebase/firestore";
import { headers } from "next/headers";
import Head from "next/head";
import ProggresAdminBar from "@/components/ProggresAdminBar/ProggresAdminBar";

async function getData(locale) {
  const spotObg: any = {};
  const bd = getFirestore(app);
  const headerRef = await getDocs(collection(bd, "seo"));
  headerRef.forEach((doc) => {
    switch (doc.id) {
      case "en":
        spotObg.en = doc.data();
        break;
      case "pl":
        spotObg.pl = doc.data();
        break;
      case "uk":
        spotObg.uk = doc.data();
        break;
    }
  });
  return spotObg[locale];
}


const garamondMedium = localFont({
  src: "../../font/CormorantGaramond-Medium.woff2",
  display: "swap",
  variable: "--font-garamondMedium",
});
const garamondBold = localFont({
  src: "../../font/CormorantGaramond-Bold.woff2",
  display: "swap",
  variable: "--font-garamondBold",
});
const garamondRegular = localFont({
  src: "../../font/CormorantGaramond-Regular.woff2",
  display: "swap",
  variable: "--font-garamondRegular",
});
const garamondLight = localFont({
  src: "../../font/CormorantGaramond-Light.woff2",
  variable: "--font-garamondLight",
  display: "swap",
});
const montseratBold = localFont({
  src: "../../font/Montserrat-Bold.woff2",
  display: "swap",
  variable: "--font-montseratBold",
});
const montseratMedium = localFont({
  src: "../../font/Montserrat-Medium.woff2",
  variable: "--font-montseratMedium",
  display: "swap",
});
const montseratRegular = localFont({
  src: "../../font/Montserrat-Regular.woff2",
  variable: "--font-montseratRegular",
  display: "swap",
});
const montseratSemiBold = localFont({
  src: "../../font/Montserrat-SemiBold.woff2",
  display: "swap",
  variable: "--font-montseratSemiBold",
});
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = await (await headers()).get("X-NEXT-INTL-LOCALE")
  const data = await getData(locale);

  return {
    title: data?.Title || "Default Title",
    description: data?.Description || "Default Description",
    keywords: data?.Keywords || "default, keywords",
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    openGraph: {
      title: data?.Title,
      description: data?.Description,
      images: [{ url: "https://www.herhel.pl/img/og.svg" }],
    },
  };
}
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = await (await headers()).get("X-NEXT-INTL-LOCALE");
  const messages = await getMessages();
  const metadata = await generateMetadata({ params });

  return (
    <html
      lang={locale}
      className={`${montseratMedium.variable} ${montseratSemiBold.variable}${montseratBold.variable} ${montseratRegular.variable} ${garamondMedium.variable} ${garamondBold.variable} ${garamondLight.variable} ${garamondRegular.variable}`}
    >
      <Head>

        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:description" content={metadata.description}></meta>
        <meta
          property="og:image"
          content={metadata.openGraph.images[0].url}
        ></meta>
        <meta property="og:title" content={metadata.openGraph.title}></meta>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </Head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
