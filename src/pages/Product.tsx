import { Button, Card, Empty, message, Skeleton, Tabs, Typography } from "antd";
import ReactImageMagnify from "react-image-magnify";
import { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { FaBangladeshiTakaSign, FaCarSide } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { ShoppingFilled } from "@ant-design/icons";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "../redux/features/product/productApi";
import ProductCard from "../components/Products/ProductCard";
import { TProduct } from "../types/index.type";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useAppDispatch } from "../redux/hook";

const ProductDetails = () => {
  const { id } = useParams();
  const [activeMagnifyImg, setActiveMagnifyImg] = useState("");

  const { data: product, isLoading: isLoadingProduct } =
    useGetSingleProductQuery(id);
  const { data: similarProducts, isLoading: isSimilarProductsLoading } =
    useGetAllProductsQuery(
      { filters: { category: [product?.data?.category?._id] } },
      { skip: !product?.data?.category?._id || isLoadingProduct }
    );
  const { data: products, isLoading: isProductsLoading } =
    useGetAllProductsQuery(null);

  const dispatch = useAppDispatch();

  const { name, description, price, images, category, stock } =
    product?.data || {};

  // descriptions and features items
  const items = [
    {
      key: "1",
      label: "Description",
      children: <span>{description}</span>,
    },
  ];

  // Set first image to default magnify img
  useEffect(() => {
    if (images?.[0]?.url) {
      setActiveMagnifyImg(images[0]?.url);
    }
  }, [images]);

  const handleAddToCart = (product: TProduct) => {
    if (Number(product.stock) === 0) {
      message.error("Out of stock");
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <section>
      <div className=" py-4 md:py-8">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          {
            <>
              <div className="grid md:grid-cols-2 gap-6 my-shadow-1 p-4 rounded">
                {/* Image part */}
                {isLoadingProduct ? (
                  <Skeleton.Button className="!h-[400px] !w-full" />
                ) : (
                  <div className="grid lg:grid-cols-5 gap-4 p-2">
                    <div className=" order-first lg:order-none gap-4">
                      <div className="rounded-lg overflow-hidden flex lg:flex-col flex-wrap justify-center gap-4">
                        {images &&
                          images?.length > 0 &&
                          images?.map((img: string, ind: number) => {
                            return (
                              <div
                                key={ind}
                                className={`border border-slate-300 mb-2  `}
                                onClick={() => setActiveMagnifyImg(img)}
                                onMouseMove={() => setActiveMagnifyImg(img)}
                              >
                                <img
                                  src={img}
                                  loading="lazy"
                                  alt="Product img"
                                  className={`w-[100px] h-full object-cover object-center ${
                                    img === activeMagnifyImg
                                      ? "border-4 border-success"
                                      : ""
                                  }`}
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="lg:col-span-4 fluid__image-container z-20 rounded-lg">
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: name,
                            isFluidWidth: true,
                            src: activeMagnifyImg || images?.[0],
                          },
                          largeImage: {
                            alt: name,
                            src: activeMagnifyImg || images?.[0],
                            width: 600,
                            height: 1200,
                          },
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Informative data */}
                <div className="p-2">
                  {isLoadingProduct ? (
                    <Skeleton.Button className="!h-10 !w-full" />
                  ) : (
                    <Typography.Title level={3}>{name}</Typography.Title>
                  )}
                  {isLoadingProduct ? (
                    <Skeleton.Button className="!h-10 !w-full" />
                  ) : (
                    <div className="w-ful flex gap-4 mb-4">
                      <Typography.Text>
                        Category: {category?.name}
                      </Typography.Text>{" "}
                    </div>
                  )}

                  {/* Specifications */}
                  <div>
                    <div className="text-lg font-bold text-slate-500">
                      <Typography.Text>Specifications:</Typography.Text>
                    </div>
                    <div>
                      <div className="flex gap-4 mb-1">
                        <div className="flex-1 max-w-[200px] font-semibold text-gray-600">
                          <Typography>Price :</Typography>
                        </div>
                        <div className="flex-1 text-gray-500">
                          <Typography>Tk {price}</Typography>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-1">
                        <div className="flex-1 max-w-[200px] font-semibold text-gray-600">
                          <Typography>Model :</Typography>
                        </div>
                        <div className="flex-1 text-gray-500">
                          <Typography>MI-EKY18</Typography>
                        </div>
                      </div>
                      <div className="flex gap-4 mb-1">
                        <div className="flex-1 max-w-[200px] font-semibold text-gray-600">
                          <Typography>Available quantity:</Typography>
                        </div>
                        <div className="flex-1 text-gray-500">
                          <Typography>{stock}</Typography>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-end gap-2">
                      <p className=" font-semibold text-lg">
                        <span className="!text-primary-2">৳ {price}</span>
                      </p>
                    </div>

                    <span className="text-gray-500 text-sm">
                      <Typography.Text>
                        {" "}
                        incl. VAT plus shipping{" "}
                      </Typography.Text>
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 gap-2 mb-6">
                    <FaCarSide size={24} />

                    <span className="text-sm"></span>
                    <Typography.Text> 2-4 days shipping</Typography.Text>
                  </div>

                  {/* CTA btn */}
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => handleAddToCart(product?.data)}
                      icon={<BsCartPlus />}
                      type="default"
                      color="primary"
                      className="btn-outline-one"
                    >
                      Add to cart
                    </Button>
                    <Button
                      icon={<ShoppingFilled />}
                      type="default"
                      color="primary"
                      className="btn-one"
                    >
                      Buy now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Description and features */}
              <div className="py-3 px-5 mt-10 my-shadow-1 rounded-md">
                {isLoadingProduct ? (
                  <Skeleton.Button className="!h-[250px] !w-full" />
                ) : (
                  <Tabs defaultActiveKey="1" items={items} />
                )}
              </div>

              {/* Discover similar items [products- carousel] */}
              <div className="my-10 p-5 shadow-md">
                <p className="py-2 font-bold">Discover similar items</p>
                {isSimilarProductsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Skeleton.Button className="!h-[200px] !w-full" />
                    <Skeleton.Button className="!h-[200px] !w-full" />
                    <Skeleton.Button className="!h-[200px] !w-full" />
                  </div>
                ) : similarProducts?.meta?.total === 0 ? (
                  <Empty description="No products found!" />
                ) : (
                  <Swiper
                    breakpoints={{
                      // when window width is >= 640px
                      640: {
                        width: 640,
                        slidesPerView: 1,
                      },
                      // when window width is >= 768px
                      768: {
                        width: 768,
                        slidesPerView: 3,
                      },
                    }}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper !pb-8"
                  >
                    {similarProducts?.data?.map(
                      (product: TProduct, ind: number) => (
                        <SwiperSlide key={ind}>
                          <ProductCard product={product} />
                        </SwiperSlide>
                      )
                    )}
                  </Swiper>
                )}
              </div>

              {/* You may also like [products- carousel] */}
              <div className="my-10 p-5 shadow-md">
                <p className="py-2 font-bold">You may also like</p>

                {isProductsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Skeleton.Button className="!h-[200px] !w-full" />
                    <Skeleton.Button className="!h-[200px] !w-full" />
                    <Skeleton.Button className="!h-[200px] !w-full" />
                  </div>
                ) : products?.meta?.total === 0 ? (
                  <Empty description="No products found!" />
                ) : (
                  <Swiper
                    breakpoints={{
                      // when window width is >= 640px
                      640: {
                        width: 640,
                        slidesPerView: 1,
                      },
                      // when window width is >= 768px
                      768: {
                        width: 768,
                        slidesPerView: 3,
                      },
                    }}
                    spaceBetween={30}
                    grabCursor={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper !pb-8"
                  >
                    {products?.data?.map((product: TProduct, ind: number) => (
                      <SwiperSlide key={ind}>
                        <ProductCard product={product} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
