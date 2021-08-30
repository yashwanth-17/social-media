export const collectIdandDocs = (doc) => {
	return { id: doc.id, ...doc.data() };
};
