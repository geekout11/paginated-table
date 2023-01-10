import React from 'react'

/* BASIC IMPORTS */
import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Product from './Product'
import '../styles/Products.css'


/* MATERIAL */
import Button from '@mui/material/Button';
import {
    Alert,
    CircularProgress,
    Typography
} from '@mui/material'

/* ICONS */
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

/* TYPES */

type QueryDataProps = {
    isLoading: boolean,
    isError: boolean,
    error: any,
    data: any,
    isFetching: boolean,
    isPreviousData: any
}

const ProductList = (): JSX.Element => {
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
        // console.log(response)
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
            <Product key={products.id} products={products} />

            <div className='pagination'>
                <Button variant="contained" onClick={() => { setPage(page - 1) }} disabled={isPreviousData || page === 1}>
                    <NavigateBeforeIcon />
                </Button>
                
                <Button variant="contained" onClick={() => { setPage(page + 1) }}
                    disabled={isPreviousData || page === products.total_pages}>
                    <NavigateNextIcon />
                </Button>
            </div>

            <div className='pageCounter'>
                <Typography>Page: {products.page}</Typography>
                {isFetching && <CircularProgress disableShrink />}
            </div>
        </div>
    )
}
export default ProductList;