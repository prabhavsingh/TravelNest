/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51R56DdLAZKL0DGwrQO1XeV13xcGKydXGICNPAfpgiuz9quZqSOmUuY8V8EDj76DYxPrM3a10vqmvkMOrNGZvzv0O00I01Ctxpe',
);

export const bookTour = async (tourId) => {
  try {
    // get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //   console.log('session', session);

    //create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    //   console.log(error);
    showAlert('error', error);
  }
};
