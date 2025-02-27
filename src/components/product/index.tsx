import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import productStore from "../../data/index.ts";
import SingleProduct from "./SingleProduct.tsx";
import { useEffect, useState } from "react";
import SingleProductDesktop from "./SingleProductDesktop.tsx";

export default function Products() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await productStore.fetchProducts();
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading products...</Typography>;
    }

    if (!productStore.products || productStore.products.length === 0) {
        return <Typography>No products available</Typography>;
    }

    const renderProducts = productStore.products.map((product) => (
        <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
        >
            {matches ? (
                <SingleProduct product={product} matches={matches} />
            ) : (
                <SingleProductDesktop product={product} matches={matches} />
            )}
        </Grid>
    ));

    return (
        <Container>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ margin: "20px 4px 10px 4px" }}
            >
                {renderProducts}
            </Grid>
        </Container>
    );
}
