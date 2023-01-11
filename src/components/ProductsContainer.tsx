import React from 'react'

/* BASIC IMPORTS */
import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import ProductsList from './ProductsList'
import '../styles/Products.css'
import Pagination from './Pagination'


/* MATERIAL */
import {
    Alert,
    CircularProgress,
} from '@mui/material'

/* TYPES */

type QueryDataProps = {
    isLoading: boolean,
    isError: boolean,
    error: any,
    data: any,
    isFetching: boolean,
    isPreviousData: any
}

const ProductsContainer = (): JSX.Element => {
    const [page, setPage] = useState(1)


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
        isPreviousData,
    }: QueryDataProps = useQuery(['/products', page], () => getProductPage(page), {
        keepPreviousData: true
    })

    const getProductPage = async (pageParam = 1, perPage = 5) => {
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
                {error.message}
            </Alert>
        )
    }

    return (
        <div className='paginationWrapper'>
            <ProductsList key={products.id} products={products} />


            <Pagination setPage={setPage} page={page} isPreviousData={isPreviousData} products={products} isFetching={isFetching} />
        </div>
    )
}

export default ProductsContainer;