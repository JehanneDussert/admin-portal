// app/[pageId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { GET_ALL_PRODUCTS, GET_PRODUCTS_BY_NAME } from '../utils/constants';
import { Product } from '../interfaces/Product';
import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar';
import { useFetch } from '../utils/hooks';
import { ProductsList } from '../components/ProductsList';
import { UndoRedoButtons } from '../components/UndoRedoButtons';
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons';
import { Pagination } from '@codegouvfr/react-dsfr/Pagination';
import { useRouter } from 'next/navigation';

export const Page = ({ params }: { params: { pageId: string } }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [deletedProducts, setDeletedProducts] = useState<Product[]>([]);
    const [redoProducts, setRedoProducts] = useState<Product[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const pageId = parseInt(params.pageId, 10);
    const router = useRouter();
    const ITEMS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(pageId)

    const fetchProducts = async (url: string) => {
        try {
            const data = await useFetch({ url, method: 'GET' });

            setProducts(data.products);
            setDeletedProducts(data.deleted_products);
            setRedoProducts(data.redo_products);
            setTotalProducts(data.total_products);
        } catch (error) {
            setError(error as Error);
        }
    };

    useEffect(() => {
        fetchProducts(`${GET_PRODUCTS_BY_NAME}?product_name=&page=${pageId}&size=${ITEMS_PER_PAGE}`);
    }, []);

    const handleSearch = (text: string) => {
        router.push(`/1?product_name=${text}`);
        // setCurrentPage(1);
    };

    const handleSort = (type: string) => {
        router.push(`/products/${type}`);
        // setCurrentPage(1);
    };

    useEffect(() => {
        if (error) {
            throw new Error(`Error loading products`);
        }
    }, [error]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/${page}`);
    };
    
     const getPageLinkProps = (pageNumber: number) => ({
        href: `/${pageNumber}`,
        title: `Page ${pageNumber}`,
        onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            handlePageChange(pageNumber);
        },
    });

    return (
        <div className="fr-container fr-my-4w">
            <SearchBar
                data-testid="search-bar"
                onButtonClick={handleSearch}
                allowEmptySearch={true}
            />
            <div className="fr-grid-row fr-grid-row--right fr-my-2w">
                <RadioButtons
                    legend="Trier par"
                    name="radio"
                    className="fr-col"
                    options={[
                        {
                            label: 'Nom',
                            nativeInputProps: {
                                value: 'name',
                                onClick: () => handleSort('sort_by_name'),
                            },
                        },
                        {
                            label: 'Date de modification',
                            nativeInputProps: {
                                value: 'date',
                                onClick: () => handleSort('sort_by_date'),
                            },
                        },
                        {
                            label: 'Note',
                            nativeInputProps: {
                                value: 'rate',
                                onClick: () => handleSort('sort_by_rate'),
                            },
                        },
                    ]}
                    orientation="horizontal"
                />
                <UndoRedoButtons
                    data-testid="undo-redo-buttons"
                    setProducts={setProducts}
                    setDeletedProducts={setDeletedProducts}
                    setRedoProducts={setRedoProducts}
                    undoVisibility={deletedProducts.length === 0}
                    redoVisibility={redoProducts.length === 0}
                />
            </div>
            <ProductsList
                products={products}
                setProducts={setProducts}
                setDeletedProducts={setDeletedProducts}
                setRedoProducts={setRedoProducts}
            />
            {totalProducts && <Pagination
                count={Math.ceil(totalProducts / ITEMS_PER_PAGE)}
                defaultPage={currentPage}
                getPageLinkProps={getPageLinkProps}
                
            />}
        </div>
    );
};

export default Page;
