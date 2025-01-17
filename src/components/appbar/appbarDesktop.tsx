import {
    Divider,
    ListItemText,
    ListItemButton,
    ListItemIcon,
} from "@mui/material";
import {
    AppbarContainer,
    AppbarHeader,
    MyList,
} from "./../../styles/appbar/index";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions.tsx";

export default function AppbarDesktop({ matches }) {
    // const Component = matches
    //     ? ActionIconContainerMobile
    //     : ActionIconContainerDesktop;

    return (
        <AppbarContainer>
            <AppbarHeader>SHopping </AppbarHeader>
            <MyList type="row">
                <ListItemText primary="Home" />
                <ListItemText primary="Categories" />
                <ListItemText primary="Products" />
                <ListItemText primary="Contact us" />
                <ListItemButton>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>

            <Actions matches={matches} />
        </AppbarContainer>
    );
}
