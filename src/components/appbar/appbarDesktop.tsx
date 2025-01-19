import { useUIContext } from "./../../context/ui/index";
import { ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import {
    AppbarContainer,
    AppbarHeader,
    MyList,
} from "./../../styles/appbar/index";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions.tsx";

export interface ActionProps {
    matches: boolean;
}

export default function AppbarDesktop({ matches }: ActionProps) {
    // Removed the unused setDrawerOpen to fix the warning
    const { setShowSearchBox } = useUIContext();

    return (
        <AppbarContainer>
            <AppbarHeader>Shopping </AppbarHeader>
            <MyList type="row">
                <ListItemText primary="Home" />
                <ListItemText primary="Categories" />
                <ListItemText primary="Products" />
                <ListItemText primary="Contact us" />
                <ListItemButton>
                    <ListItemIcon onClick={() => setShowSearchBox(true)}>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>

            <Actions matches={matches} />
        </AppbarContainer>
    );
}
