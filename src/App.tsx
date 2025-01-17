import { useEffect } from "react";
import { ListItemText, Container, Button } from "@mui/material";
import Appbar from "./components/appbar";
import { ThemeProvider } from "@mui/system";
import theme from "./styles/theme";
import Banner from "./components/banner/banner.tsx";
import Promotions from "./components/promotions/index.tsx";
import Products from "./components/product/index.tsx";
import Footer from "./components/footer/index.tsx";
import AppDrawer from "./components/drawer/index.tsx";
import UIProvider from "./context/ui/index.tsx";
import SearchBox from "./components/search/index.tsx";

function App() {
    useEffect(() => {
        document.title = "React Material UI E Commerce";
        return () => {};
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xl" sx={{ background: "#fff" }}>
                <UIProvider>
                    <Appbar />
                    <Banner />
                    <Promotions />
                    <Products />
                    <Footer />
                    <AppDrawer />
                    <SearchBox />
                </UIProvider>
            </Container>
        </ThemeProvider>
    );
}

export default App;
