import React, { Component } from "react";
import { Switch } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Avatar } from "@material-ui/core";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { auth, db as firestore, GetUserDoc } from "../Firebase";
import "./singleqna.css";

class AnswerForm extends Component {
	state = {
		user: null,

		questionid: this.props.questionid,
		appliedclass: "not",
		displaydata: {
			imagesource: "",
			username: "",
			description: "",
		},
		//creating collection structure of answer
		data: {
			anonymous: false,
			userid: "",
			upvotes: 0,
			upvotedUsers: [],
			downvotedUsers: [],
			answer: "",
		},
	};
	// subscribing to the users details

	componentDidMount = async () => {
		const uid = auth.currentUser.uid;
		const temp = await GetUserDoc(uid);
		this.setState({ user: temp });
		this.handleUserData();
	};
	//setting user data to display above answer form
	handleUserData = async () => {
		const displaydata = { ...this.state.displaydata };
		const data = { ...this.state.data };
		const user = { ...this.state.user };
		displaydata.username = user.name;
		displaydata.description = user.branch;
		displaydata.imagesource = user.imageUrl;
		data.userid = auth.currentUser.uid;
		this.setState({ data });
		this.setState({ displaydata });
	};
	//changing the users privacy to anonymous and viceversa
	handlePrivacy = () => {
		const displaydata = { ...this.state.displaydata };
		const user = { ...this.state.user };
		const data = { ...this.state.data };

		if (displaydata.username === user.name) {
			displaydata.username = "Anonymous";
			displaydata.description = "User's identity anonymous";
			displaydata.imagesource =
				"https://www.clipartmax.com/png/middle/309-3094234_anonymous-browsing-toggle-user-secret-icon.png";
		} else {
			displaydata.username = user.name;
			displaydata.description = user.branch;
			displaydata.imagesource = user.imageUrl;
		}
		data.anonymous = !data.anonymous;
		this.setState({ displaydata });
		this.setState({ data });
	};
	// handle diplay of answer form
	handledisplay = () => {
		var appliedclass = this.state.appliedclass;
		if (appliedclass === "not") appliedclass = "show";
		else appliedclass = "not";
		this.setState({ appliedclass });
	};
	//posting the answer
	postAnswer = async () => {
		firestore
			.collection("qnas")
			.doc(this.state.questionid)
			.collection("answers")
			.add(this.state.data);
	};
	handleSubmit = (e) => {
		this.handledisplay();
		this.postAnswer();
		e.preventDefault();
	};
	handleChange = (ansdata) => {
		const data = { ...this.state.data };
		data["answer"] = ansdata;

		this.setState({ data });
	};
	render() {
		var { appliedclass, displaydata } = this.state;
		return (
			<div>
				{/* answer button to handle display the form and answer */}
				<button className="answerbutton" onClick={this.handledisplay}>
					<CreateOutlinedIcon style={{ margin: "5px" }} />{" "}
					<h5 style={{ margin: "5px", fontWeight: "normal" }}>Answer</h5>
				</button>
				<div className={appliedclass}>
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								{/* displaying the details to be posted along with answer */}
								<div className="question-information">
									<Avatar
										src={displaydata.imagesource}
										style={{ margin: "5px" }}
									/>
									<div className="information-details">
										<div>
											<b>{displaydata.username}</b>,
											<span> {displaydata.description}</span>
										</div>
									</div>
								</div>
								{/* rich tect editor */}
								<CKEditor
									editor={ClassicEditor}
									ansdata="<p>Hello from CKEditor 5!</p>"
									onReady={(editor) => {}}
									onChange={(event, editor) => {
										const ansdata = editor.getData();
										this.handleChange(ansdata);
									}}
									onBlur={(event, editor) => {}}
									onFocus={(event, editor) => {}}
								/>
								{/* postbutton  and go anonymous switch */}
								<div className="spacebetween">
									<div className="spacebetween mt-2">
										<Switch color="primary" onChange={this.handlePrivacy} />
										<div style={{ marginRight: "200" }}>Go anonymous</div>
									</div>
									<Button
										variant="contained"
										color="primary"
										onClick={this.handleSubmit}
										className="mt-2"
									>
										Post
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AnswerForm;
