import React, { useEffect, useState } from 'react';
import './AddInfo.css';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_INFO_RESET } from '../redux/constants/infoConstant';
import { clearErrors, getInfoDetails, updateInfo } from '../redux/actions/infoAction';

const EditInfo = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, info } = useSelector((state) => state.infoDetail);
  
    const {
      loading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.info);

     
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [occupation, setOccupation] = useState("");
    const [tagline, setTagline] = useState("");
  
  
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
  
    const infoId = match.params.id;

    useEffect(() => {
        if (info && info._id !== infoId) { 
          dispatch(getInfoDetails(infoId));
        } else {
          setUsername(info.username);
          setEmail(info.email);
          setOccupation(info.occupation);
          setTagline(info.tagline);
    
          setOldImages(info.images);
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
          alert.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Info Updated Successfully");
          history.push("/admin/info");
          dispatch({ type: UPDATE_INFO_RESET });
        }
      }, [dispatch, alert, error, history, isUpdated, infoId, info, updateError]);
    
      const updateInfoSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("username", username);
        myForm.set("email", email);
        myForm.set("occupation", occupation);
        myForm.set("tagline", tagline);
    
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(updateInfo(infoId, myForm));
      };
    
      const updateInfoImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
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
          <h1>Update Info</h1>
          <form onSubmit={updateInfoSubmitHandler}>
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
                onChange={updateInfoImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="Old home Preview" />
                  ))}
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
         
        </div>
      </div>
    )
}

export default EditInfo
