import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
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
import useDialogModal from "../../hooks/useDialogModal";
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

interface SingleProduct {
    product: ProductProps;
    matches: boolean;
}
export default function SingleProduct({ product, matches }: SingleProduct) {
    useEffect(() => {
        productStore.fetchProducts();
    }, []);

    const [
        ProductDetailDialog,
        showProductDetailDialog,
        closeProductDetailDialog,
    ] = useDialogModal(ProductDetail);

    return (
        <>
            <Product>
                <ProductImage
                    src={
                        product.images && product.images[0]
                            ? product.images[0]
                            : ""
                    }
                />
                <ProductMeta product={product} matches={matches} />
                <ProductActionWrapper>
                    <Stack direction="row">
                        <ProductFavButton isfav={0}>
                            <FavoriteIcon />
                        </ProductFavButton>

                        <ProductActionButton isfav={1}>
                            <ShareIcon colot="primary" />
                        </ProductActionButton>

                        <ProductActionButton
                            onClick={() => showProductDetailDialog()}
                        >
                            <FitScreenIcon colot="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Product>
            <ProductAddToCart variant="contained">Add to cart</ProductAddToCart>
            <ProductDetailDialog product={product} />
        </>
    );
}
