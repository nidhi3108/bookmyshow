import React, { useEffect } from "react";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Registeruser } from "../../apicalls/user";
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try{
      const response = await Registeruser(values);
      if(response.success){
        message.success(response.message);
        navigate("/login")
        console.log(response.message)
      }
      else{
        message.error(response.message)
        console.error(response.message)
      }
    }
    catch (err){
       message.error(err)
    }
  };


// it will check if login token is presnt and again you want to move login or register it will not go there 
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate('/');
    }
  },[])


  return (
    <div className="container w-50  bg-secondary mt-5">
      <div className="p-3 w-400">
        <h3 className="text-center mb-1 ">Register Here</h3>
        <hr />
        <Form
          layout="vertical"
          name="register"
          className="mt-1"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
          label="Name"
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
          label="E-mail"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
          label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {/* <Form.Item
          label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="registration-form-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
