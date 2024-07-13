/* eslint-disable react/prop-types */
import { Button, Card, message, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { TProduct } from "../../types/index.type";
import { useAppSelector } from "../../redux/hook";

type TProductCard = {
  product: TProduct;
};

const ProductCard: React.FC<TProductCard> = ({ product }) => {
  const dispatch = useDispatch();
  const { products: cartItems } = useAppSelector((state) => state.cart);

  const handleAddToCart = (product: TProduct) => {
    const existProduct = cartItems.find((item) => item._id === product._id);

    if (
      product?.stock > (existProduct?.quantity || 0) &&
      Number(product.stock) != 0
    ) {
      dispatch(addToCart(product));
      message.success("Product added to cart");
      return;
    }

    message.error("Out of stock");
  };

  return (
    <div>
      <Card
        className="min-h-[450px] relative pb-10 space-y-4"
        cover={<img style={{ height: 200 }} src={product?.images?.[0]} />}
      >
        <Link
          to={`/product/${product?._id}`}
          className="font-bold text-xl inline-block mb-2 hover:text-primary-2 truncate w-full hover:text-primary"
        >
          {product?.name}
        </Link>

        <Card.Meta
          title={
            <>
              <div className="flex items-end gap-2">
                <p className=" font-semibold text-lg">
                  <span className="!text-primary-2">৳ {product?.price}</span>
                </p>
              </div>
              <p className="text-secondary-200 font-normal">
                stock: {product?.stock}
              </p>
            </>
          }
          description={
            <Typography.Paragraph
              ellipsis={{
                rows: 2,
                // expandable: true,
                // symbol: "more",
              }}
            >
              {product?.description}
            </Typography.Paragraph>
          }
        ></Card.Meta>

        <Button
          style={{
            marginTop: "10px",
          }}
          onClick={() => handleAddToCart(product)}
          icon={<BsCartPlus />}
          iconPosition="end"
          block
          type="default"
          color="primary"
          className="btn-outline-one !absolute bottom-2 left-0 right-0 !w-[70%] mx-auto"
          disabled={Number(product.stock) === 0}
        >
          Add to Cart
        </Button>
      </Card>
    </div>
  );
};

export default ProductCard;
