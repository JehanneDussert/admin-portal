"use client";

import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { StartDsfr } from "./StartDsfr";
import { defaultColorScheme } from "./defaultColorScheme";
import Link from "next/link";
import { Header } from "@codegouvfr/react-dsfr/Header";
import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { GET_PRODUCTS_BY_NAME } from "../src/components/constants";
import { useEffect, useState } from "react";
import { Product } from "../src/components/interface";

export default function RootLayout({ children }: { children: JSX.Element; }) {
  const lang = "fr";
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // GET PRODUCTS BY NAME
    // fetch
    console.log('ici: ', e);
    fetch(GET_PRODUCTS_BY_NAME + `?product_name=${e}`)
		.then(res => res.json())
		.then(data => setProducts(data));
  }

  useEffect(() => {
    console.log('ici products: ', products)
  }, [products])

  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })} >
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} />
      </head>
      <body>
        <Header
        // TODO: change
            brandTop={<>INTITULE<br />OFFICIEL</>}
            homeLinkProps={{
                href: '/',
                title: 'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)'
            }}
            serviceTagline="Test technique"
            id="fr-header-with-uncontrolled-search-bar"
            onSearchButtonClick={handleSearch}
            serviceTitle="Direction générale des Finances publiques (DGFiP)"
        />
        <DsfrProvider lang={lang}>
          {children}
        </DsfrProvider>
        <Footer
            accessibility="fully compliant"
            contentDescription="
                Ce message est à remplacer par les informations de votre site.

                Comme exemple de contenu, vous pouvez indiquer les informations 
                suivantes : Le site officiel d’information administrative pour les entreprises.
                Retrouvez toutes les informations et démarches administratives nécessaires à la création, 
                à la gestion et au développement de votre entreprise.
                "
        />
      </body>
    </html>
  );
}