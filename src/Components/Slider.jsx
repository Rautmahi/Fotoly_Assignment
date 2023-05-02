import React, { useEffect, useState } from "react";
import data from "../data.json";
import "../App.css";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Box from '@mui/material/Box';



const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [next, setNext] = useState(0);

  const [play, setPlay] = useState(null);

  const length = data.length;

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setCurrent((prevIndex) =>
          prevIndex === length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
      setPlay(id);
    } else {
      clearInterval(play);
    }
  }, [isPlaying, length]);

  const handlePlayPauseClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  // console.log(length);

  const nextbtn = () => {
    setCurrent(current == length - 1 ? 0 : current + 1);
  };

  const prevbtn = () => {
    setCurrent(current == 0 ? length - 1 : current - 1);
  };
  // for slide button

  const nextslide = () => {
    setNext(next == length - 1 ? 0 : next + 1);
  };

  const prevslide = () => {
    setNext(next == 0 ? length - 1 : next - 1);
  };
  return (
    <>
      {/* maindiv data */}
      <Box>
        {data.map((slide, index) => {
          return (
            <Box key={index}>
              {index == current && (
                <Box className="maindiv">
                  <Box className="imagediv">
                    <img className="image" src={slide.img} alt="images" />
                  </Box>
                  <Box className="datadiv">
                    <p className="title">{slide.title}</p>
                    <p className="description">{slide.description}</p>
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* mini silder */}
      <Box className="main_thumbnail">
        <BsArrowLeftSquareFill onClick={prevslide} />
        <Box className="thumbnailimages">
          {data.map((slide, index) => {
            return (
              <Box key={index}>
                <Box className="sliderdiv">
                  <img className="slideimage" src={slide.img} alt="images" />
                </Box>
              </Box>
            );
          })}
        </Box>

        <BsArrowRightSquareFill onClick={nextslide} />

        {/* play and pause button */}
        <Box className="playpausebtn">
          {!isPlaying ? (
            <BsFillPlayCircleFill
              className="play"
              onClick={handlePlayPauseClick}
            />
          ) : (
            <BsPauseCircleFill
              className="play"
              onClick={handlePlayPauseClick}
            />
          )}
        </Box>
      </Box>
      <Box className="buttondiv">
        <FcPrevious onClick={prevbtn} />
        <span>
          {current+1} of {length}
        </span>
        <FcNext onClick={nextbtn} />
      </Box>
    </>
  );
};

export default Slider;
