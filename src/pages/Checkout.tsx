// src/components/CheckoutPage.js
import { useState } from "react";
import {
  Typography,
  Form,
  Table,
  Space,
  message,
  Skeleton,
  Button,
  Result,
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { ArrowRightOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import FormItems from "../components/ui/FormItems";
import { clearCart } from "../redux/features/cart/cartSlice";

const Checkout = () => {
  const [form] = useForm();
  const { products: cartItems, total } = useAppSelector((state) => state.cart);
  const [createOrder, { data, isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const divisions = ["Division1", "Division2", "Division3", "Division4"];
  const districts = ["District1", "District2", "District3", "District4"];
  const cities = ["City1", "City2", "City3", "City4"];

  const query = new URLSearchParams(window.location.search);
  const successQuery = query.get("status");
  console.log(successQuery, "successQuery");

  // order api post here
  const handleCheckout = async (data: any) => {
    const address = {
      details: data?.details,
      postalCode: data?.postalCode,
      city: data?.city,
      district: data?.district,
      division: data?.division,
    };

    const orderData = {
      customerName: data.customerName,
      products: cartItems?.map((product) => ({
        product: product?._id,
        quantity: product?.quantity,
      })),
      shippingAddress: { ...address },
      paymentMethod: data?.paymentMethod,
    };

    console.log(orderData, "orderData");

    try {
      const data = await createOrder(orderData).unwrap();

      console.log(data);
      if (data?.success === true) {
        message.success(data?.message);
        dispatch(clearCart());
        form.resetFields();
        navigate("/checkout?status=success");
      }
    } catch (e) {
      message.error(e.data?.message);
    }
  };

  const formItems = [
    {
      name: "customerName",
      label: "Customer name",
      type: "text",
      rules: [{ required: true, message: "Please enter customer name" }],
      placeholder: "Enter customer name",
    },
    {
      name: "paymentMethod",
      label: "Payment method",
      type: "select",
      rules: [{ required: true, message: "Please select payment method" }],
      placeholder: "Select shipping method",
      options: ["STRIPE", "Cash on Delivery (COD)"].map((paymentMethod) => ({
        label: paymentMethod,
        value: paymentMethod,
      })),
    },
    {
      name: "details",
      label: "Address details",
      type: "text",
      rules: [{ required: true, message: "Please enter address details" }],
      placeholder: "Enter address details",
    },
    {
      name: "postalCode",
      label: "Postal Code",
      type: "text",
      rules: [{ required: true, message: "Please enter postal code" }],
      placeholder: "Enter postal code",
    },
    {
      name: "city",
      label: "City",
      type: "select",
      rules: [{ required: true, message: "Please select city" }],
      placeholder: "Select city",
      options: cities?.map((city) => ({
        label: city,
        value: city,
      })),
    },
    {
      name: "district",
      label: "District",
      type: "select",
      rules: [{ required: true, message: "Please select district" }],
      placeholder: "Select district",
      options: districts?.map((district) => ({
        label: district,
        value: district,
      })),
    },
    {
      name: "division",
      label: "Division",
      type: "select",
      rules: [{ required: true, message: "Please select division" }],
      placeholder: "Select division",
      options: divisions?.map((division) => ({
        label: division,
        value: division,
      })),
    },
  ];

  const columns = [
    {
      dataIndex: "index",
      key: "index",
      title: "No",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "image_link",
      render: (images: string[]) => (
        <Space size="middle">
          <img
            src={images?.[0]}
            alt="title"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
            }}
          />
        </Space>
      ),
    },
    {
      dataIndex: "name",
      title: "Name",
      key: "name",
      ellipsis: {
        rows: 2,
        expandable: true,
        symbol: "more",
      },
    },
    {
      dataIndex: "price",
      title: "Price",
      key: "price",
    },
    {
      dataIndex: "stock",
      title: "Stock",
      key: "stock",
    },
    {
      dataIndex: "quantity",
      title: "Quantity",
      key: "quantity",
    },
    {
      dataIndex: "quantity",
      title: "Total",
      key: "quantity",
      render: (quantity: number, record: any) => record?.price * quantity,
    },
  ];

  console.log(data, "data order");

  if (successQuery === "success") {
    return (
      <Result
        status="success"
        title="Order successfully placed!"
        subTitle={`Order #${data?.data?._id}: Expected delivery in 2-5 days. Thank you for your purchase!`}
        extra={[
          <Button type="primary" key="dashboard">
            <Link to={"/dashboard/order"}>Track your order</Link>
          </Button>,
          <Button key="buy">
            <Link to={"/products"}>Buy again</Link>
          </Button>,
        ]}
      />
    );
  }

  return (
    <section className="bg-slate-50 py-6 sm:py-8 lg:py-12 overflow-hidden">
      <div className="my-container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          {/* shipping address and customer details */}
          <div className="bg-white p-8 rounded-md shadow w-full">
            <Typography.Title level={4} className="text-lg font-semibold mb-5">
              Shipping Address
            </Typography.Title>

            <Form
              name="checkoutForm"
              onFinish={handleCheckout}
              form={form}
              layout="vertical"
            >
              <FormItems formItems={formItems} />

              {/* Action button */}
              <Form.Item>
                <div className="flex justify-between items-center gap-2 mt-2">
                  <Link to={"/cart"}>
                    <DoubleLeftOutlined /> Return to cart
                  </Link>
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={!cartItems?.length}
                    loading={isLoading}
                  >
                    Continue to shipping <ArrowRightOutlined />
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>

          {/* Product information */}
          <div className=" bg-white p-8 rounded-md shadow">
            <div className="">
              <Typography.Title
                level={4}
                // className="text-lg font-semibold mb-4"
              >
                {" "}
                Product information
              </Typography.Title>

              <div className="">
                <Table
                  dataSource={cartItems}
                  scroll={{
                    y: 240,
                  }}
                  columns={columns}
                />
              </div>
            </div>
            {/* total total Amount */}
            <div className="flex flex-col p-4 items-end mt-10 gap-4">
              <div className="w-full">
                <div className="space-y-1">
                  <div className="flex justify-between text-gray-500 gap-4">
                    <Typography.Text>Subtotal</Typography.Text>
                    <Typography.Text>BDT {total.toFixed(2)}</Typography.Text>
                  </div>

                  <div className="flex justify-between text-gray-500 gap-4">
                    <Typography.Text>Shipping</Typography.Text>
                    <Typography.Text>BDT 4.99</Typography.Text>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between items-start text-gray-800 gap-4">
                    <Typography.Text className="text-lg font-bold">
                      Total
                    </Typography.Text>

                    <span className="flex flex-col items-end">
                      <Typography.Text className="text-lg font-bold">
                        BDT {total.toFixed(2)}
                      </Typography.Text>
                      <Typography.Text className="text-gray-500 text-sm">
                        including VAT
                      </Typography.Text>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
