import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
//speech recognition
import "@babel/polyfill";
import { SpeechProvider } from "@speechly/react-client";

// 1. import `ChakraProvider` component
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};
const theme = extendTheme({ colors, breakpoints });

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <SpeechProvider
    appId="1e682f74-b1c9-4c1e-a2bb-8d92c4ad7576"
    debug={true}
    logSegments={false}
    vad={{ enabled: false }}
  >
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </SpeechProvider>
  // </React.StrictMode>
);
