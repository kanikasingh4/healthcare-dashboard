import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [formData, setFormData] = useState({ name: "", age: "", file: null });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("file", formData.file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/submit", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage("Submission failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
      }}
    >
      <Paper
        elevation={4}
        style={{
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "500px",
          background: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          component={motion.h1}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Healthcare Dashboard
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            component="label"
            color="primary"
            style={{ textTransform: "none" }}
          >
            Upload File
            <input
              type="file"
              name="file"
              hidden
              onChange={handleChange}
              required
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ textTransform: "none" }}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </Button>
        </form>
        {responseMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: "20px",
              padding: "10px",
              borderRadius: "10px",
              background: "#e3f2fd",
              textAlign: "center",
              fontSize: "14px",
              color: "#00796b",
            }}
          >
            {responseMessage}
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
};

export default Dashboard;
