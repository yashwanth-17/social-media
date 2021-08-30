import React, { Component } from "react";
import ArrowBackSharpIcon from "@material-ui/icons/ArrowBackSharp";
import { db as firestore } from "../Firebase";
import { collectIdandDocs } from "./utilities";
import _ from "lodash";
import Answer from "./answer";
import { NavLink } from "react-router-dom";
import Question from "./question";
import "./singleqna.css";

class SingleQna extends Component {
	state = {
		answers: [],
		questioninfo: null,
		user: null,
		qid: this.props.match.params.id,
	};
	unsubsrcibefromAnswers = null;
	unsubsrcibefromQuestion = null;

	componentDidMount = async () => {
		//getting questioninfo
		const { qid } = this.state;
		this.unsubsrcibefromQuestion = await firestore
			.collection("qnas")
			.doc(qid)
			.onSnapshot((snapshot) => {
				const questioninfo = snapshot.data();
				this.setState({ questioninfo });
			});
		//getting answers
		this.unsubsrcibefromAnswers = await firestore
			.collection("qnas")
			.doc(qid)
			.collection("answers")
			.onSnapshot((snapshot) => {
				const ans = snapshot.docs.map(collectIdandDocs);
				this.setState({ answers: ans });
			});
	};
	//unsubscring from data when componenet unmounts
	componentWillUnmount = async () => {
		console.log(typeof this.unsubsrcibefromAnswers)
		this.unsubsrcibefromAnswers();

		this.unsubsrcibefromQuestion();
	};
	render() {
		const { answers, questioninfo, qid } = this.state;
		const sortanswers = _.orderBy(answers, ["upvotes"], ["desc"]);

		return (
			<div>
				<div className="question">
					<div className="back ">
						<NavLink className="nav-link" to="/qna">
							<div className="back-content">
								<ArrowBackSharpIcon />
								<h3>Back</h3>
							</div>
						</NavLink>
					</div>

					<div className="middle">
						{/* mapping the questioninfo with question component */}
						{questioninfo !== null && (
							<Question question={questioninfo} questionid={qid} />
						)}

						<hr />
						<h5 className="ans-count">{answers.length} Answers</h5>
						{/* mapping the answers with answers component */}
						{sortanswers.map((ans) => {
							return (
								<Answer
									key={ans.id}
									id={ans.id}
									userid={ans.userid}
									anonymous={ans.anonymous}
									upvotes={ans.upvotes}
									answer={ans.answer}
									questionid={qid}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default SingleQna;
