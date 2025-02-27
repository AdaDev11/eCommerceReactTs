import { Colors } from "./../theme/index";
// import { ProductActionButton } from './index';
import { Box, IconButton, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { slideInBottom, slideInRight } from "../animation/index.ts";

export interface ProductActionWrapperProps {
    show?: boolean;
}

export interface FavoriteIconButtonProps {
    isfav?: boolean;
}

export const Product = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        position: "relative",
    },
}));

export const ProductImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "180px",
    background: Colors.light_gray,
    padding: "10px",
    height: "180px",
    [theme.breakpoints.down("md")]: {
        width: "80%",
        padding: "24px",
    },
}));

export const ProductActionButton = styled(IconButton)(() => ({
    background: Colors.white,
    margin: 4,
}));

export const ProductFavButton = styled(
    ProductActionButton
)<FavoriteIconButtonProps>(({ isfav, theme }) => ({
    color: isfav ? Colors.primary : Colors.light,
    [theme.breakpoints.up("md")]: {
        position: "absolute",
        right: 0,
        top: 0,
    },
}));

export const ProductAddToCart = styled(Button)<ProductActionWrapperProps>(
    ({ show, theme }) => ({
        width: "120px",
        fontSize: "12px",
        [theme.breakpoints.down("md")]: {
            position: "absolute",
            bottom: "2%",
            width: "300px",
            padding: "10px 5px",
            animation:
                show &&
                `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
        },
        background: Colors.secondary,
        opacity: 0.9,
    })
);

export const ProductMetaWrapper = styled(Box)(() => ({
    padding: 4,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
}));

export const ProductActionWrapper = styled(Box)<ProductActionWrapperProps>(
    ({ show, theme }) => ({
        [theme.breakpoints.up("md")]: {
            display: show ? "visible" : "none",
            position: "absolute",
            right: 0,
            top: "20%",
            animation:
                show &&
                `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
        },
    })
);
