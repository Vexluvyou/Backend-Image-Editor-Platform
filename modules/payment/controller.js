// import MyEnvironment from '../../core/environment.js';

import IPaymentRepository from './repository.js';
import { BadRequest, ItemNotFound, InternalServerError, NotFound } from '../../utills/status/error.js';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import MyEnvironment from '../../core/environment.js';

// import { NextRequest, NextResponse } from 'next/server';

class PaymentController {

  // ========== GET WEBHOOK ========== // 
  async Getwebhook(req, res) {
    try {
      dayjs.extend(utc);
      const payload = req.body;
      const data = payload.data;
      const eventType = payload.event_type;

      const firstItem = data.items?.[0];
      const price = firstItem?.price;
      const payment = data.payments?.[0];
      const card = payment?.method_details?.card;

      if (eventType === 'subscription.created') {
        await IPaymentRepository.add({
          id: uuidv4(),
          user_id: data.custom_data?.user_id,
          customer_id: data.customer_id,
          price_id: price?.id,
          price_name: price?.name,
          subscription_id: data.id,
          type_card: card?.type,
          last4_card: card?.last4,
          first_billed_at: dayjs.utc(data.current_billing_period?.starts_at).add(55, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          next_billed_at: dayjs.utc(data.current_billing_period?.ends_at).add(55, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          billing_interval: price?.billing_cycle?.interval || 'month',
          status: price?.status,
        });
      }

      if (eventType === 'transaction.completed' && payment?.status === 'captured') {
        await IPaymentRepository.add({
          id: uuidv4(),
          user_id: data.custom_data?.user_id,
          customer_id: data.customer_id,
          price_id: price?.id,
          price_name: price?.name,
          subscription_id: data.subscription_id,
          type_card: card?.type,
          last4_card: card?.last4,
          first_billed_at: dayjs.utc(data.billing_period?.starts_at).add(55, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          next_billed_at: dayjs.utc(data.billing_period?.ends_at).add(55, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          billing_interval: price?.billing_cycle?.interval || 'month',
          status: price?.status,
        });
      }

      if (eventType === 'subscription.canceled') {
        await IPaymentRepository.add({
          id: uuidv4(),
          user_id: data.custom_data?.user_id,
          customer_id: data.customer_id,
          price_id: price?.id,
          price_name: price?.name,
          subscription_id: data.id,
          type_card: card?.type,
          last4_card: card?.last4,
          first_billed_at: dayjs.utc(data.current_billing_period?.starts_at).add(55, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          next_billed_at: dayjs.utc(data.current_billing_period?.ends_at).add(55, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          billing_interval: price?.billing_cycle?.interval || 'month',
          status: price?.status,
        });
      }

      return res.status(200).json({ message: 'Webhook received', data: eventType });
    } catch (error) {
      console.error('Webhook error:', error);
      return res.status(500).json({ message: 'Webhook processing failed', error });
    }
  }


  // ========== GET ========== // 

  async Gets(req, res) {
    try {
      const items = await IPaymentRepository.getAll();

      if (!items || items.length === 0) {
        return res.status(200).json({});
      }

      return res.status(200).json(items);

    } catch (error) {
      console.error('Error fetching payment:', error);
      return res.status(new InternalServerError().statusCode).json({
        message: new InternalServerError().message,
      });
    }
  }

  // ========== GET Price ========== // 
  async GetPrice(req, res) {
    try {
      const items = await IPaymentRepository.getAll();

      if (!items || items.length === 0) {
        return res
          .status(new ItemNotFound().statusCode)
          .json({ message: 'No payment records found' });
      }

      const latest = items[0];

      const response = await fetch(`https://sandbox-api.paddle.com/prices/${latest.price_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MyEnvironment.PaddleKey}`, // ✅ replace with your actual key or use env
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch price data: ${response.statusText}`);
      }

      const priceData = await response.json();

      return res.status(200).json(priceData);

    } catch (error) {
      console.error('Error fetching payment:', error);
      return res
        .status(new InternalServerError().statusCode)
        .json({ message: new InternalServerError().message });
    }
  }

  async cancelSubscription(req, res) {
    try {
      const { id } = req.params;
      const { subscription_id } = req.body;

      // const response = await fetch(`https://sandbox-api.paddle.com/subscriptions/${subscription_id}/cancel`, {
      const response = await fetch(`https://sandbox-api.paddle.com/subscriptions/${subscription_id}/cancel`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${MyEnvironment.PaddleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          effective_from: "immediately",
        }),
      });


      if (!response.ok) {
        const err = await response.json();
        return res.status(400).json({ message: err.error });
      } 

      IPaymentRepository.remove(id);

      return res.status(200).json(response);
    } catch (error) {
      console.error("Cancel subscription error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new PaymentController();
