import { BsCartPlus, BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Typography, Radio, Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addToCart, removeOne } from "../../redux/features/cart/cartSlice";
import { TProduct } from "../../types/index.type";

const CartSlider = ({ isCartOpen, onClose }) => {
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
    <section className="">
      <div>
        <div className="bg-white py-2">
          {cartItems.length > 0 ? (
            <>
              <div className=" mx-auto">
                <div className="mb-6">
                  <h2 className="text-gray-800 font-bold text-center">
                    Order Details
                  </h2>
                </div>

                <div className="flex gap-2 flex-col border border-primary-2 rounded-md">
                  {cartItems?.map((product, index) => {
                    return (
                      <div key={index} className=" p-4 my-shadow-1">
                        {/* this is image div  */}
                        <Link
                          to={`/product/${product?._id}`}
                          className="text-xs font-semibold transition duration-150 mb-3 inline-block"
                        >
                          <Typography.Text className="text-primary-2">
                            {product?.name}
                          </Typography.Text>
                        </Link>
                        <div className="flex">
                          <div className="flex gap-8 items-center">
                            <Link
                              className="duration-300 relative"
                              to={`/product/${product?._id}`}
                            >
                              <img
                                className="object-cover object-center h-12 w-12 rounded shadow"
                                src={product?.images?.[0]}
                                alt={product?.name}
                              />

                              <div className="h-[20px] w-[20px] bg-primary-2 rounded-full my-shadow-1 flex items-center justify-center bg-warning text-white absolute -right-2 -top-2">
                                {product?.quantity}
                              </div>
                            </Link>

                            <Radio.Group
                              // value={size}
                              // onChange={(e) => setSize(e.target.value)}
                              className="flex"
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
                                onClick={() => handleIncreaseProduct(product)}
                              >
                                +
                              </Radio.Button>
                            </Radio.Group>

                            <div className="flex-1 ml-3 text-right flex flex-col">
                              <Typography.Text className="text-xs text-gray-500 text-nowrap">
                                Tk {product?.price}
                              </Typography.Text>
                              <Typography.Text className="text-xs text-gray-500 text-nowrap">
                                x {product?.quantity}
                              </Typography.Text>

                              <Typography.Text className="text-xs text-gray-500 text-nowrap">
                                Tk {(product.price * product.stock).toFixed(2)}{" "}
                              </Typography.Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex mt-5 border border-primary-2 rounded-md my-shadow-1 flex-col items-end ">
                  <div className="w-full  ">
                    <div className="space-y-1 px-4 py-2">
                      <div className="flex justify-between text-gray-500 gap-1">
                        <span>Subtotal</span>
                        <span>Tk {totalAmount.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-gray-500 gap-1">
                        <span>Shipping</span>
                        <span>Tk 4.99</span>
                      </div>
                    </div>

                    <div className="border-t mt-2 ">
                      <div className="flex px-4 justify-between items-start text-gray-800 gap-1">
                        <span className=" font-bold">Total</span>

                        <span className="flex flex-col items-end ">
                          <span className=" font-bold ">
                            Tk {totalAmount.toFixed(2)}
                          </span>
                          <span className="text-gray-500 text-sm ">
                            including Vat Tax
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue shopping button here  */}
                <div className="flex gap-3 mt-8 flex-col">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    // className="flex justify-center mt-10 items-center gap-3 right-0 mx-auto text-center py-2 bg-slate-200 hover:bg-slate-300 duration-300 text-slate-600 w-full"
                  >
                    <button className="btn-outline-one !py-2 !w-full text-center">
                      <BsCartPlus /> View Cart
                    </button>
                    {/* <BsCartPlus className="text-xl text-slate-600"></BsCartPlus> */}
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    // className="flex justify-center transition items-center gap-3 right-0 mx-auto text-center py-2 bg-orange-500 hover:bg-orange-600 duration-300 text-orange-50 font-semibold w-full"
                  >
                    <Button
                      className="btn-one !py-2 !w-full"
                      icon={<BsArrowRightCircle />}
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* when cart is emty */}
              <div className="flex flex-col mt-20 justify-start items-center gap-5">
                <div className="text-2xl text-slate-500 border border-primary-2 rounded-full p-4 bg-slate-100">
                  <BsCartPlus />
                </div>
                <div className="flex flex-col gap-3">
                  <p className=" text-slate-600 text-center capitalize">
                    Order cart is{" "}
                    <span className="text-primary-2 font-semibold">Empty</span>
                  </p>
                  {/* <Link className="mt-5" to="/">
                    <button className="inline-block bg-orange-500 hover:bg-orange-600 active:bg-orange-700 focus-visible:ring ring-orange-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                      Continue to Shopping
                    </button>
                  </Link> */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartSlider;
