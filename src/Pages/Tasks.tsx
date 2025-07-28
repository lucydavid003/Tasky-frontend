import { Box, Grid, Stack, Typography } from "@mui/material";
import TaskCard from "../Components/TaskCard";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";
interface Task {
  id: string;
  title: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

function Tasks() {
  const { data, isError } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/tasks", {
        withCredentials: true,
      });
      console.log(response.data.tasks);
      return response.data.tasks;
    },
  });

  const handleDelete = (id: string) => {
    console.log("Delete task:", id);
  };

  const handleUpdate = (id: string) => {
    console.log("Update task:", id);
  };
  if (isError) {
    return (
      <Stack>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Something went wrong!
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Tasks
      </Typography>

      {data?.length === 0 ? (
        <Typography>No active tasks found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {data &&
            data.map((task: Task) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }} key={task.id}>
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  isCompleted={task.isCompleted}
                  isDeleted={task.isDeleted}
                  deadlineDate={task.deadlineDate}
                  deadlineTime={task.deadlineTime}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Box>
  );
}

export default Tasks;
