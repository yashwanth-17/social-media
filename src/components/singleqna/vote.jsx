import React, { Component } from "react";
import { db as firestore } from "../Firebase";
import firebase from "firebase/app";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import "./singleqna.css";
class Vote extends Component {
	state = {
		upvotes: this.props.upvotes,
		ansid: this.props.answerid,
		questionid: this.props.questionid,
		answer: {},
	};

	//checking whether user has already upvoted or not and calling upvote
	checkUpvote = () => {
		const { ansid, questionid } = this.state;
		const uid = "sIxa1k22ihcTKktk98C7tpfL89i1";

		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.get()
			.then((doc) => {
				if (doc.data().downvotedUsers.includes(uid)) {
					this.handleUpvote(1);
				} else {
					if (!doc.data().upvotedUsers.includes(uid)) {
						this.handleUpvote(0);
					}
				}
			});
	};
	// checking whether user has already downvoted or not and calling downvote
	checkDownvote = () => {
		const { ansid, questionid } = this.state;
		const uid = "sIxa1k22ihcTKktk98C7tpfL89i1";
		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.get()
			.then((doc) => {
				if (doc.data().upvotedUsers.includes(uid)) {
					this.handleDownvote(-1);
				} else {
					if (!doc.data().downvotedUsers.includes(uid)) {
						this.handleDownvote(0);
					}
				}
			});
	};
	//handling upvote
	handleUpvote = async (v) => {
		let { ansid, upvotes, questionid } = this.state;

		upvotes = upvotes + 1 + v;

		const uid = "sIxa1k22ihcTKktk98C7tpfL89i1";
		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.update({ upvotedUsers: firebase.firestore.FieldValue.arrayUnion(uid) });
		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.update({
				downvotedUsers: firebase.firestore.FieldValue.arrayRemove(uid),
			});

		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.update({ upvotes: upvotes });
		this.setState({ upvotes });
	};
	//handling downvote
	handleDownvote = (v) => {
		let { ansid, upvotes, questionid } = this.state;

		upvotes = upvotes - 1 + v;

		const uid = "sIxa1k22ihcTKktk98C7tpfL89i1";
		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.update({
				downvotedUsers: firebase.firestore.FieldValue.arrayUnion(uid),
			});
		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.update({
				upvotedUsers: firebase.firestore.FieldValue.arrayRemove(uid),
			});
		firestore
			.collection("qnas")
			.doc(questionid)
			.collection("answers")
			.doc(ansid)
			.update({ upvotes: upvotes });

		this.setState({ upvotes });
	};
	render() {
		const { upvotes } = this.state;
		return (
			<div className="Vote">
				<ArrowDropUpOutlinedIcon
					onClick={this.checkUpvote}
					style={{ height: "50", width: "50px", cursor: "pointer" }}
				/>
				<div> {upvotes}</div>
				<ArrowDropDownOutlinedIcon
					onClick={this.checkDownvote}
					style={{ height: "50", width: "50px", cursor: "pointer" }}
				/>
			</div>
		);
	}
}

export default Vote;
