const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const pool = new Pool({
    user: 'your_postgres_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

app.use(bodyParser.json());

// Checkout endpoint
app.post('/checkout', async (req, res) => {
    const { userId, cartItems, totalAmount } = req.body;

    try {
        // Start transaction
        await pool.query('BEGIN');

        // Create a new order
        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING id',
            [userId, totalAmount]
        );
        const orderId = orderResult.rows[0].id;

        // Insert each item into order_items table
        for (const item of cartItems) {
            await pool.query(
                'INSERT INTO order_items (order_id, gadget_id, quantity, price_per_day) VALUES ($1, $2, $3, $4)',
                [orderId, item.gadget_id, item.quantity, item.price]
            );
        }

        // Commit transaction
        await pool.query('COMMIT');
        res.status(200).send({ message: 'Checkout successful!' });
    } catch (error) {
        // Rollback transaction in case of error
        await pool.query('ROLLBACK');
        res.status(500).send({ error: 'Checkout failed.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
