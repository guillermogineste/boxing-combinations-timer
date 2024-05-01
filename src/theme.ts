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
});