import SearchIcon from "@mui/icons-material/Search";
import { AppbarContainer, AppbarHeader } from "./../../styles/appbar/index";
import {
    Divider,
    ListItemText,
    ListItemButton,
    ListItemIcon,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions.tsx";

export default function AppbarMobile({ matches }) {
    return (
        <AppbarContainer>
            <IconButton>
                <MenuIcon />
            </IconButton>
            <AppbarHeader textAlign={"center"} variant="h4">
                Shopping
            </AppbarHeader>
            <IconButton>
                <SearchIcon />
            </IconButton>

            <Actions matches={matches} />
        </AppbarContainer>
    );
}
