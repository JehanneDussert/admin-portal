"use client";
import React, { useEffect, useState } from 'react'
import { Card } from "@codegouvfr/react-dsfr/Card";
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_NAME } from '../src/components/constants';
import { Product } from '../src/components/interface';
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		fetch(GET_PRODUCTS_BY_NAME + `?product_name=${query}`)
		.then(res => res.json())
		.then(data => setProducts(data));
	}, [query])

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e);
  }

    return (
        <div className='fr-container fr-my-4w'>
			<SearchBar onButtonClick={handleSearch}/>
            <div className="fr-grid-row fr-grid-row--gutters fr-my-2w">
			{products && products.map((product, index) => (
                <div className='fr-col-4' key={index}>
                    <Card
                        background
                        border
                        desc={product.desc}
                        footer={<ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg"><li><button className="fr-btn">Modifier</button></li><li><button className="fr-btn fr-btn--secondary">Supprimer</button></li></ul>}
                        imageAlt="texte alternatif de l’image"
                        imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
                        linkProps={{
                        href: `/products/${index}`
                        }}
                        size="medium"
                        title={product.title}
                        titleAs="h3"
                    />
                </div>
            ))}
            </div>
            {/* SET PAGINATION */}
        </div>
    )
}