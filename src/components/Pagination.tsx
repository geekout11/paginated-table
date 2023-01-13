import {
    Button,
    CircularProgress,
    Typography
} from '@mui/material'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


type PaginationProps = {
    isFetching: boolean
    page: number
    isPreviousData: boolean
    setPage: React.Dispatch<React.SetStateAction<number>>
    totalPages: number
}

const Pagination = ({ setPage, page, isPreviousData, totalPages, isFetching }: PaginationProps) => {

    return (
        <div className='paginationWrapper'>

            <div className='pagination'>
                <Button variant="contained" onClick={() => { setPage(page - 1) }}
                    disabled={isPreviousData || page === 1}
                >
                    <NavigateBeforeIcon />
                </Button>

                <Button variant="contained" onClick={() => { setPage(page + 1) }}
                    disabled={isPreviousData || page === totalPages}
                >
                    <NavigateNextIcon />
                </Button>
            </div>

            <div className='pageCounter'>
                <Typography>Page: {page}</Typography>
                {isFetching && <CircularProgress disableShrink />}
            </div>
        </div>
    )
}

export default Pagination;