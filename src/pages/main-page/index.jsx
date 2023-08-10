import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import { LiaStackExchange } from "react-icons/lia";
import { BsFillMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { fetchLanguages, getTranslatedText } from "../../redux/actions";
import { resetTranslations } from "../../redux/translateSlice";
// Import the required hook from the Speechly library
import { useSpeechContext } from "@speechly/react-client";

// Main component
export default function MainPage() {
  // Destructure values from the Speechly context
  const { segment, listening, attachMicrophone, start, stop } =
    useSpeechContext();

  const dispatch = useDispatch();
  // Store state is fetched using the useSelector hook
  const state = useSelector((store) => store);

  // Fetch supported languages on component mount
  useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  // Create options array for language selection
  const options = state.languages.map((lang) => ({
    value: lang.code,
    label: lang.name,
  }));

  // Initialize states
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [langAlert, setLangAlert] = useState(false);

  // Listen for Enter key press to trigger translation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        translate();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [text, sourceLang, targetLang]);

  // Store and manage transcripts from the speech recognition
  const [transcripts, setTranscripts] = useState([]);

  // Handle recording button click
  const handleRecordBtnClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
      setLangAlert(true);

    }
  };

  // Process speech recognition segment
  useEffect(() => {
    if (segment) {
      const transcript = segment.words.map((word) => word.value).join(" ");
      console.log("transcript", transcript);
      setText(transcript);
      setLangAlert(false);
    }
  }, [segment]);

  const translate = () => {
    console.log("Input text:", text);
    if (text.trim() === "" || !sourceLang || !targetLang) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);
      const selectedSourceLangValue = sourceLang.value;
      const selectedTargetLangValue = targetLang.value;
      dispatch(
        getTranslatedText({
          text,
          sourceLang: selectedSourceLangValue,
          targetLang: selectedTargetLangValue,
        })
      );
    }
  };

  // Handle change button click for language swap
  const handleChangeBtnClick = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    dispatch(resetTranslations());
    setText("");
  };

  return (
    <Container
      p={5}
      minW="100vw"
      minH={"100vh"}
      bg="gray.400"
      color="#262626"
      centerContent
      fontFamily={"mono"}
      fontSize={"2xl"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Center m={5}>
        <Heading
          fontSize={"3rem"}
          fontFamily={"heading"}
          letterSpacing={3}
          pos={"relative"}
        >
          Text Translator &nbsp;
          <Text
            color={"blue.900"}
            display={"inline-block"}
            fontFamily={"serif"}
          >
            {/* Stack Exchange icon */}
            <LiaStackExchange />
          </Text>
        </Heading>
      </Center>

      <Box
        padding="0.5"
        shadow={"md"}
        bg="Highlight"
        color="black"
        maxW="2xl"
        borderRadius={5}
      >
        <HStack flexShrink={1}>
          <Box w={[300, 400, 500]} pos={"relative"}>
            {/* Source language selection */}
            <Select
              name="sourceLang"
              value={sourceLang}
              onChange={(e) => setSourceLang(e)}
              placeholder="Select a language"
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  primary25: "hotpink",
                  primary: "blue",
                },
              })}
            />
            {/* Input text area */}
            <Textarea
              bg="Background"
              mt={0.5}
              name="text"
              value={text}
              // overflow={"hidden"}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here."
              size="lg"
              resize={"none"}
              minH={"50vh"}
            />
          </Box>
          <VStack alignSelf={"start"} gap={3}>
            {/* Swap button */}
            <Button
              colorScheme="pink"
              size="lg"
              maxH={"40px"}
              onClick={handleChangeBtnClick}
            >
              <h3>
                <FaExchangeAlt />
              </h3>
            </Button>
            {/* Microphone button */}
            <Button
              colorScheme="pink"
              size="lg"
              maxH={"40px"}
              onClick={handleRecordBtnClick}
            >
              {listening ? <BsFillMicFill /> : <BsFillMicMuteFill />}
            </Button>
          </VStack>
          <Box w={[300, 400, 500]}>
            {/* Target language selection */}
            <Select
              name="targetLang"
              value={targetLang}
              onChange={(e) => setTargetLang(e)}
              placeholder="Select a language"
              options={options}
              theme={(theme) => ({
                ...theme,
                borderRadius: 5,
                colors: {
                  ...theme.colors,
                  primary25: "hotpink",
                  primary: "blue",
                },
              })}
            />
            {/* Translated text area */}
            <Textarea
              mt={0.5}
              bg={"Background"}
              value={state.translations}
              placeholder="Translated text will appear here."
              size="lg"
              resize={"none"}
              minH={"50vh"}
            />
          </Box>
        </HStack>
        <Stack mt={1} fontSize={"lg"}>
          {/* Translate button */}
          <Button
            fontSize={"-moz-initial"}
            colorScheme="pink"
            onClick={translate}
          >
            Translate
          </Button>
          {/* Show alert for empty text or missing language */}
          {showAlert && (
            <Box>
              <Alert status="warning" mt={3}>
                <AlertIcon />
                Text is empty or language is not selected. Translation request
                will not be sent.
              </Alert>
            </Box>
          )}
          {/* Show alert for error */}
          {state.isError && (
            <Box>
              <Alert status="warning" mt={3}>
                <AlertIcon />
                An error has occurred.
              </Alert>
            </Box>
          )}
          {langAlert && (
            <Alert status="warning" mt={3}>
              <AlertIcon />
             English supported.
            </Alert>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
