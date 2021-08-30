import { auth, db } from "../components/Firebase";

function changeProfilePic(id, file) {
  let dataUrl;
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      dataUrl = reader.result;
      updateProfilePic(id, dataUrl);
    };
    return dataUrl;
  }
  return null;
}

async function updateProfilePic(id, url) {
  console.log(id);
  await db.collection("users").doc(id).update({ imgUrl: url });
}

export { changeProfilePic };
