const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { donation } = req.body;
  const redirectURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const transformedData = {
    price_data: {
      currency: "usd",
      product_data: {
        name: donation.name,
      },
      unit_amount: donation.price * 100,
    },
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedData],
    mode: "payment",
    success_url: redirectURL + "/Success",
    cancel_url: redirectURL + "/Cancel",
    metadata: {
      name: donation.name,
    },
  });

  res.status(200).json({ id: session.id });
}

export default CreateStripeSession;
