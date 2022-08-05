import { db } from "../../firebase";

export default async function handler(req, res) {
  const newCampaign1 = req.body.newCampaign;
  if (req.method === "POST") {
    await db.collection("campaigns").add(newCampaign1);
    return res.status(201).json({
      message: "Successfully saved to the database",
      data: newCampaign1,
    });
  }
}
