import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";

const SERVER = process.env.REACT_APP_URL;

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    setAlertMsg(null);
    const formData = new FormData(event.currentTarget);
    authenticateLogin(formData);
  };

  const authenticateLogin = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);

        navigate("/");
      } else {
        setAlertMsg(json.error);
      }
    } catch (error) {
      setAlertMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="/resetpassword"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/resetpassword");
                }}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/signup"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {alertMsg && <Alert severity="error">{alertMsg}</Alert>}
      </Box>
    </Container>
  );
}
