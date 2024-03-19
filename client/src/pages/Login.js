import React from "react";
import { Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(hideLoading());
        toast.success(response.data.message);
        toast("redirecting to home page");
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Welcome back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-3" htmlType="submit">
            Login
          </Button>
          <Link to="/register" className="anchor">
            click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
