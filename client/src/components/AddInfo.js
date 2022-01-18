import React, { useEffect, useState } from "react";
import "./AddInfo.css";
import Infos from "./Infos";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_INFO_RESET } from "../redux/constants/infoConstant";
import { clearErrors, createInfo } from "../redux/actions/infoAction";

const AddInfo = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newInfo);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [tagline, setTagline] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Info Created Successfully");
      history.push("/");
      dispatch({ type: NEW_INFO_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createInfoSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("username", username);
    myForm.set("email", email);
    myForm.set("occupation", occupation);
    myForm.set("tagline", tagline);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createInfo(myForm));
  };

  const createInfoImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="form" data-aos="fade-up">
      <div className="form_grid">
        <h1>Add Info</h1>
        <form onSubmit={createInfoSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="occupation"
            placeholder="Your Occupation"
            required
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />

          <input
            type="text"
            name="tagline"
            placeholder="Your Tagline"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createInfoImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" /> 
            ))}
          </div>

          <button
            type="submit"
            disabled={loading ? true : false}
            className="btn"
          >
            Submit
          </button>
        </form>
        <Infos />
      </div>
    </div>
  );
};

export default AddInfo;
