import { HStack, Box, Wrap, WrapItem } from "@chakra-ui/react";

interface ProgressBarProps {
    currentRound: number;
    numberOfRounds: number;
    currentInterval: number;
    intervalsPerRound: number;
    isResting: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    currentRound,
    numberOfRounds,
    currentInterval,
    intervalsPerRound,
    isResting
}) => {
    const renderIntervals = (round: number) => {
        const intervals = [];
        for (let i = 1; i <= intervalsPerRound; i++) {
            const isCurrentInterval = round === currentRound && i === currentInterval && !isResting;
            const isPastInterval = round < currentRound || (round === currentRound && (i < currentInterval || (i === currentInterval && isResting)));
            intervals.push(
                <Box
                    key={`interval-${round}-${i}`}
                    className={`interval interval--${i} ${isCurrentInterval ? 'interval--current' : ''} ${isPastInterval ? 'interval--past' : ''}`}
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
                return (
                    <WrapItem key={roundIndex}>
                        <HStack gap={0} key={`round-${round}`} flexGrow={1} className={`round ${isCurrentRound ? 'round--current' : ''} ${isPastRound ? 'round--past' : ''}`}>
                            {renderIntervals(round)}
                            {!isLastRound && (
                                <Box
                                    ml={1}
                                    mr={1}
                                    className={`rest ${isCurrentRound && isResting ? 'rest--current' : ''} ${isPastRound ? 'rest--past' : ''}`}
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