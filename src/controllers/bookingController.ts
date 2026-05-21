import Stripe from 'stripe';
import config from '../config/config.js';

const stripe = new Stripe(config.stripe.stripePrivateKey);

import Tour from '../model/tourModel.js';
import Booking from '../model/bookingModel.js';
import catchAsync from '../utils/catchAsync.js';
import factory from './handlerFactory.js';
import User from '../model/userModel.js';

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  //get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  //create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    // success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-tours`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'aud',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${
                tour.imageCover
              }`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  //create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) return next();
//   await Booking.create({ tour, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });
const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100;
  await Booking.create({ tour, user, price });
};

export const webhookCheckout = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.stripe.webhookSecret,
    );
  } catch (error) {
    return res
      .status(400)
      .send(`⚠️  Webhook signature verification failed: ${error.message}`);
  }
  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

export const createBookings = factory.CreateOne(Booking);
export const getBookings = factory.getOne(Booking);
export const getAllBookings = factory.getAll(Booking);
export const updateBookings = factory.UpdateOne(Booking);
export const deleteBookings = factory.deleteOne(Booking);
