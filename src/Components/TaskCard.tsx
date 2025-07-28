import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Box,
} from "@mui/material";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface TaskCard {
  id: string;
  title: string;
  description: string;
  deadlineDate: string;
  deadlineTime: string;
  isCompleted: boolean;
  isDeleted: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

function TaskCard({
  id,
  title,
  description,
  deadlineDate,
  deadlineTime,
}: TaskCard) {

  
  const queryClient  = useQueryClient()
  const navigate = useNavigate ()
  const { mutate } = useMutation({
    mutationKey: ["deleting-task"],
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      toast("Task moved to trash ", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["get-tasks"],
        refetchType:"active"

      })
    },
    onError: () => {
      toast("something went wrong! ", {
        style: {
          backgroundColor: "blue",
          color: "white",
        },
      });
    },
  });

  function handleDelete() {
    mutate();
  }

  function handleUpdate (){
     navigate(`/dashboard/update/${id}`)
  }

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "#f4f4f4",
        borderRadius: 3,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flexGrow: 1, height: 120 }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {description}
        </Typography>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          px: 2,
          pb: 1,
        }}
      >
        <Stack direction="column" spacing={0.5}>
          <Typography
            variant="caption"
            color="black"
            bgcolor="#dbeafe"
            px={1}
            py={0.5}
            borderRadius={1}
          >
            {deadlineTime}
          </Typography>
          <Typography
            variant="caption"
            color="black"
            bgcolor="#dbeafe"
            px={1}
            py={0.5}
            borderRadius={1}
          >
            {deadlineDate}
          </Typography>
        </Stack>

        <CardActions sx={{ p: 0 }}>
          <Button size="small" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button size="small" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default TaskCard;
