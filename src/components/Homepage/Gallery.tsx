import React from "react";
import { Gallery as GridGallery } from "react-grid-gallery";
import Container from "../ui/Container";
import CommonSectionBannerTwo from "../helpingCompo/CommonSectionBannerTwo";
import MyMotion from "../helpingCompo/MyMotion";

const Gallery = () => {
  const images = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj4oZd6uTtqNfpfCnLwKUUKlMRUtN2EwH6eQ&s",
      width: 320,
      height: 212,
      caption: "High-End Treadmill for Cardio Workouts",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYc0rsdEY_4wdlhiKybooi_h-BSreDtXvJzg&s",
      width: 320,
      height: 212,
      caption: "Set of Dumbbells for Strength Training",
    },
    {
      src: "https://thumbs.dreamstime.com/b/bodybuilder-woman-boxer-girl-big-muscles-funny-cute-cartoon-d-illustration-white-background-creative-avatar-bodybuilder-296434774.jpg",
      width: 320,
      height: 212,
      caption: "Delicious Protein Shake for Post-Workout Recovery",
    },
    {
      src: "https://thumbs.dreamstime.com/b/d-avatar-bodybuilder-trainer-white-background-d-avatar-bodybuilder-trainer-white-background-312497889.jpg",
      width: 320,
      height: 212,
      caption: "Premium Yoga Mat for Flexibility Exercises",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_CELG5ELkKLf7pgIBVAwjlsImdCxKy7Nkw&s",
      width: 320,
      height: 320,
      caption: "Comfortable Running Shoes for Outdoor Runs",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTIqxriddzZIafzb-GuUXtCw_7bS864_LE3A&s",
      width: 320,
      height: 312,
      caption: "Advanced Fitness Tracker for Monitoring Progress",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR--zUReqnHvEvfn59dkq3dRNl1PTDdOTWtYA&s",
      width: 320,
      height: 212,
      caption: "Versatile Resistance Bands for Full-Body Workouts",
    },
    {
      src: "https://cdn.openart.ai/stable_diffusion/63f7ec117be00e73b0246a625029ccd0b7f0943c_2000x2000.webp",
      width: 320,
      height: 212,
      caption: "Heavy-Duty Kettlebell for Functional Strength Training",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQWQPdwxDYRgoB3uA20Qi9t7PtKZB6fg8Smg&s",
      width: 320,
      height: 274,
      caption: "Dynamic Spin Bike for Indoor Cycling Sessions",
    },
    {
      src: "https://cdn.openart.ai/stable_diffusion/dfe794c3fc6c2819d7959cd2d0d9ecb010950790_2000x2000.webp",
      width: 320,
      height: 212,
      caption: "Convenient Meal Prep Containers for Healthy Eating",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb_CELG5ELkKLf7pgIBVAwjlsImdCxKy7Nkw&s",
      width: 320,
      height: 212,
      caption: "Spacious Gym Bag for Carrying Fitness Essentials",
    },
    {
      src: "https://cdn.openart.ai/stable_diffusion/63f7ec117be00e73b0246a625029ccd0b7f0943c_2000x2000.webp",
      width: 320,
      height: 150,
      caption: "Accurate Weight Scale for Tracking Progress",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj4oZd6uTtqNfpfCnLwKUUKlMRUtN2EwH6eQ&s",
      width: 320,
      height: 212,
      caption: "High-End Treadmill for Cardio Workouts",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYc0rsdEY_4wdlhiKybooi_h-BSreDtXvJzg&s",
      width: 320,
      height: 212,
      caption: "Set of Dumbbells for Strength Training",
    },
    {
      src: "https://cdn.openart.ai/stable_diffusion/63f7ec117be00e73b0246a625029ccd0b7f0943c_2000x2000.webp",
      width: 320,
      height: 212,
      caption: "Set of Dumbbells for Strength Training",
    },
   
  ];

  return (
    <div className="p-4">
      <Container>
        <CommonSectionBannerTwo
          title="Fitness gallery"
          subTitle="Explore our range of high-quality fitness products designed to help you achieve your health and wellness goals."
        />

        <br />
        <br />
        <MyMotion y={50} scale={1.2}>
          <GridGallery
            images={images}
            enableImageSelection={false}
            rowHeight={200}
            margin={10}
          />
        </MyMotion>
      </Container>
    </div>
  );
};

export default Gallery;
