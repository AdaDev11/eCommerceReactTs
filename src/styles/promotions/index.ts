import { Colors } from "./../theme/index";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const PromotionsContainer = styled(Box)(({ theme }) => ({
    // [theme.breakpoint.up("md")]: {
    //     padding: "40px 0px 40px 0px",
    // },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0px 20px 0px",
    overflow: "hidden",
    background: Colors.secondary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
    fontFamily: '"Montez", "cursive"',
    // [theme.breakpoint.up("md")]: {
    //     fonstSize: "3rem",
    // },
    color: Colors.white,
    fonstSize: "1.5rem",
}));
