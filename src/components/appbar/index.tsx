import useMediaQuery from "@mui/material/useMediaQuery";
import AppbarMobile from "./appbarMobile";
import AppbarDesktop from "./appbarDesktop";

import { useTheme } from "@mui/material/styles";

export default function Appbar() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {matches ? (
                <AppbarMobile matches={matches} />
            ) : (
                <AppbarDesktop matches={matches} />
            )}
        </>
    );
}
