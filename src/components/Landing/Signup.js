import { React } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Si1Password } from "react-icons/si";
import { auth } from "../Firebase";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Signup() {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    console.log(email, password, confirmPassword);
    if (password === confirmPassword) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          history.push("/addDetails");
        })
        .catch((err) => console.log("Sign Up Unsuccessfull", err.message));
    } else alert(`Password & Confirm Password aren't matched!`);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <img src="Images/signup.png" width="60%" alt="login" />
      </div>
      <form className={classes.margin} onSubmit={handleSubmit}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" justify="center">
            <Grid item>
              <HiOutlineMail size={25} />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                name="email"
                label="Username"
                autoComplete="off"
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" justify="center">
            <Grid item>
              <RiLockPasswordLine size={25} />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" justify="center">
            <Grid item>
              <Si1Password size={25} />
            </Grid>
            <Grid item>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                required
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            className="mt-3 mb-2"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
}

export default Signup;
