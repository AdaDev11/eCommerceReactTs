import { Slide } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/system";
import {
    PromotionsContainer,
    MessageText,
} from "./../../styles/promotions/index";

const messages = [
    "20% off on your first order!",
    "Cashbacks",
    "Like and subscribe ;)",
];

export default function Promotions() {
    const containerRef = useRef();
    const [messageIndex, setMessageIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);

        const intervalId = setInterval(() => {
            setMessageIndex((i) => (i + 1) % messages.length);
            setShow(true);

            setTimeout(() => {
                setShow(false);
            }, 3000);
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <PromotionsContainer ref={containerRef}>
            <Slide
                container={containerRef.current}
                direction={show ? "left" : "right"}
                in={show}
                timeout={{
                    enter: 500,
                    exit: 100,
                }}
            >
                <Box
                    display={"flex"}
                    justifyContent="center"
                    alignItems={"center"}
                >
                    <MessageText>{messages[messageIndex]}</MessageText>
                </Box>
            </Slide>
        </PromotionsContainer>
    );
}
