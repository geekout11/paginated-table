import {
    Button,
    CircularProgress,
    Typography
} from '@mui/material'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


const Pagination = ({ setPage, page, isPreviousData, products, isFetching }: any) => {

    return (
        <div className='paginationWrapper'>

            <div className='pagination'>
                <Button variant="contained" onClick={() => { setPage(page - 1) }}
                    disabled={isPreviousData || page === 1}
                >
                    <NavigateBeforeIcon />
                </Button>

                <Button variant="contained" onClick={() => { setPage(page + 1) }}
                    disabled={isPreviousData || page === products.total_pages}
                >
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

export default Pagination;