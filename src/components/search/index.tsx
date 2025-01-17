import { SearchBoxContainer, SearchFiled } from "./../../styles/search/index";
import { Slide, IconButton } from "@mui/material";
import { useUIContext } from "./../../context/ui/index";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchBox() {
    const { showSearchBox, setShowSearchBox } = useUIContext();

    return (
        <Slide direction="down" in={showSearchBox} timeout={500}>
            <SearchBoxContainer>
                <SearchFiled
                    color="secondary"
                    variant="standard"
                    fullWidth
                    placeholder="...search"
                />
                <IconButton>
                    <SearchIcon
                        sx={{
                            fonstSize: { xs: "2rem", md: "3rem" },
                        }}
                        color="secondary"
                    />
                </IconButton>
                <IconButton
                    onClick={() => setShowSearchBox(false)}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                    }}
                >
                    <CloseIcon
                        sx={{
                            fonstSize: "4rem",
                        }}
                        color="secondary"
                    />
                </IconButton>
            </SearchBoxContainer>
        </Slide>
    );
}
