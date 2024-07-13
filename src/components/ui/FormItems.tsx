/* eslint-disable react/prop-types */
import { Form, Input, Radio, Select } from "antd";

const FormItems = ({ formItems }) => {
  console.log(formItems, "formItems");
  return (
    <>
      {formItems?.map((item) => (
        <Form.Item
          key={item.name}
          label={item.label}
          name={item.name}
          rules={item.rules}
        >
          {item.type === "select" ? (
            <Select placeholder={item.placeholder}>
              {item.options?.map((opt) => (
                <Select.Option key={opt?.value} value={opt?.value}>
                  {opt.label}
                </Select.Option>
              ))}
            </Select>
          ) : // Radio inp
          item.type === "radio" ? (
            <Radio.Group>
              {item.options.map((opt) => (
                <Radio key={opt.value} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}
            </Radio.Group>
          ) : (
            // text or number inp
            (item.type === "text" || item.type === "number") && (
              <Input type={item.type} placeholder={item.placeholder} />
            )
          )}
        </Form.Item>
      ))}
    </>
  );
};

export default FormItems;
