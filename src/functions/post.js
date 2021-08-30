import { getUserById } from "./auth";
import { db } from "./firebase";

async function getPosts() {
  const snap = await db.collection("posts").get();
  let posts = snap.docs.map(async (doc) => {
    let post = {
      id: doc.id,
      ...doc.data(),
    };

    const user = await getUserById(post.postedBy)
    console.log('user:', user)
    post.name = user.name;
    post.imgUrl = user.imgUrl;
    post.branch = user.branch;
    console.log(post)
    return post;
  });
  return posts;
}

export { getPosts };
