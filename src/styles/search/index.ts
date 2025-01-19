import { Colors } from "./../theme/index";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SearchBoxContainer = styled(Box)(() => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: Colors.primary,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
    opacity: 0.9,
}));

export const SearchFiled = styled(TextField)(({ theme }) => ({
    "& .MuiInputLabel-root": {
        color: Colors.secondary,
    },

    "& .MuiInput-root": {
        fonstSize: "1rem",
        [theme.breakpoints.up("md")]: {
            fonstSize: "2rem",
        },
        color: Colors.secondary,
    },

    "& .MuiInput-root::before": {
        borderBottom: `1px solid ${Colors.secondary}`,
    },

    padding: "0 0 0 40px",
}));
