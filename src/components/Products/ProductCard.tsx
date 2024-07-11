/* eslint-disable react/prop-types */
import { Button, Card, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { TProduct } from "../../types/index.type";

type TProductCard = {
  product: TProduct;
};

const ProductCard: React.FC<TProductCard> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Card
        className="min-h-[450px] relative pb-10 space-y-4"
        cover={<img style={{ height: 200 }} src={product?.images?.[0]} />}
      >
        <Link
          to={`/product/${product?._id}`}
          className="font-bold text-xl inline-block mb-2 hover:text-primary-2 truncate w-full"
        >
          {product?.name}
        </Link>

        <Card.Meta
          title={
            <div className="flex items-end gap-2">
              <p className=" font-semibold text-lg">
                <span className="!text-primary-2">৳ {product?.price}</span>
              </p>
            </div>
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
          onClick={() => dispatch(addToCart(product))}
          icon={<BsCartPlus />}
          iconPosition="end"
          block
          type="default"
          color="primary"
          className="btn-outline-one !absolute bottom-2 left-0 right-0 !w-[70%] mx-auto"
        >
          Add to Cart
        </Button>
      </Card>
    </div>
  );
};

export default ProductCard;
