import React, { useState } from 'react'

/* BASIC IMPORTS */
import axios, {AxiosError} from 'axios'
import { useQuery } from 'react-query'
import ProductsList from './ProductsList'
import Pagination from './Pagination'
import '../styles/Products.css'
import { GetProductPageProps } from '../types/GetProductPageProps'

/* MATERIAL */
import {
    Alert,
    CircularProgress,
    Input
} from '@mui/material'

/* TYPES */

type QueryData = {
    isLoading: boolean,
    isError: boolean,
    error: AxiosError<unknown, any> | null,
    data: any,
    isFetching: boolean,
    isPreviousData: boolean
}

const ProductsContainer = (): JSX.Element => {
    const [page, setPage] = useState(1)
    const [filterProducts, setFilteredProducts] = useState('')

    const perPage = 5

    /* STYLES */

    const positionTopRight = {
        position: 'absolute' as 'absolute',
        top: '0%',
        right: '0%',
    }

    const errorStyling = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        boxShadow: 24,
    }

    const {
        isLoading,
        isError,
        error,
        data: products,
        isFetching,
        isPreviousData
    }: QueryData = useQuery(['/products', page], () => getProductPage(page, perPage), {
        keepPreviousData: true
    })

    const getProductPage = async (pageParam = 1, perPage = 5): Promise<GetProductPageProps> => {
        const response = await axios.get(
            `https://reqres.in/api/products?per_page=${perPage}&page=${pageParam}`
        )
        return response.data
    }

    if (isLoading) {
        return (
            <CircularProgress sx={positionTopRight} disableShrink />
        )

    } else if (isError) {
        return (
            <Alert sx={errorStyling} variant="filled" severity="error">
                {error?.message}
            </Alert>
        )
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (/^\d*$/.test(value)) {
            setFilteredProducts(value)
        }
    }

    return (
        <div className='productsContainerWrapper'>

            <Input
                type="text"
                value={filterProducts}
                onChange={handleChange}
                placeholder='Search by ID'
            />

            <ProductsList key={products} products={products} filterProducts={filterProducts} />

            <Pagination setPage={setPage} page={page} isPreviousData={isPreviousData} isFetching={isFetching} totalPages={products.total_pages} />
        </div>
    )
}

export default ProductsContainer;