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

    return (
        <div className='fr-container fr-my-4w'>
            {children}
        </div>
    )
}
