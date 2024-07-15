"use client";

import React, { useEffect, useState } from 'react'
import { GET_ALL_PRODUCTS } from '../../../src/components/constants';
import { Product } from '../../../src/components/interface';
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";

export default function ProductInfos({ params }: {params: {productId: Number }}) {
  const [product, setProduct] = useState<Product>();

	useEffect(() => {
		fetch(GET_ALL_PRODUCTS + `/${params.productId}`)
		.then(res => res.json())
		.then(data => setProduct(data));
	}, [])

  return (
    <div className='fr-grid-col'>
      <h1>{product?.title}</h1>
      <ButtonsGroup
        buttons={[
          {
            children: 'Modifier',
            linkProps: {
              href: '#'
            }
          },
          {
            children: 'Supprimer',
            linkProps: {
              href: '#'
            },
            priority: 'secondary'
          },
        ]}
      />
      {
        product && 
        <>
          <Accordion label="Résumé">
            {product?.desc}
          </Accordion>
          <Accordion label="Description">
            {product?.desc}
          </Accordion>
        </>
    }
    </div>
  )
}
