import { Avatar } from "@material-ui/core";
import { auth, GetUserDoc } from "../Firebase";
import parse from "html-react-parser";
import Vote from "./vote";
import "./singleqna.css";
import React, { Component } from "react";
class Answer extends Component {
	state = {
		displaydata: {
			imagesource: "",
			username: "",
			description: "",
		},
		user: null,
	};
	componentDidMount = async () => {
		//getting userdaata?

		const user = await GetUserDoc(auth.currentUser.uid);
		console.log('USER:',user)

		this.setState({ user });

		await this.handledisplay();
	};
	handledisplay = () => {
		const displaydata = { ...this.state.displaydata };
		const user = { ...this.state.user };
		if (this.props.anonymous) {
			displaydata.imagesource =
				"https://www.clipartmax.com/png/middle/309-3094234_anonymous-browsing-toggle-user-secret-icon.png";
			displaydata.username = "Anonymous";
			displaydata.description = "User's identity anonymous";
		} else {
			displaydata.username = user.name;
			displaydata.description = user.branch;
			displaydata.imagesource = user.imageUrl;
		}
		this.setState({ displaydata });
	};
	render() {
		const { id, answer, upvotes, questionid } = this.props;
		const { imagesource, username, description } = this.state.displaydata;

		return (
			<div>
				<hr />
				<div className="question-information">
					<Avatar src={imagesource} style={{ margin: "5px" }} />
					<div className="information-details">
						<b>{username}</b>, {description}
					</div>
				</div>
				<div className="answer-body">
					{/* upvotes component */}
					<Vote upvotes={upvotes} answerid={id} questionid={questionid} />

					<div className="answer-content">{parse(answer)}</div>
				</div>
			</div>
		);
	}
}

export default Answer;
