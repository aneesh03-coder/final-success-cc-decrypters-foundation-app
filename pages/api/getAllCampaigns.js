import { db } from "../../firebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await db
      .collection("campaigns")
      .get()
      .then((querySnapshot) => {
        let campaigns = [];
        querySnapshot.forEach((doc) => {
          campaigns.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        return res.status(200).json(campaigns);
      });
  }
}
