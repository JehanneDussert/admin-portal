"use client";
import React, { useEffect, useState } from 'react';
import { Card } from "@codegouvfr/react-dsfr/Card";
import { DELETE_PRODUCT_BY_ID, GET_DELETED_PRODUCTS, GET_PRODUCTS_BY_NAME, GET_REDO_PRODUCTS, REDO_PRODUCT, RESTORE_PRODUCT } from '../src/components/constants';
import { Product } from '../src/components/interface';
import { SearchBar } from "@codegouvfr/react-dsfr/SearchBar";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useRouter } from 'next/navigation';

export default function Home() {
    const   [products, setProducts] = useState<Product[]>([]);
    const   [deletedProducts, setDeletedProducts] = useState<Product[]>([]);
	const   [redoProducts, setRedoProducts] = useState<Product[]>([]);
    const   [query, setQuery] = useState('');
    const   router = useRouter();
	
    useEffect(() => {
        fetch(GET_PRODUCTS_BY_NAME + `?product_name=${query}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [query]);

    const handleSearch = (text: string) => {
        setQuery(text);
    };

    const handleDelete = (id: number) => {
        fetch(DELETE_PRODUCT_BY_ID + `?product_id=${id}`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                // Update deleted products state
                fetch(GET_DELETED_PRODUCTS)
                    .then(res => res.json())
                    .then(data => setDeletedProducts(data));
            });
    };

    const handleRestoreProducts = () => {
        fetch(RESTORE_PRODUCT, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                fetch(GET_DELETED_PRODUCTS)
                    .then(res => res.json())
                    .then(data => setDeletedProducts(data));
				fetch(GET_REDO_PRODUCTS)
                    .then(res => res.json())
                    .then(data => setRedoProducts(data));
            });
    };

    const handleRedo = () => {
        fetch(REDO_PRODUCT, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                fetch(GET_REDO_PRODUCTS)
                    .then(res => res.json())
                    .then(data => setRedoProducts(data));
				fetch(GET_DELETED_PRODUCTS)
                    .then(res => res.json())
                    .then(data => setDeletedProducts(data));
            });
    };

    return (
        <div className='fr-container fr-my-4w'>
            <SearchBar 
                onButtonClick={handleSearch}
				allowEmptySearch={true}
            />
            <div className='fr-grid-row fr-grid-row--right fr-my-2w'>
                <Button
                    iconId="fr-icon-arrow-go-back-fill"
                    onClick={handleRestoreProducts}
                    priority="tertiary no outline"
                    title="Défaire"
                    disabled={deletedProducts.length === 0}
                />
                <Button
                    iconId="fr-icon-arrow-go-forward-fill"
                    onClick={handleRedo}
                    priority="tertiary no outline"
                    title="Refaire"
                    disabled={redoProducts.length === 0}
                />
            </div>
            <div className="fr-grid-row fr-grid-row--gutters fr-my-2w">
                {products && products.map((product, index) => (
                    <div className='fr-col-4' key={index}>
                        <Card
                            background
                            border
                            desc={product.desc}
                            footer={
                                <ul className="fr-btns-group fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                                    <li><button id={product.title} onClick={() => router.push(`/products/${product?.id}/edit`)} className="fr-btn">Modifier</button></li>
                                    <li><button className="fr-btn fr-btn--secondary" onClick={() => handleDelete(product.id)}>Supprimer</button></li>
                                </ul>
                            }
                            imageAlt="texte alternatif de l’image"
                            imageUrl="https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
                            linkProps={{
                                href: `/products/${product.id}`
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
    );
}
