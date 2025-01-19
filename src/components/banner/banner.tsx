import { Typography } from "@mui/material";
import {
    BannerContainer,
    BannerContent,
    BannerTitle,
    BannerDescription,
    BannerImage,
} from "./../../styles/banner/index";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";

export default function Banner() {
    // const theme = useTheme();
    // const matches = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <BannerContainer>
            <BannerImage src="data:image/jpeg;base64,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" />
            <BannerContent>
                <Typography variant="h6">More</Typography>
                <BannerTitle variant="h2">New Collections</BannerTitle>
                <BannerDescription variant="caption">Luxury</BannerDescription>
            </BannerContent>
        </BannerContainer>
    );
}
