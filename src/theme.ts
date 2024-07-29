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
        "3xl": {
          fontSize: "clamp(2.5em, 5vw, 5em)",
          lineHeight: "clamp(1.2em, 2.5vw, 3em)",
        },
        "2xl": {
          fontSize: "clamp(1.9em, 3.9vw, 4.2em)",
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
    Modal: {
      baseStyle: (props: Dict) => ({
        dialog: {
          bg: "app.workBackground",
          color: "white",
          border: "2px solid white",
          boxShadow: "none",
        },
        header: {
          borderBottom: "2px solid white"
        },
        body: {
          pt:"16px",
          pb:"32px"
        }
      }),
    },
    Button: {
      variants: {
        round: {
          fontFamily: "'logic-monospace', mono",
          fontWeight: "500",
          fontStyle: "normal",
          cursor: "pointer",
          border: "2px solid white",
          color: "white",
          w: { base: "72px", md: "90px"},
          h: { base: "72px", md: "90px"},
          bg: "transparent",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          _hover: {
            bg: "app.hover",
            '.button-text': {
              height: "auto",
              opacity: "1",
            },
          },
          '.button-text': {
            height: "0",
            opacity: "0",
            overflow: "hidden",
            transition: "height 80ms ease-in-out, opacity 200ms ease-in-out",
            fontSize: "1em",
          },
          svg: {
            fill: "var(--white)",
            width: "24px",
            height: "24px",
          },
        },
      },
    },
  },
});