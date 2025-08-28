import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LogIn from "./pages/LogIn";
import Topics from "./pages/Topics";
import Topic from "./pages/Topic";
import TopicForm from "./pages/TopicForm";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthcontext";

function App() {
  const { user, authIsReady } = useAuthContext();

  if (!authIsReady) return <div>Loading...</div>;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LogIn />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/topic"
            element={user ? <Topics /> : <Navigate to="/login" />}
          />
          <Route
            path="/topic/create"
            element={user ? <TopicForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/topic/edit/:id"
            element={user ? <TopicForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/topic/:id"
            element={user ? <Topic /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
