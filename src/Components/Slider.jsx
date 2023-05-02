import React, { useEffect, useRef, useState } from "react";
import data from "../data.json";
import "../App.css";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <>
      <div>
        {data.map((slide, index) => {
          return (
            <div key={index}>
              {index == current && (
                <div className="maindiv">
                  <div className="imagediv">
                    <img className="image" src={slide.img} alt="images" />
                  </div>
                  <div className="datadiv">
                    <p className="title">{slide.title}</p>
                    <p className="description">{slide.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="buttondiv">
        <FcPrevious onClick={prevbtn} />

        <span>
          {current} of {length}
        </span>

        <FcNext onClick={nextbtn} />
      </div>
      {!isPlaying ? (
        <BsFillPlayCircleFill className="play" onClick={handlePlayPauseClick} />
      ) : (
        <BsPauseCircleFill className="play" onClick={handlePlayPauseClick} />
      )}
    </>
  );
};

export default Slider;
