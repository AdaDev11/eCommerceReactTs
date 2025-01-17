import { Colors } from "./../theme/index";
import { List } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import "@fontsource/montez";

// container
export const AppbarContainer = styled(Box)(() => ({
    display: "flex",
    marginTop: 4,
    justifyConten: "center",
    alignItems: "center",
    padding: "2px 8px",
}));

// header
export const AppbarHeader = styled(Typography)(() => ({
    padding: "4px",
    flexGrow: 1,
    fontFamily: '"Montez", "cursive"',
    color: Colors.secondary,
}));

export const MyList = styled(List)(({ type }) => ({
    display: type === "row" ? "flex" : "block",
    flex: 3,
    justifyConten: "center",
    alignItems: "center",
}));

export const ActionIconContainerMobile = styled(Box)(() => ({
    display: "flex",
    background: Colors.shaft,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 99,
    borderTop: `1px solid ${Colors.border}`,
}));

export const ActionIconContainerDesktop = styled(Box)(() => ({
    flexGrow: 0,
}));
