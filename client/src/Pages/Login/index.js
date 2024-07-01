import React, { useEffect } from "react";


import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Loginuser } from "../../apicalls/user";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
  const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const response = await Loginuser (values)
        try {
          if (response.success){
            message.success(response.message)
            localStorage.setItem('token', response.data)
            navigate('/')
            console.log(response.message)
          }
          else{
            message.error(response.message)
              console.log(response.message) 
          }
        }
        catch(err){
          console.log(err)
            console.log("err in login user")
          message.error(err)
        }
      };


      // useEffect(()=>{
      //   if(localStorage.getItem("token")){
      //     navigate('/');
      //   }
      // },[])

      
        return  (
            <>
            <h3 className="text-center mt-4 ">Login Here</h3>
            <div className="container w-50 h-75 border mt-5" >
            <Form
          name="register"
          className="registration-form mt-3"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="registration-form-button">
              Login
            </Button>
          </Form.Item>
        </Form>
        </div>
            </>
        )
}

export default Login