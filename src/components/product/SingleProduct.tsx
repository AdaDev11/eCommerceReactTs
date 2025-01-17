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

export default function SingleProduct({ product, matches }) {
    useEffect(() => {
        productStore.fetchProducts();
    }, []);

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

                        <ProductActionButton isfav={1}>
                            <FitScreenIcon colot="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Product>
            <ProductAddToCart variant="contained">Add to cart</ProductAddToCart>
        </>
    );
}
