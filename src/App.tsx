import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  { Toaster } from 'react-hot-toast';

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Protected from "./Components/Protected";
import NewTask from "./Pages/NewTask";
import Tasks from "./Pages/Tasks";
import Trash from "./Pages/Trash";
import UpdateTask from "./Pages/Update";
import Profile from "./Pages/Profile";
import Completed from "./Pages/Completed";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
                   
        </Route>
        <Route
          path="/Dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        >
          <Route path="new-task"  element={<NewTask/>} />
          <Route path ="tasks"   element={<Tasks/>} />
          <Route path ="trash"   element={<Trash/>} />
          <Route path ="update/:id"  element= {<UpdateTask/>} />
          <Route path="completed" element={<Completed/>} />
          <Route path ="profile"  element= {<Profile/>} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
