import React from "react";
import { FocusItem } from "../../types";
import { VStack, Text } from "@chakra-ui/react";

interface FocusItemDisplayProps {
  focusItem: FocusItem | null;
  isResting: boolean;
}

const FocusItemDisplay: React.FC<FocusItemDisplayProps> = ({ focusItem, isResting }) => {
    if (isResting) {
      return null;
    }
  
    return (
      <VStack className="focus-item-display" gap={0} pb={5}>
        <Text fontWeight={"500"} >Focus</Text>
        <h3 className="heading heading--3">{focusItem?.description}</h3>
      </VStack>
    );
  };

export default FocusItemDisplay;