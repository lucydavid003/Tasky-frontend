import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

interface Task {
  id: string;
  title: string;
  description: string;
}

const Completed = () => {
  const navigate = useNavigate();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["completedTasks"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tasks/completed");
      return res.data;
    },
  });

  const handleDelete = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      window.location.reload(); 
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Completed Tasks
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {tasks.length === 0 ? (
          <Typography>No completed tasks yet.</Typography>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} variant="outlined">
              <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/update-task/${task.id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
};

export default Completed;
