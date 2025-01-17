import { useUIContext } from "./../../context/ui/index";
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
    const { setDrawerOpen, setShowSearchBox } = useUIContext();
    return (
        <AppbarContainer>
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>
            <AppbarHeader textAlign={"center"} variant="h4">
                Shopping
            </AppbarHeader>
            <IconButton onClick={() => setShowSearchBox(true)}>
                <SearchIcon />
            </IconButton>

            <Actions matches={matches} />
        </AppbarContainer>
    );
}
