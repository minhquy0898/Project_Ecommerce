import express from 'express'
import Stripe from 'stripe'
import order from '../models/orderModel.js'
import dotenv from 'dotenv'
dotenv.config()
const stripe = Stripe(process.env.STRIPE_KEY)

const router = express.Router()

// Post
router.post('/create-checkout-session', async (req, res) => {

    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            cart: JSON.stringify(req.body.cartItems)
        }
    })

    const line_items = req.body.cartItems.map((item) => {

        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.desc,
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'KE', 'VN'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    // Delivers between 5-7 bussiness days
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    }
                }
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'usd'
                    },
                    display_name: 'Next day air',
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1
                        }
                    }
                }
            }
        ],
        phone_number_collection: {
            enabled: true
        },
        customer: customer.id,
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.send({ url: session.url });
});

// Create Order
const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);

    const newOrder = new Order({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        products: Items,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.patment_Status
    });

    try {
        const saveOrder = await newOrder.save()

        console.log("Proessed Order :", saveOrder);
    } catch (err) {
        console.log(err)
    }
}

let endpointSecret;
// endpointSecret
//     = 'whsec_0ca495b6f5350fd254f7832bdb1a9e24ae9906af4b74a25d6ead047ade0559a8';

router.post(
    "/webhook",
    express.json({ type: "application/json" }),
    (req, res) => {
        const sig = req.headers["stripe-signature"];

        let data;
        let eventType;

        if (webhookSecret) {

            let event;

            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    sig,
                    endpointSecret
                );
                console.log("Webhook verified");
            } catch (err) {
                console.log(` Webhook Error: ${err.message}`);
                res.status(400).send(`Webhook Errpoe ${err.message}`)
                return;
            }

            data = event.data.object;
            eventType = event.type;
        } else {
            data = req.body.data.object;
            eventType = req.body.type;
        }

        // Handle the event
        if (eventType === "checkout.session.completed") {
            stripe.customers.retrieve(data.customer).then(
                (customer) => {
                    createOrder(customer, data)
                }
            ).catch((err) => console.log(err.message))
        }


        // Return a 200 response to acknowledge receipt of the event
        res.send().end()
    });