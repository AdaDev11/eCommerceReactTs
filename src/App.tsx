import { useEffect } from "react";
import { ListItemText, Container, Button } from "@mui/material";
import Appbar from "./components/appbar";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import Banner from "./components/banner/banner.tsx";
import Promotions from "./components/promotions/index.tsx";
import Products from "./components/product/index.tsx";

function App() {
    useEffect(() => {
        document.title = "React Material UI E Commerce";
        return () => {};
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl" sx={{ background: "#fff" }}>
                <Appbar />
                <Banner />
                <Promotions />
                <Products />
            </Container>
        </ThemeProvider>
    );
}

export default App;
