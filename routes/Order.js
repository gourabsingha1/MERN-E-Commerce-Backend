const express = require('express');
const { fetchOrderByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } = require('../controller/Order');

const router = express.Router();
//  /order is already added in base path
router.post('/', createOrder)
      .get('/user/:userId', fetchOrderByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
      .get('/', fetchAllOrders)

exports.router = router;