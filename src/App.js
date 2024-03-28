import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import ForgotPassword from "./components/ForgotPassword";
import SignIn from "./components/SignIn";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/About" element={<About />} />
            {/* <Route
              exact
              path="/Login"
              element={<Login showAlert={showAlert} />}
            /> */}
            <Route
              exact
              path="/Signup"
              element={<Signup showAlert={showAlert} />}
            />

            <Route exact path="/resetpassword" element={<ForgotPassword />} />
            <Route exact path="/login" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
