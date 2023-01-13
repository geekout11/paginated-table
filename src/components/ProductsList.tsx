import React, { useState } from 'react'

import '../styles/Products.css'

/* MATERIAL */
import {
    Modal,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Box,
    TableHead,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

/* ICONS */
import CloseIcon from '@mui/icons-material/Close';
import { ProductData } from '../types/ProductData';

/* TYPES */

type ProductList = {
    products: { data: ProductData[] }
    filterProducts: string
}

const ProductsList = ({ products, filterProducts }: ProductList): JSX.Element => {
    const [openModal, setOpenModal] = useState(false);
    const [clickedProduct, setClickedProduct] = useState<ProductData | any>();

    const handleOpen = (product: ProductData) => {
        setClickedProduct(product);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    /* STYLES */

    const positionTopRight = {
        position: 'absolute' as 'absolute',
        top: '2%',
        right: '2%',
    }

    const boxModalSx = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: clickedProduct?.color,
        textAlign: 'center',
        color: '#FFFFFF',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const tableContainerSx = {
        border: "1px solid rgba(128,128,128,0.4)",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 4,
        borderRadius: 2,
        maxHeight: 500
    };

    return (
        <React.Fragment>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={boxModalSx}>
                    <CloseIcon sx={positionTopRight} onClick={handleClose} />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {clickedProduct?.id}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {clickedProduct?.name}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {clickedProduct?.year}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {clickedProduct?.color}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {clickedProduct?.pantone_value}
                    </Typography>
                </Box>
            </Modal>

            <TableContainer sx={tableContainerSx}>
                <Table>
                    <TableHead sx={{ "& .MuiTableCell-stickyHeader": { backgroundColor: "primary.main" } }}>
                        <TableRow>
                            <TableCell scope="header">ID</TableCell>
                            <TableCell scope="header">Name</TableCell>
                            <TableCell scope="header">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        "& tr:nth-of-type(2n+1)": {
                            backgroundColor: "grey.100",
                        },
                    }}>
                        {products.data.filter(
                            (product: ProductData) => product.id.toString().includes(filterProducts)
                        ).map((product: ProductData) => (

                            <TableRow key={product.id} style={{ backgroundColor: product.color }} onClick={() => handleOpen(product)}>
                                <TableCell scope="row">{product.id}</TableCell>
                                <TableCell scope="row">{product.name}</TableCell>
                                <TableCell scope="row">{product.year}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
};

export default ProductsList;