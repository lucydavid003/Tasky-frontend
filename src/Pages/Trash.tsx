import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Alert,
  Grid,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  Restore as RestoreIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import axiosInstance from "../api/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Task {
  id: string;
  title: string;
  description: string;
  deadlineDate?: string;
  deadlineTime?: string;
  isDeleted: boolean;
  isCompleted: boolean;
  dateCreated: string;
  dateUpdated: string;
}

function Trash() {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/tasks/deleted", {
        withCredentials: true,
      });
      console.log("Fetched tasks:", response.data.tasks);
      return response.data.tasks as Task[];
    },
  });

  const restoreTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await axiosInstance.patch(
        `/tasks/restore/${taskId}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });

      setSnackbar({
        open: true,
        message: "Task restored successfully!",
        severity: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to restore task:", error);
      setSnackbar({
        open: true,
        message: "Failed to restore task. Please try again.",
        severity: "error",
      });
    },
  });

  const deletedTasks = tasks.filter((task: Task) => task.isDeleted);
  const handleRestoreTask = (taskId: string) => {
    restoreTaskMutation.mutate(taskId);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading deleted tasks...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h4" color="error" gutterBottom>
            Something went wrong!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Failed to load deleted tasks. Please try again.
          </Typography>
          <Button variant="contained" onClick={handleRefresh}>
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={400}>
            Trash
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your deleted tasks
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={isLoading}
        >
          Refresh
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        Items in trash will be deleted after 30 days
      </Alert>

      {deletedTasks.length > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {deletedTasks.length} {deletedTasks.length === 1 ? "task" : "tasks"}{" "}
          in trash
        </Typography>
      )}

      {deletedTasks.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "300px",
            textAlign: "center",
          }}
        >
          <DeleteIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Trash is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No deleted tasks found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {deletedTasks.map((task: Task) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }} key={task.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  opacity: 0.8,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    opacity: 1,
                    boxShadow: 3,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {task.description}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Created: {formatDate(task.dateCreated)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Updated: {formatDate(task.dateUpdated)}
                    </Typography>
                    {task.deadlineDate && (
                      <Typography
                        variant="caption"
                        color="warning.main"
                        display="block"
                      >
                        Deadline: {formatDate(task.deadlineDate)}
                      </Typography>
                    )}
                    {task.isCompleted && (
                      <Typography
                        variant="caption"
                        color="success.main"
                        display="block"
                        sx={{ fontWeight: 500, mt: 0.5 }}
                      >
                        ✓ Completed
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<RestoreIcon />}
                    onClick={() => handleRestoreTask(task.id)}
                    disabled={restoreTaskMutation.isPending}
                    sx={{
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {restoreTaskMutation.isPending &&
                    restoreTaskMutation.variables === task.id ? (
                      <>
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                        Restoring...
                      </>
                    ) : (
                      "Restore"
                    )}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Trash;
