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

export default function SingleProductDesktop({ product, matches }) {
    useEffect(() => {
        productStore.fetchProducts();
    }, []);

    const [showOption, setShowOption] = useState(false);

    const handleMouseEnter = () => {
        setShowOption(true);
    };

    const handleMouseLeave = () => {
        setShowOption(false);
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

                <ProductFavButton isfav={0}>
                    <FavoriteIcon />
                </ProductFavButton>

                {showOption && (
                    <ProductAddToCart
                        show={setShowOption.toString}
                        variant="contained"
                    >
                        Add to cart
                    </ProductAddToCart>
                )}
                <ProductActionWrapper show={showOption}>
                    <Stack direction="column">
                        <ProductActionButton>
                            <ShareIcon color="primary" />
                        </ProductActionButton>

                        <ProductActionButton>
                            <FitScreenIcon color="primary" />
                        </ProductActionButton>
                    </Stack>
                </ProductActionWrapper>
            </Product>
            <ProductMeta product={product} matches={matches} />
        </>
    );
}
