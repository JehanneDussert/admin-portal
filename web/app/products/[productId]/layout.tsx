import { notFound } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

export default function layout({ 
    params,
    children 
}: PropsWithChildren<{
    params: { productId: string }
}>) {
    const productId = Number(params.productId)

    if (isNaN(productId)) {
        return notFound();
    }
    console.log('ici: ', params.productId)

    return (
        <div className='fr-container fr-my-4w'>
            {children}
        </div>
    )
}
