import React, { useState } from 'react'

/* BASIC IMPORTS */
import axios from 'axios'
import { useQuery } from 'react-query'
import ProductsList from './ProductsList'
import Pagination from './Pagination'
import '../styles/Products.css'

/* MATERIAL */
import {
    Alert,
    CircularProgress,
    Input
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
    }: QueryDataProps = useQuery(['/products', page], () => getProductPage(page, perPage), {
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

            <Pagination setPage={setPage} page={page} isPreviousData={isPreviousData} products={products} isFetching={isFetching} />
        </div>
    )
}

export default ProductsContainer;