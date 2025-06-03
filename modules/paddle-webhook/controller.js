// Example: controller.js

import db from '../../core/db.js'; // assume this is your MySQL connection

const SubscriptionController = {
  async getSubscription(req, res) {
    try {
      const userId = req.query.userId; // use auth/user ID from query or session
      const [result] = await db.query(
        "SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
        [userId]
      );

      if (!result.length) return res.status(404).json({ error: 'Subscription not found' });

      res.json(result[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

export default SubscriptionController;
