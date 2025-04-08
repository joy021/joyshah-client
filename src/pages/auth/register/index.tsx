import { Link, useNavigate } from "react-router-dom";
import WelcomeContent from "../common/welcome-content";
import { Button, Form, Input, message } from "antd";
import { registerUser } from "../../../api-services/users-service";
import { useState } from "react";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: never) => {
    try {
      setLoading(true);
      const response = await registerUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (error: any) {
      message.error(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="col-span-1 lg:flex hidden">
        <WelcomeContent />
      </div>
      <div className="h-screen flex items-center justify-center">
        <Form
          className="flex flex-col gap-5 w-96"
          layout="vertical"
          onFinish={onFinish}
        >
          <h1 className="text-2xl font-bold text-gray-600">
            Register your account
          </h1>
          <Form.Item
            name="name"
            required
            label="Name"
            // rules={[{ required: true }]}
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 3, message: "Name must be at least 3 characters long!" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Name can only contain letters and spaces!",
              },
            ]}

          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            required
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email address!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
                message: "Enter a valid email address format!",
              },
              {
                validator: (_, value) => {
                  if (value) {
                    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
                    const domain = value.split("@")[1];
                    if (!allowedDomains.includes(domain)) {
                      return Promise.reject(
                        new Error("Only Gmail, Yahoo, and Outlook emails are allowed!")
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}

          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            required
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 8, message: "Password must be at least 8 characters long!" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
                message:
                  "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character!",
              },
            ]}

          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
          <Link to="/login">Already have an account? Login</Link>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
