import { second } from "first";
import { Colors } from "./../../styles/theme/index";
import {
    MyList,
    ActionIconContainerMobile,
    ActionIconContainerDesktop,
} from "./../../styles/appbar/index";
import {
    Divider,
    ListItemText,
    ListItemButton,
    ListItemIcon,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";

export default function Actions({ matches }) {
    const Component = matches
        ? ActionIconContainerMobile
        : ActionIconContainerDesktop;

    return (
        <Component>
            <MyList type="row">
                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.second,
                        }}
                    >
                        <ShoppingCartIcon />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />

                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.second,
                        }}
                    >
                        <FavoriteIcon />
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />

                <ListItemButton
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: matches && Colors.second,
                        }}
                    >
                        <PersonIcon />
                    </ListItemIcon>
                </ListItemButton>
            </MyList>
        </Component>
    );
}
