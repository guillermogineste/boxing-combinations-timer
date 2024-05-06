import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

export const theme = extendTheme({
  styles: {
    global: (props: Dict) => ({
      body: {
        bg: props.colorMode === "light" ? "transparent" : "gray.800",
        color: "white"
      },
    }),
  },
  fonts: {
    body: '"IBM Plex Mono", monospace',
    heading: '"IBM Plex Mono", monospace',
  },
  components: {
    Select: {
      baseStyle: {
        field: {
          color: "white",
          cursor: "pointer",
          alignItems: "center",
          fontSize: "16px",
          borderRadius: "6px",
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: "500",
          background: "transparent",
          border: "2px solid white",
          _hover: {
            backgroundColor: "#650d08",
          },
          _disabled: {
            opacity: 0.5,
          },
        },
      },
    },
  },
});