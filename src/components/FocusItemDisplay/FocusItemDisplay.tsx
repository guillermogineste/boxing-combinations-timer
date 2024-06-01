import React from "react";
import { FocusItem } from "../../types";
import { VStack, Text, Heading } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

interface FocusItemDisplayProps {
    focusItem: FocusItem | null;
    isResting: boolean;
    isTimerRunning: boolean;
}

const FocusItemDisplay: React.FC<FocusItemDisplayProps> = ({
    focusItem,
    isResting,
    isTimerRunning
}) => {
    const theme = useTheme();
    const opacity = isResting ? "0" : theme.resting[String(isTimerRunning)]
    return (
        <VStack opacity={opacity}  gap={0} pb={5}>
            <Text fontWeight={"500"} >Focus</Text>
            <Heading as="h3" size="lg">{focusItem?.description}</Heading>
        </VStack>
    );
};

export default FocusItemDisplay;