import "./App.css";
import React from "react";
import { Box, Typography, Button, Stack, Slider } from "@mui/material";
import { useState, useEffect } from "react";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

const drumPads = [
  {
    keyCode: 81,
    text: "Q",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    id: "Heater-1",
  },
  {
    keyCode: 87,
    text: "W",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    id: "Heater-2",
  },
  {
    keyCode: 69,
    text: "E",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    id: "Heater-3",
  },
  {
    keyCode: 65,
    text: "A",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    id: "Heater-4",
  },
  {
    keyCode: 83,
    text: "S",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    id: "Clap",
  },
  {
    keyCode: 68,
    text: "D",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    id: "Open-HH",
  },
  {
    keyCode: 90,
    text: "Z",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    id: "Kick-n'-Hat",
  },
  {
    keyCode: 88,
    text: "X",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    id: "Kick",
  },
  {
    keyCode: 67,
    text: "C",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    id: "Closed-HH",
  },
];
function App() {
  const [sounds, setSounds] = useState(drumPads);
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [keyActive, setKeyActive] = useState("");
  const [onOff, setOnOff] = useState(true);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (drumPads.some((pad) => pad.text === e.key.toUpperCase())) {
        playSound(e.key);
      }
    });
  }, [keyActive]);
  function displaykeyCorde(key) {
    const rightPad = drumPads.filter((pad) => {
      return pad.text === key.toUpperCase();
    });
    return rightPad[0].id;
  }
  const playSound = (e) => {
    const soundPlay = document.getElementById(e.toUpperCase());
    soundPlay.play();
    setKeyActive(e);
  };

  const setKeyVolume = () => {
    const audios = drumPads.map((sound) => document.getElementById(sound.text));
    audios.forEach((audio) => {
      if (audio && onOff) {
        audio.volume = value / 100;
      } else if (audio) {
        audio.volume = 0;
      }
    });
  };

  return (
    <Stack
      direction="row"
      className="App"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "44vh",
        backgroundImage: "linear-gradient(45deg, #e74c3c, #8e44ad, #f1c40f)",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      {setKeyVolume()}
      <Box id="drum-machine" sx={{}}>
        <Box id="display">
          {" "}
          {keyActive ? (
            <Typography textAlign="center" color="white" variant="h5">
              {displaykeyCorde(keyActive)}
            </Typography>
          ) : null}
        </Box>
        <Box
          id="drum-pads"
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {drumPads.map((pad) => (
            <Button
              sx={{
                border: "none",
                margin: 1,
                width: { s: 80, lg: 250, xs: 50, md: 150, xl: 400 },
                height: 65,
                borderRadius: 6,
                textTransform: "uppercase",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                cursor: "pointer",
                color: "#fff",
                backgroundSize: "200%",
                transition: "0.4s",
                "&:hover": {
                  backgroundPosition: "right",
                },
                backgroundImage:
                  "linear-gradient(45deg, #FFC312, #EE5A24, #00A8FF)",
              }}
              disabled={onOff ? false : true}
              className="drum-pad"
              id={pad.src}
              onClick={() => {
                playSound(pad.text, sounds);
              }}
            >
              {pad.text}
              <audio className="clip" id={pad.text} src={pad.src}></audio>
            </Button>
          ))}
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <VolumeDown />
          <Slider
            disabled={onOff ? false : true}
            aria-label="Volume"
            value={value}
            onChange={handleChange}
          />
          <VolumeUp />{" "}
        </Stack>{" "}
        <Stack direction="row">
          <Button
            sx={{
              height: "50%",
              width: "50%",
              backgroundColor: onOff ? "red" : "green",
              borderRadius: 6,
              color: "white",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              "&:hover": {
                backgroundColor: "blue",
              },
            }}
            onClick={() => {
              setOnOff(!onOff);
            }}
          >
            {onOff ? "OFF" : "ON"}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}

export default App;
