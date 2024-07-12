import { useEffect } from "react";
import { Button, Typography, Radio, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "../../redux/features/cart/cartSlice";
import EmptyCart from "../helpingCompo/EmptyCart";
import { CheckCircleFilled } from "@ant-design/icons";
import { FaXmark } from "react-icons/fa6";
// import PrimaryButton from "../../../shared/Button/PrimaryButton";

const CartCompo = () => {
  const { products:cartItems, total:totalAmount } = useSelector((state) => state.cart);
  // const cartItems = useSelector((state) => state.cart.products);
  // const totalAmount = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  // Store the cart items in the local storage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("total", totalAmount.toString());
  }, [cartItems, totalAmount]);

  return (
    <section>
      <div className="bg-white py-6 sm:py-8 lg:py-12 ">
        {cartItems?.length > 0 ? (
          <>
            <div className=" max-w-screen-lg  px-4 md:px-8 mx-auto ">
              <div className="mb-6 sm:mb-10 lg:mb-16 ">
                <h2 className=" text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                  Order Details
                </h2>
              </div>

              <div className="flex flex-col gap-4 md:gap-6 mb-6 sm:mb-8 ">
                {cartItems?.map((product, index) => {
                  return (
                    <div
                      key={index.id}
                      className="flex flex-wrap overflow-hidden gap-x-4 sm:gap-y-4 lg:gap-6"
                    >
                      <Link
                        to={`/product/${product?._id}`}
                        className="group w-32 sm:w-40 sm:h-56 block overflow-hidden relative"
                      >
                        <Image
                          src={product?.images?.[0]?.url}
                          loading="lazy"
                          alt=" by Thái An"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200 rounded"
                        />
                      </Link>

                      <div className="flex flex-col flex-1 py-4 space-y-2">
                        <div>
                          <Link
                            to={`/product/${product?._id}`}
                            className="inline-block text-gray-700 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100"
                          >
                            <Typography.Text>{product?.title}</Typography.Text>
                          </Link>

                        </div>

                        <div>
                          <p className="block text-gray-800 md:text-lg font-bold">
                            <Typography.Text className="font-bold">
                            ৳{product?.price}
                            </Typography.Text>
                          </p>


                          <p className="flex items-center text-gray-500 text-sm gap-1">
   
                            {
                              product?.quantity > 0 ? <span className="flex items-center gap-1"><CheckCircleFilled className="text-green-500"/> In stock</span> : <span className="flex items-center gap-1"><FaXmark className="text-red-500"/> Out of stock</span>
                            }
                          </p>

                          {product?.quantity > 0 && <Typography.Text className="block">Quantity: {product?.quantity}</Typography.Text>}

                          <Typography.Text className="inline-block">
                            Total Price: TK {" "}
                            {(product.price * product.quantity).toFixed(2)}{" "}
                          </Typography.Text>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto flex justify-between border-t sm:border-none p-4 sm:pl-0 lg:p-6 lg:pl-0">
                        <div className="flex flex-col items-start gap-2">
                          <div className=" flex border rounded overflow-hidden">
                            <Radio.Group
                            >
                              <Radio.Button
                                value="large"
                                onClick={() => dispatch(removeOne(product))}
                              >
                                -
                              </Radio.Button>
                              <Radio.Button value="default" disabled>
                                {product?.quantity}
                              </Radio.Button>
                              <Radio.Button
                                value="small"
                                onClick={() => dispatch(addToCart(product))}
                              >
                                +
                              </Radio.Button>
                            </Radio.Group>
                          </div>

                          <Button
                            block
                            type="primary"
                            onClick={() => dispatch(removeFromCart(product))}
                            // className="text-[#93278F] hover:text-[#852082] text-sm font-semibold select-none transition duration-100"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col items-end gap-4 ">
                <div className="w-full sm:max-w-xs bg-gray-100 rounded-lg p-4">
                  <div className="space-y-1 ">
                    <div className=" flex justify-between  text-gray-500 gap-4">
                      <span>Subtotal</span>
                      <span>{totalAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-500 gap-4 ">
                      <span>Shipping</span>
                      <span>$4.99</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 ">
                    <div className="flex justify-between  items-start text-gray-800 gap-4">
                      <span className="text-lg font-bold ">Total</span>

                      <span className="flex flex-col items-end ">
                        <span className="text-lg font-bold">
                          ${totalAmount.toFixed(2)}
                        </span>
                        <span className="text-gray-500 text-sm">
                          including VAT
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <Link to={`/checkout`}>
                  <Button type="primary" block icon={<BsArrowRightCircle />}>
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* when cart is empty */}
           <EmptyCart/>
          </>
        )}
      </div>
    </section>
  );
};

export default CartCompo;
