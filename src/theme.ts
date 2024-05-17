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
  },
});