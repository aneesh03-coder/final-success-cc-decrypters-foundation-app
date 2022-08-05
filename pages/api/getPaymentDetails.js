import { db } from "../../firebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db
      .collection("campaigns")
      .doc(req.body.campaign.campaignId)
      .collection("payments")
      .get()
      .then((querySnapshot) => {
        let payments = [];
        querySnapshot.forEach((doc) => {
          payments.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        return res.status(200).json(payments);
      });
  }
}
