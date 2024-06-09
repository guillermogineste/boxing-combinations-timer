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
    body: '"logic-monospace", mono',
    heading: '"logic-monospace", mono',
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
    app: {
      background: "#650d08",
      restBackground: "#182d6c",
      workBackground: "#a33934",
      border: "#000000",
      hover: "#470703",
      restHover: "#081d5d",
    },
  },
  resting: {
    true: "1",
    false: "0.4",
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
          fontFamily: '"logic-monospace", mono',
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
    Heading: {
      baseStyle: {
        fontFamily: '"logic-monoscript", mono',
        fontWeight: "500",
        fontStyle: "normal",
        wordSpacing: "-5px",
        margin: "0",
        padding: "0",
        textAlign: "center",
      },
      sizes: {
        "2xl": {
          fontSize: "clamp(2em, 4vw, 4.5em)",
          lineHeight: "clamp(1.2em, 2.5vw, 3em)",
        },
        "xl": {
          fontSize: "clamp(1em, 2.5vw, 1.8em)",
        },
        "lg": {
          fontSize: "clamp(1em, 2vw, 2.2em)",
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "'logic-monospace', mono",
        fontWeight: "400",
        fontStyle: "normal",
        color: "white",
        lineHeight: "normal",
      },
    },
  },
});