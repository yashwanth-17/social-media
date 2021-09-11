import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home";
import Explore from "./components/Explore/Explore";
import Qna from "./components/Qna/Qna";
import AboutUs from "./components/Aboutus/AboutUs";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import PostQuery from "./components/Qna/PostQuery";
import Landing from "./components/Landing/Landing";
import ChangePassword from "./components/ChangePassword";
import "./App.css";
import { auth } from "./components/Firebase";
import { useState, useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import Post from "./components/SinglePost/post";
import AddDetails from "./components/AddDetails";
import SingleQna from "./components/singleqna/qna";
import { loadTheme } from "./functions/theme";
import NewPost from "./components/NewPost";

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setLoading(true);
    loadTheme();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    /* Routing paths in the application */

    <Router>
      <div className="App">
        {user && <NavBar />}
        {loading === false ? (
          user ? (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/explore" exact component={Explore} />
              <Route path="/qna" exact component={Qna} />
              <Route path="/about" exact component={AboutUs} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/postquery" exact component={PostQuery} />
              <Route path="/new-post" exact component={NewPost} />
              <Route path="/changePassword" exact component={ChangePassword} />
              <Route path="/post/:id" exact component={Post} />
              <Route path="/qna/:id" exact component={SingleQna} />
              <Route path="/addDetails" exact component={AddDetails} />
              <Route path="/:id" component={Home} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" exact component={Landing} />
              <Route path="/:id" component={Landing} />
              <Redirect to="/login" />
            </Switch>
          )
        ) : (
          <div id="initialLoading">
            <SyncLoader color="#21D002" loading={loading} size={15} />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
