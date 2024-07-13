import { Button } from "antd";
import React from "react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";

const Benefit = () => {
  return (
    <div
      className="bg-cover bg-center h-[70vh] bg-fixed rounded-md"
      style={{
        backgroundImage: `url(${"https://png.pngtree.com/thumb_back/fw800/background/20230720/pngtree-fitness-room-ambiance-wooden-parquet-floor-with-training-equipment-and-black-image_3712622.jpg"})`,
      }}
    >
      <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
        <div className="text-center text-white space-y-3 w-4/6 md:w-3/6 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Our Benefits</h1>
          <p className=" text-grey">
            Using fitness products enhances workout performance and
            effectiveness, prevents injuries through better support, offers the
            convenience of home workouts, and saves time. These products keep
            you motivated with diverse exercises and help track and monitor your
            fitness progress, leading to better overall health and well-being.
          </p>
          <div className="flex items-center gap-1 justify-center">
            <Button type="dashed">
              <Link to={"/about"}>About us</Link>
            </Button>
            <Button type="primary">
              <Link to={"/products"}>Shop now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
