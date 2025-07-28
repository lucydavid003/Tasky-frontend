import { Paper, TextField, Button, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface UpdateDetails {
  title: string;
  description: string;
}

function UpdateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-task"],
    mutationFn: async (newDetails: UpdateDetails) => {
      const response = await axiosInstance.patch(`/tasks/${id}`, newDetails);
      return response.data;
    },
    onError: () => {
      toast("Error updating task", {
        style: { backgroundColor: "red", color: "white" },
      });
    },
    onSuccess: () => {
      toast("Task updated  successfully", {
        style: { backgroundColor: "blue", color: "white" },
      });
    },
  });

  const { isError, data } = useQuery({
    queryKey: ["get-task-for-update"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/tasks/${id}`);
      console.log(response.data);
      return response.data;
    },
  });

  if (isError) {
    return (
      <Stack>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Something went wrong!
        </Typography>
      </Stack>
    );
  }

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [data]);

  function handleUpdateTask() {
    const updateDetails = { title, description };
    mutate(updateDetails);
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={3}>
        Update Task
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            loading={isPending}
            onClick={handleUpdateTask}
          >
            Update
          </Button>
          <Button variant="outlined" color="success">
            Mark as Complete
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default UpdateTask;
