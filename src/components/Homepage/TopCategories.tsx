import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card, Empty, Skeleton } from "antd";
import { FcRating } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import CommonSectionBanner from "../helpingCompo/CommonSectionBanner";
import { useGetAllCategoryQuery } from "../../redux/features/category/categoryApi";
import { TCategory } from "../../types/index.type";
import Container from "../ui/Container";

// TODO: add appropriate top categories
const TopCategories = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useGetAllCategoryQuery(null);

 return (
    <div className="py-8 md:py-10">
      <Container>
        <div className="bg-white my-shadow-1 rounded-md p-4 space-y-6">
          <CommonSectionBanner
            title={
              <>
                <span className="h-7 w-7 text-md rounded-full bg-primary-2 flex items-center justify-center">
                  <FcRating />
                </span>{" "}
                Top Categories
              </>
            }
          />
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Skeleton.Button className="!h-[150px] !w-full" />
              <Skeleton.Button className="!h-[150px] !w-full" />
              <Skeleton.Button className="!h-[150px] !w-full" />
              <Skeleton.Button className="!h-[150px] !w-full" />
            </div>
          ) : // TODO
          false ? (
            <div>
              <Empty />
            </div>
          ) : (
            <Swiper
              breakpoints={{
                // when window width is >= 640px
                640: {
                  width: 640,
                  slidesPerView: 2,
                },
                // when window width is >= 768px
                768: {
                  width: 768,
                  slidesPerView: 3,
                },
                // when window width is >= 1024px
                1024: {
                  width: 1024,
                  slidesPerView: 4,
                },
              }}
              grabCursor={true}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper !pb-8"
            >
              {categories?.data?.map((category: TCategory, ind: any) => (
                <SwiperSlide key={ind}>
                  <Card
                    className="min-h-[200px] relative !p-0 pb-10 cursor-pointer space-y-4 text-center"
                    onClick={() => navigate(`/products?category=${category._id}`)}
                  >
                    <img
                      className="h-[150px] w-full"
                      src={category?.icon}
                      alt={category?.name}
                    />
                    <h2 className="font-semibold  text-lg md:text-xl mb-2 truncate">
                      {category.name}
                    </h2>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </div>
  );
};

export default TopCategories;
