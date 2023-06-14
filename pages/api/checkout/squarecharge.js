import { randomUUID } from 'crypto';
import { Client, Environment } from 'square';
import db from "models";
import Backend from "backend"

async function createOrder(req, res, paymentId) {
    try {
        const billingAddress = await db.Address.build({
            country: JSON.stringify(req.body.billingAddress.country),
            state: JSON.stringify(req.body.billingAddress.state),
            city: req.body.billingAddress.city.value,
            apartment: req.body.billingAddress.apartment.value,
            address: req.body.billingAddress.address.value,
            zipcode: req.body.billingAddress.zipcode.value,
            email: req.body.billingAddress.email.value,
            phone: req.body.billingAddress.phone.value,
            firstName: req.body.billingAddress.firstName.value,
            lastName: req.body.billingAddress.lastName.value,
        })
        await billingAddress.save();

        const shippingAddress = await db.Address.build({
            country: JSON.stringify(req.body.shippingAddress.country),
            state: JSON.stringify(req.body.shippingAddress.state),
            city: req.body.shippingAddress.city.value,
            apartment: req.body.shippingAddress.apartment.value,
            address: req.body.shippingAddress.address.value,
            zipcode: req.body.shippingAddress.zipcode.value,
            email: req.body.shippingAddress.email.value,
            phone: req.body.shippingAddress.phone.value,
            firstName: req.body.shippingAddress.firstName.value,
            lastName: req.body.shippingAddress.lastName.value,
        })

        await shippingAddress.save();
        const order = await db.Order.build({
            userId: req.body.userId,
            billingAddressId: billingAddress.id,
            shippingAddressId: shippingAddress.id,
            // shoppingAddressId: shippingAddress.id;
            pid: paymentId,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        order.status = 1;
        await order.save()

        const products = req.body.items

        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            const product = await db.Product.findOne({
                where: {
                    locketId: products[i].locketId,
                    metalId: products[i].metalId,
                    colorId: products[i].colorId,
                }
            })
            for (let j = 0; j < products[i].quantity; j++) {
                const data = await db.SoldProduct.build({
                    userId: req.body.userId,
                    orderId: order.id,
                    productId: product.id,
                    price: products.price
                })
                totalPrice += product.price;
                data.save();
            }
        }

        order.totalPrice = totalPrice;
        order.save();
        return order;
    } catch (e) {
        return {}
    }
}


export default async function handler(req, res) {
    if (req.method == "POST") {
        let totalPrice = 0;
        const line_items = [];
        req.body.items.map((item) => {
            line_items.push({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })
            totalPrice += item.price * 100 * item.quantity
        })

        const client = new Client({
            environment: Environment.Sandbox,
            accessToken: "EAAAEJxjt-WDL3Q_80KMzz6HK6YsECz4h4_nIIPArCDLWM5clgeCPrAjnj-pA4Ac",
        });

        const paymentApi = client.paymentsApi;
        const token = req.body.sourceId;
        const idempotencyKey = randomUUID().toString();
        let shipping = {};
        try {
            let { result } = await paymentApi.createPayment({
                sourceId: token,
                amountMoney: {
                    amount: totalPrice,
                    currency: 'CAD',
                },
                idempotencyKey,
            });
            let order = {};
            if(result.payment.status == 'COMPLETED') {
                order = await createOrder(req, res, result.payment.id);
                shipping = await Backend.sendShipping(order.id, totalPrice)

                order.shippingLabel = `data:image/jpeg;base64,${shipping.ShipmentResponse.ShipmentResults.PackageResults.ShippingLabel.GraphicImage}`
                
                await order.save();
            }
            res.status(200).json({ order, shipping});
        } catch (e) {
            console.error("Error processing payment", e);
            res.status(500).json({ error: "Error processing payment" });
        }
    } else {
        res.setHeader("Allow", ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}