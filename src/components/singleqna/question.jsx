import React, { Component } from "react";
import AnswerForm from "./AnswerForm";
import "./singleqna.css";
import { GetUserDoc } from "../Firebase";
import { Avatar } from "@material-ui/core";
class Question extends Component {
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

		const user = await GetUserDoc(this.props.question.postedBy);

		this.setState({ user });

		await this.handledisplay();
	};
	handledisplay = () => {
		const displaydata = { ...this.state.displaydata };
		const user = { ...this.state.user };
		if (this.props.question.anonymous) {
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
		//destructuring the props
		const { imagesource, username, description } = this.state.displaydata;
		const { question, questionid } = this.props;
		return (
			<div>
				{/* displaying the information regarding the question */}
				<div className="question-information">
					<Avatar src={imagesource} style={{ margin: "5px" }} />
					<div className="information-details">
						<b>{username}</b>, {description}
					</div>
				</div>
				<div>
					<h4>{question.query}</h4>
					<p>{question.description}</p>
				</div>
				{/* answerform to submit an answer */}
				<AnswerForm questionid={questionid} />
			</div>
		);
	}
}
export default Question;
