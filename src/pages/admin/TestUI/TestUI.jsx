import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: "auto",
}));

const StyledButton = styled(Button)({
  display: "none",
});

const TestUI = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("../../../../src/assets/images/defaultAvatar.png");

  const handleImageChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    document.getElementById("avatar-input").click();
  };

  return (
    <>
      <StyledAvatar onClick={handleClick} src={image}>
        {loading ? <CircularProgress /> : null}
      </StyledAvatar>
      <div style={{ textAlign: "center" }}>
        <input
          id="avatar-input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />  
        <label htmlFor="avatar-input">
          <StyledButton variant="contained" component="span">
          </StyledButton>
        </label>
        <div style={{ fontSize: "0.8rem" }}>Allow .jpg, .png max size to 3MB</div>
      </div>
    </>
  );
};

export default TestUI;