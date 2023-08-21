import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import defaultAvatar from '.././../../../../assets/images/defaultAvatar.png';


const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  margin: "auto",
  cursor:'pointer',
}));

const StyledButton = styled(Button)({
  display: "none",
});

const UpLoadImage = ({getFlie, setFile}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(location?.state?.accountInfo?.imgUrl || defaultAvatar);

  const handleImageChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    document.getElementById("avatar-input2").click();
  };

  return (
    <>
      <StyledAvatar onClick={handleClick} src={image || defaultAvatar}>
        {loading ? <CircularProgress /> : null}
      </StyledAvatar>
      <div style={{ textAlign: "center" }}>
        <input
          id="avatar-input2"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />  
        <label htmlFor="avatar-input2">
          <StyledButton variant="contained" component="span">
          </StyledButton>
        </label>
        <div style={{ fontSize: "1rem", fontWeight:'380', marginTop: '50px' }}>Allowed *.jpg, *.png max size of 3 MB</div>
      </div>
    </>
  );
};

export default UpLoadImage;