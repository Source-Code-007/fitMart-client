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
} from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TCategory, TProduct } from "../../types/index.type";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import { useUploadFileMutation } from "../../redux/api/fileUpload";

const Category = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const {
    data: categoryData,
    refetch: categoryRefetch,
    isLoading: isLoadingCategory,
  } = useGetAllCategoryQuery({ pagination });
  const [deleteCategory, { isLoading: isLoadingDeleteCategory }] =
    useDeleteCategoryMutation();
  const [createCategory, { isLoading: isLoadingCreateCategory }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isLoadingUpdateCategory }] =
    useUpdateCategoryMutation();
  const [editingCategory, setEditingCategory] = useState<TProduct | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [uploadFile, { isLoading: isLoadingUploadFile, data: uploadFileData }] =
    useUploadFileMutation();

  //   Update input value
  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name: editingCategory.name,
        description: editingCategory.description,
      });
    } else {
      form.resetFields();
    }
  }, [editingCategory, form]);

  const handleAddToCategory = async (values) => {
    try {
      const myIcons = [];
      // const imgUrl = imgbbRes.data.display_url;
      // const newRecipe = { ...data, recipeImg: imgUrl };

      // Iterate over the images and upload each one
      for (let icon of values.icon) {
        if (icon.originFileObj) {
          const formData = new FormData();
          formData.append("image", icon.originFileObj);

          // Call the uploadFile mutation for each image
          const file = await uploadFile(formData).unwrap();

          // Store the uploaded image URL

          console.log(file, "cat file");
          myIcons.push(file.data.url);
        } else {
          throw new Error(`Skipping invalid entry: ${JSON.stringify(icon)}`);
        }
      }

      const res = await createCategory({
        ...values,
        icon: myIcons?.[0],
      }).unwrap();
      message.success(res?.message || "Category successfully created!", 1.5);
      setModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.data?.message || "Category created failed!", 1.5);
    }
  };

  const handleUpdateCategory = async (values: Partial<TCategory>) => {
    const icons = [];
    // const imgUrl = imgbbRes.data.display_url;
    // const newRecipe = { ...data, recipeImg: imgUrl };

    // Iterate over the images and upload each one
    if (values.icon && values.icon?.length > 0) {
      for (let icon of values.icons) {
        const formData = new FormData();
        formData.append("image", icon.originFileObj);

        // Call the uploadFile mutation for each image
        const file = await uploadFile(formData).unwrap();

        // Store the uploaded image URL
        icons.push(file.data.url);
      }
    }

    try {
      const res = await updateCategory({
        _id: editingCategory?._id,
        ...values,
        category: editingCategory?.category?.value,
        ...(icons && icons?.length > 0 && { icon: icons?.[0] }),
      }).unwrap();

      message.success(res?.message || "Category successfully updated!", 1.5);
      setModalVisible(false);
    } catch (error: any) {
      message.error(error.message || "Category update failed!", 1.5);
    }
  };

  const handleDeleteCategory = async (payload) => {
    try {
      const res = await deleteCategory(payload._id).unwrap();
      message.success(
        res.data?.message || "Category successfully deleted!",
        1.5
      );
    } catch (error: any) {
      message.error(error.data?.message || "Category delete failed!", 1.5);
    }
  };

  const handleModalCancel = () => {
    setEditingCategory(null);
    setModalVisible(false);
    form.resetFields();
  };

  const openModalForEditing = (record) => {
    setEditingCategory(record);
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
      title: "Icon",
      key: "icon",
      render: (record) => (
        <img
          src={record?.icon}
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
            title="Are you sure you want to delete this Category?"
            onConfirm={() => handleDeleteCategory(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<RiDeleteBin6Line />}
              type="primary"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // console.log(categoryData, 'categoryData');

  return (
    <div>
      <div className="my-container space-y-12 md:space-y-16">
        <div className="flex justify-end mr-5 my-5">
          {isLoadingCategory ? (
            <Skeleton.Input active={true} />
          ) : (
            <Button
              onClick={() => {
                setEditingCategory(null);
                setModalVisible(true);
              }}
              type="primary"
              size="middle"
              icon={<MdDriveFileRenameOutline />}
            >
              Add category
            </Button>
          )}
        </div>
        {isLoadingCategory ? (
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <Table
            dataSource={categoryData?.data}
            columns={columns}
            rowKey="_id"
            scroll={{ x: 800 }}
            pagination={{
              total: categoryData?.meta?.total,
              onChange: (page, pageSize) => {
                setPagination({ page, limit: pageSize });
              },
            }}
          />
        )}

        <Modal
          title={editingCategory ? "Update Category" : "Add Category"}
          open={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form
            form={form}
            name="ProductForm"
            onFinish={
              editingCategory ? handleUpdateCategory : handleAddToCategory
            }
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: editingCategory ? false : true,
                  message: "Please enter name",
                },
              ]}
            >
              <Input placeholder="Enter category name here" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: editingCategory ? false : true,
                  message: "Please enter description",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter category description here" />
            </Form.Item>

            <Form.Item
              label="Icon"
              name="icon"
              rules={[
                {
                  required: editingCategory ? false : true,
                  message: "Please upload an icon",
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
                maxCount={1}
                accept="image/*"
                multiple={false}
              >
                <Button>Upload icon</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              {editingCategory ? (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isLoadingUpdateCategory || isLoadingUploadFile}
                >
                  {" "}
                  Update category
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isLoadingCreateCategory}
                >
                  Add category
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
