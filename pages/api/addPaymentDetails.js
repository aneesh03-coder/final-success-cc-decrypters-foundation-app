import { db } from "../../firebase";
import firebase from "firebase/compat/app";

export default async function handler(req, res) {
  const campaignId = req.body.paymentDetails.campaignId;
  if (req.method === "POST") {
    await db
      .collection("campaigns")
      .doc(campaignId)
      .collection("payments")
      .add({
        ...req.body.paymentDetails,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    return res.status(201).json({
      message: "Succesfully saved to the DB",
      data: req.body.paymentDetails,
    });
  }
}
