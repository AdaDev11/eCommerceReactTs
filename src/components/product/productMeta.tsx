import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "./../../styles/products/index";
import { useEffect } from "react";
import productStore from "../../data/index.ts";

export default function ProductMeta({ product, matches }) {
    useEffect(() => {
        productStore.fetchProducts();
    }, []);
    return (
        <ProductMetaWrapper>
            <Typography
                variant={matches ? "h6" : "h5"}
                lineHeight={2}
                sx={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {product.title}
            </Typography>

            <Typography variant={matches ? "caption" : "body1"}>
                ${product.price}
            </Typography>
        </ProductMetaWrapper>
    );
}
