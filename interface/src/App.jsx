import Signup from "./components/authentication/Signup"
import './App.css';
import {  Route, Routes } from "react-router-dom"
import Login from "./components/authentication/Login";
import { LoggedInRoutes } from "./routes/LoggedInRoutes";
import { Home } from "./components/home/Home";
import { NotLoggedInRoutes } from "./routes/NotLoggedIn";
import { useSelector } from "react-redux";
import { Event } from "./components/Events/Event";
import { Work } from "./components/work/Work";
import { EventList } from "./components/Events/EventList";
import { CollegeProjects } from "./components/work/CollegeProjects";
import { PostWork } from "./components/work/PostWork";
import { CollegeEventList } from "./components/Events/CollegeEvents";
import { SuccessPage } from "./components/Events/SuccessPage";
import { Profile } from "./components/profile/Profile";
import Discussion from "./components/discussion/Discussion";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="dark:bg-gray-800">
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element ={<Home />} exact />
          <Route path="/EventList" user={user} element ={<EventList />} exact />
          <Route path="/HostEvent" user={user} element ={<Event />} exact />
          {/* <Route path="/events" user={user} element ={<Event />} exact /> */}
          <Route path="/work" user={user} element ={<Work />} exact />
          <Route path="/SuccessPage" user={user} element ={<SuccessPage />} exact />
          <Route path="/Profile" user={user} element ={<Profile />} exact />
          <Route path="/CollegeProjects" user={user} element ={<CollegeProjects />} exact />
          <Route path="/PostWork" user={user} element ={<PostWork />} exact />
          <Route path="/CollegeEvents" user={user} element ={<CollegeEventList />} exact />
          <Route path="/Discussion" user={user} element ={<Discussion />} exact />
        </Route>
        <Route element= {<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<Signup />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
