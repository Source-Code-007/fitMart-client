import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Modal,
  Input,
  Form,
  message,
  Skeleton,
  Upload,
  Switch,
  Tooltip,
  Select,
  InputNumber,
} from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { TProduct } from "../../types/index.type";
import { useGetAllCategoryQuery } from "../../redux/features/category/categoryApi";
import { useUploadFileMutation } from "../../redux/api/fileUpload";

const Products = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data: productsData, isLoading } = useGetAllProductsQuery({
    pagination,
  });
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetAllCategoryQuery({ page: 1, limit: 100000 });
  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();
  const [createProduct, { isLoading: createProductIsLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: updateProductIsLoading }] =
    useUpdateProductMutation();
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [uploadFile, { isLoading: isLoadingUploadFile, data: uploadFileData }] =
    useUploadFileMutation();

  //   Update input value
  useEffect(() => {
    if (editingProduct) {
      form.setFieldsValue({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: {
          label: editingProduct.category.name, // Assuming `name` is the label you want to display
          value: editingProduct.category._id, // Assuming `_id` is the value
        },
      });
    } else {
      form.resetFields();
    }
  }, [editingProduct, form]);

  const handleAddToProduct = async (values) => {
    try {
      const images = [];
      // const imgUrl = imgbbRes.data.display_url;
      // const newRecipe = { ...data, recipeImg: imgUrl };

      // Iterate over the images and upload each one
      for (let image of values.images) {
        const formData = new FormData();
        formData.append("image", image.originFileObj);

        // Call the uploadFile mutation for each image
        const file = await uploadFile(formData).unwrap();

        // Store the uploaded image URL
        images.push(file.data.url);
      }

      const res = await createProduct({ ...values, images }).unwrap();
      message.success(res?.message || "Product successfully created!", 1.5);
      setModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.data?.message || "Product created failed!", 1.5);
    }
  };

  const handleUpdateProduct = async (values: Partial<TProduct>) => {
    const images = [];

    // Check if images are provided and not empty
    if (values.images && values.images.length > 0) {
      // Iterate over the images and upload each one
      for (let image of values.images) {
        const formData = new FormData();
        formData.append("image", image.originFileObj);

        // Call the uploadFile mutation for each image
        const file = await uploadFile(formData).unwrap();

        // Store the uploaded image URL
        images.push(file.data.url);
      }
    }

    try {
      const res = await updateProduct({
        _id: editingProduct?._id,
        ...values,
        category: editingProduct?.category?.value,
        ...(images.length > 0 && { images }),
      }).unwrap();

      message.success(res?.message || "Product successfully updated!", 1.5);
      setModalVisible(false);
    } catch (error: any) {
      message.error(error.message || "Product update failed!", 1.5);
    }
  };

  const handleDeleteProduct = async (payload) => {
    try {
      const res = await deleteProduct(payload._id).unwrap();
      message.success(
        res.data?.message || "Product successfully deleted!",
        1.5
      );
    } catch (error: any) {
      message.error(error.data?.message || "Product delete failed!", 1.5);
    }
  };


  const handleModalCancel = () => {
    setEditingProduct(null);
    setModalVisible(false);
    form.resetFields();
  };

  const openModalForEditing = (record) => {
    setEditingProduct(record);
    setModalVisible(true);
  };

  const columns = [
    { dataIndex: "name", title: "Name", key: "name" },
    {
      dataIndex: "description",
      title: "Description",
      key: "description",
      render: (description: string, record) => (
        <Tooltip title={record.description}>
          <p>
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
        </Tooltip>
      ),
    },
    {
      dataIndex: "category",
      title: "Category",
      key: "category",
      render: (category: any) => (
        <Tooltip title={category.description}>
          <p>{category.name}</p>
        </Tooltip>
      ),
    },
    {
      title: "Image",
      key: "img",
      render: (record) => (
        <img
          src={record?.images?.[0]}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<MdDriveFileRenameOutline />}
            onClick={() => openModalForEditing(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Product?"
            onConfirm={() => handleDeleteProduct(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<RiDeleteBin6Line />}
              type="primary"
              size="small"
              loading={isLoadingDelete}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // console.log(productData, 'productData');

  return (
    <div>
      <div className="my-container space-y-12 md:space-y-16">
        <div className="flex justify-end mr-5 my-5">
          {isLoading || isLoadingCategory ? (
            <Skeleton.Input active={true} />
          ) : (
            <Button
              onClick={() => {
                setEditingProduct(null);
                setModalVisible(true);
              }}
              type="primary"
              size="middle"
              icon={<MdDriveFileRenameOutline />}
            >
              Add product
            </Button>
          )}
        </div>
        {isLoading || isLoadingCategory ? (
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <Table
            dataSource={productsData?.data}
            columns={columns}
            rowKey="_id"
            scroll={{ x: 800 }}
            pagination={{
              total: productsData?.meta?.total,
              onChange: (page, pageSize) => {
                setPagination({ page, limit: pageSize });
              },
            }}
          />
        )}

        <Modal
          title={editingProduct ? "Update Product" : "Add Product"}
          open={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form
            form={form}
            name="ProductForm"
            onFinish={editingProduct ? handleUpdateProduct : handleAddToProduct}
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: editingProduct ? false : true,
                  message: "Please enter name",
                },
              ]}
            >
              <Input placeholder="Enter product name here" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: editingProduct ? false : true,
                  message: "Please enter description",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter Product description here" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  type: "number",
                  required: editingProduct ? false : true,
                  message: "Price must be a number",
                },
              ]}
            >
              <InputNumber
                parser={(value) => value.replace(/[^0-9]/g, "")}
                placeholder="Enter Product price here"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[
                {
                  type: "number",
                  required: editingProduct ? false : true,
                  message: "Stock must be a number",
                },
              ]}
            >
              <InputNumber
                parser={(value) => value.replace(/[^0-9]/g, "")}
                placeholder="Enter Product stock here"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: editingProduct ? false : true,
                  message: "Please enter quantity",
                },
              ]}
            >
              <Select
                options={categoryData?.data.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                placeholder="Select category"
              />
            </Form.Item>

            <Form.Item
              label="Images"
              name="images"
              rules={[
                {
                  required: editingProduct ? false : true,
                  message: "Please upload mutiple image",
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={(event) => {
                if (Array.isArray(event)) {
                  return event;
                }
                return event && event.fileList;
              }}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={3}
                accept="image/*"
                multiple={true}
              >
                <Button>Upload Images</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              {editingProduct ? (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={updateProductIsLoading || isLoadingUploadFile}
                >
                  {" "}
                  Update Product
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={createProductIsLoading || isLoadingUploadFile}
                >
                  Add Product
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Products;
