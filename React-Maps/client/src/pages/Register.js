import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../context/auth/authSlice";
import Loader from "../component/Loader";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      confirmPassword.length === 0
    ) {
      console.log(formData);
      alert("All fields are required..");
      // toast.error("All fields are required..");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match..");
      // toast.error("Passwords do not match..");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/maps");
    }

    if (isLoading) {
      return <Loader />;
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> &nbsp; Registration
        </h1>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
