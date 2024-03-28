import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";



// import { login } from "../state/action-creators";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Alert } from "@mui/material";
import OtpModal from "./OtpModal";

const SERVER = process.env.REACT_APP_URL;

export default function Signup() {
 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [email, setEmail] = useState();
  const [formData, setFormData] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const checkUser = async (email)=>{
    const res = await fetch(`${SERVER}/api/verifications/checkUser?email=${email}`);
    console.log(res);
    return res.json();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setAlertMsg(null);
    setFormData(new FormData(e.currentTarget));
    const data = new FormData(e.currentTarget);
    const temp = data.get('email');
    setEmail(temp);
    try{
      const shouldRegister = await checkUser(temp);
      console.log(shouldRegister);
      if(shouldRegister.success){
        setIsOtpModalOpen(true);
      }
      else{
        setAlertMsg(shouldRegister.error);
      }
    }
    catch (error) {
      setAlertMsg(error.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  const createUser = async () => {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const password = formData.get("password");
    const payload = JSON.stringify({ firstName, lastName, email, password });
    console.log(payload)
    const response = await fetch(`${SERVER}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const json = await response.json();
    setIsLoading(false);
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      // props.showAlert("Invalid Details","danger");
      console.log("failse");
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {alertMsg && <Alert severity="error">{alertMsg}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/login");
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        {alertMsg && <Alert severity="error">{alertMsg}</Alert>}
      </Box>
      {isOtpModalOpen && <OtpModal email={email} open={isOtpModalOpen} setOpen={setIsOtpModalOpen} next={createUser}/>}
    </Container>
  );
}
