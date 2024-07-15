"use client";
import React, { useEffect, useState } from 'react'
import { Card } from "@codegouvfr/react-dsfr/Card";
import { GET_ALL_PRODUCTS } from '../src/components/constants';

export default function Home() {
    const [products, setProducts] = useState([]);
	
	useEffect(() => {
		fetch(GET_ALL_PRODUCTS)
		.then(res => res.json())
		.then(data => setProducts(data));
	}, [])

	useEffect(() => {
		console.log('prod: ', products)
	}, [products])

    return (
        <div className='fr-container fr-my-4w'>
            <div className="fr-grid-row fr-grid-row--gutters fr-my-2w">
            {products.map((product, index) => (
                <div className='fr-col-4' key={index}>
                    <Card
                        background
                        border
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et"
                        footer={<ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg"><li><button className="fr-btn">Modifier</button></li><li><button className="fr-btn fr-btn--secondary">Supprimer</button></li></ul>}
                        imageAlt="texte alternatif de l’image"
                        imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
                        linkProps={{
                        href: '#'
                        }}
                        size="medium"
                        title={product}
                        titleAs="h3"
                    />
                </div>
            ))}
            </div>
            {/* SET PAGINATION */}
        </div>
    )
}