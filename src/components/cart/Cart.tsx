import {
  Button,
  Typography,
  Radio,
  Image,
  Empty,
  message,
  Popconfirm,
} from "antd";

import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  addToCart,
  removeFromCart,
  removeOne,
} from "../../redux/features/cart/cartSlice";
import { CheckCircleFilled } from "@ant-design/icons";
import { FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { TProduct } from "../../types/index.type";

const CartCompo = () => {
  const { products: cartItems, total: totalAmount } = useAppSelector(
    (state) => state.cart
  );

  const dispatch = useAppDispatch();

  const handleIncreaseProduct = (product: TProduct) => {
    const existProduct = cartItems.find((item) => item._id === product._id);

    if (product.stock > existProduct.quantity) {
      dispatch(addToCart(product));
      message.success("Quantity increased");
      return;
    }
    message.error("Out of stock");
  };

  return (
    <section>
      <div className="bg-white py-6 sm:py-8 lg:py-12 ">
        {cartItems?.length > 0 ? (
          <>
            <div className=" max-w-screen-lg  px-4 md:px-8 mx-auto ">
              <div className="mb-6 sm:mb-10 lg:mb-16 ">
                <h2 className=" text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
                  Products ready to checkout
                </h2>
              </div>

              <div className="flex flex-col gap-4 md:gap-6 mb-6 sm:mb-8 ">
                {cartItems?.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-wrap items-center overflow-hidden gap-x-4 sm:gap-y-4 lg:gap-6 rounded my-shadow-1"
                    >
                      <Link
                        to={`/product/${product?._id}`}
                        className="group w-32 sm:w-40 sm:h-56 overflow-hidden relative flex items-center justify-center"
                      >
                        <Image
                          src={product?.images?.[0]}
                          loading="lazy"
                          alt={product?.name}
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
                            {product?.stock > 0 ? (
                              <span className="flex items-center gap-1">
                                <CheckCircleFilled className="text-green-500" />{" "}
                                In stock
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <FaXmark className="text-red-500" /> Out of
                                stock
                              </span>
                            )}
                          </p>

                          {product?.stock > 0 && (
                            <Typography.Text className="block">
                              Stock: {product?.stock}
                            </Typography.Text>
                          )}

                          <Typography.Text className="block">
                            Quantity: {product?.quantity}
                          </Typography.Text>

                          <Typography.Text className="inline-block">
                            Total Price: TK{" "}
                            {(product.price * product.stock).toFixed(2)}{" "}
                          </Typography.Text>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto flex justify-between border-t sm:border-none p-4 sm:pl-0 lg:p-6 lg:pl-0">
                        <div className="flex flex-col items-start gap-2">
                          <div className=" flex border rounded overflow-hidden">
                            <Radio.Group>
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
                                onClick={() => handleIncreaseProduct(product)}
                              >
                                +
                              </Radio.Button>
                            </Radio.Group>
                          </div>

                          <Popconfirm
                            title="Are you sure you want to delete this product from cart?"
                            onConfirm={() => dispatch(removeFromCart(product))}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              block
                              type="primary"
                            >
                              Delete
                            </Button>
                          </Popconfirm>
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
                      <span>BDT {totalAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-500 gap-4 ">
                      <span>Shipping</span>
                      <span>BDT 0</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4 ">
                    <div className="flex justify-between  items-start text-gray-800 gap-4">
                      <span className="text-lg font-bold ">Total</span>

                      <span className="flex flex-col items-end ">
                        <span className="text-lg font-bold">
                          BDT {totalAmount.toFixed(2)}
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
            <Empty description="Cart is empty" />
          </>
        )}
      </div>
    </section>
  );
};

export default CartCompo;
