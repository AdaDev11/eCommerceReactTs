import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "./../../styles/products/index";
import { useEffect } from "react";
import productStore from "../../data/index.ts";

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

interface MetaProduct {
    product: ProductProps;
    matches: boolean;
}

export default function ProductMeta({ product, matches }: MetaProduct) {
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
