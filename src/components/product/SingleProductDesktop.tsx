import useDialogModal from "../../hooks/useDialogModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import {
    Product,
    ProductImage,
    ProductActionWrapper,
    ProductFavButton,
    ProductAddToCart,
    ProductActionButton,
} from "./../../styles/products/index";
import ProductMeta from "./productMeta";
import productStore from "../../data/index.ts";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import ProductDetail from "../productdetail/index.tsx";

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

export interface SingleProductDesktopProps {
    product: ProductProps;
    matches: boolean;
}

const isfav = 0;

export default function SingleProductDesktop({
    product,
    matches,
}: SingleProductDesktopProps) {
    useEffect(() => {
        productStore.fetchProducts();
    }, []);

    const [showOption, setShowOption] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [ProductDetailDialog] = useDialogModal(ProductDetail);

    const handleMouseEnter = () => {
        setShowOption(true);
    };

    const handleMouseLeave = () => {
        setShowOption(false);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Product
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <ProductImage
                    src={
                        product.images && product.images[0]
                            ? product.images[0]
                            : ""
                    }
                />

                <ProductFavButton isfav={!!isfav}>
                    <FavoriteIcon />
                </ProductFavButton>

                {showOption && (
                    <ProductAddToCart show={true} variant="contained">
                        Add to cart
                    </ProductAddToCart>
                )}
                <ProductActionWrapper show={showOption}>
                    <Stack direction="column">
                        <ProductActionButton>
                            <ShareIcon color="primary" />
                        </ProductActionButton>

                        <ProductActionButton onClick={handleDialogOpen}>
                            <FitScreenIcon color="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Product>
            <ProductMeta product={product} matches={matches} />
            <ProductDetailDialog
                product={product}
                open={openDialog}
                onClose={handleDialogClose}
            />
        </>
    );
}
