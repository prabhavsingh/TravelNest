import express from 'express';
import bookingController from '../controllers/bookingController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBookings);

router
  .route('/:id')
  .get(bookingController.getBookings)
  .patch(bookingController.updateBookings)
  .delete(bookingController.deleteBookings);

export default router;
