import { HStack, Box, Wrap, WrapItem } from "@chakra-ui/react";

// Define the props for the ProgressBar component
interface ProgressBarProps {
    currentRound: number;
    numberOfRounds: number;
    currentInterval: number;
    intervalsPerRound: number;
    isResting: boolean;
}

// ProgressBar component to display the progress of rounds and intervals
const ProgressBar: React.FC<ProgressBarProps> = ({
    currentRound,
    numberOfRounds,
    currentInterval,
    intervalsPerRound,
    isResting
}) => {
    // Function to render intervals for a given round
    const renderIntervals = (round: number) => {
        const intervals = [];
        for (let i = 1; i <= intervalsPerRound; i++) {
            // Determine the state of the interval (current, past, or future)
            const isCurrentInterval = round === currentRound && i === currentInterval && !isResting;
            const isPastInterval = round < currentRound || (round === currentRound && (i < currentInterval || (i === currentInterval && isResting)));
            const isFirstInterval = i === 1;
            const isLastInterval = i === intervalsPerRound;
            intervals.push(
                <Box
                    key={`interval-${round}-${i}`}
                    border={"2px solid white"}
                    h={"20px"}
                    w={"24px"}
                    bgColor={isCurrentInterval || isPastInterval ? "white" : "transparent"}
                    opacity={isPastInterval ? ".4" : "1"}
                    borderRadius={isFirstInterval ? " 24px 0 0 24px" : isLastInterval ? "0 24px 24px 0" : ""}
                    borderRight={isFirstInterval ? "0" : ""}
                    borderLeft={isLastInterval ? "0" : ""}
                >
                </Box>
            );
        }
        return intervals;
    };

    return (
        <Wrap
            className="progress-bar"
            spacingY='8px'
            spacingX='0'
            justify='center'
            mb={"clamp(32px, 7vh, 400px)"}
            mt={"clamp(24px, 3vh, 100px)"}
        >
            {Array.from({ length: numberOfRounds }, (_, roundIndex) => {
                const round = roundIndex + 1;
                const isCurrentRound = round === currentRound;
                const isPastRound = round < currentRound;
                const isLastRound = round === numberOfRounds;
                const isCurrentRest = isCurrentRound && isResting
                return (
                    <WrapItem key={roundIndex}>
                        <HStack
                            gap={0}
                            key={`round-${round}`}
                            flexGrow={1}
                        >
                            {renderIntervals(round)}
                            {!isLastRound && (
                                <Box
                                    ml={1}
                                    mr={1}
                                    border={"2px solid white"}
                                    borderRadius={"24px"}
                                    h={"20px"}
                                    w={"20px"}
                                    bgColor={isCurrentRest || isPastRound ? "white" : "transparent"}
                                    opacity={isPastRound ? ".4" : "1"}
                                >
                                </Box>
                            )}
                        </HStack>
                    </WrapItem>
                );
            })}
        </Wrap>
    );
};


export default ProgressBar;