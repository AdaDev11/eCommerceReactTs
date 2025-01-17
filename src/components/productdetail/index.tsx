import { useEffect } from "react";
// import { ProductImage } from "./../../styles/products/index";
import productStore from "./../../data/index";
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Colors } from "./../../styles/theme/index";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Slide,
    Box,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { Product, ProductImage } from "../../styles/products/index.ts";
import IncDec from "../ui/index.tsx";
import FavoriteIcon from "@mui/icons-material/Favorite";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";

export interface ProductProps {
    id: number;
    title: string;
    category: string;
    price: number;
    images: string[];
    description: string;
    quantity: number;
    thumbnail: string;
    total: number;
}

function SlideTransition(props) {
    return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    lineHeight: 1.5,
}));

export default function ProductDetail({
    open,
    onClose,
    product,
}: {
    open: boolean;
    onClose: () => void;
    product: ProductProps;
}) {
    useEffect(() => {
        productStore.fetchProducts();
    }, []);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Dialog
            TransitionComponent={SlideTransition}
            variant="permanat"
            open={open}
            fullScreen
        >
            <DialogTitle
                sx={{
                    background: Colors.secondary,
                }}
            >
                <Box
                    display={"flex"}
                    alignItems="center"
                    justifyContent={"space-between"}
                >
                    Product title
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <ProductDetailWrapper
                    flexDirection={matches ? "column" : "row"}
                >
                    <Product sx={{ mr: 4 }}>
                        <ProductImage src={product?.images?.[0]} />
                    </Product>
                    <ProductDetailInfoWrapper>
                        <Typography variant="subtitle1">SKU 123</Typography>
                        <Typography variant="subtitle1">
                            Availability: 5 in stock
                        </Typography>
                        <Typography sx={{ lineHeight: 2 }} variant="h4">
                            {product.title}
                        </Typography>
                        <Typography variant="body">
                            {product.description}
                        </Typography>
                        <Box
                            sx={{ mt: 4 }}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <IncDec />
                            <Button variant="contained">Add to cart</Button>
                        </Box>
                        <Box
                            sx={{ mt: 4, color: Colors.light }}
                            display="flex"
                            alignItems="center"
                        >
                            <FavoriteIcon sx={{ mr: 2 }} />
                            Add to wishlist
                        </Box>
                        <Box sx={{ mt: 4, color: Colors.light }}>
                            <FacebookIcon />
                            <XIcon sx={{ pl: theme.spacing(4) }} />
                            <InstagramIcon sx={{ pl: theme.spacing(4) }} />
                        </Box>
                    </ProductDetailInfoWrapper>
                </ProductDetailWrapper>
            </DialogContent>
        </Dialog>
    );
}
