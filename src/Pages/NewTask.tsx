import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import axiosInstance from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface NewTask {
  title: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
}

function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [formError, setFormError] = useState("");
   const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: async (newTask: NewTask) => {
      console.log(newTask)
      const response = await axiosInstance.post("/tasks", newTask);
      console.log(response.data);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("something went wrong");
      }
    },
    onSuccess: () => {
      toast("Task created successfully", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });

      setTitle("");
      setDescription("");
      setDeadlineDate("");
      setDeadlineTime("");
    },
  });

  function handleCreateTask(e:React.FormEvent) {
    e.preventDefault()
    const newTask = { title, description, deadlineDate, deadlineTime };
    mutate(newTask);
    navigate ("/dashboard/tasks")
    setFormError("");
  }
  return (
    <Box
      sx={{
        minHeight: "auto",
        mt: "2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "white",
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        {formError && <Alert severity="error"> {formError}</Alert>}
        <Typography variant="h5" mb={3} textAlign="center" fontWeight="bold">
          Create New Task
        </Typography>

        <Stack spacing={2}>
          <TextField
            required
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Deadline Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />
          <TextField
            label="Deadline Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon />
                </InputAdornment>
              ),
            }}
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
            
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleCreateTask}
            loading={isPending}
          >
            Add Task
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default NewTask;
