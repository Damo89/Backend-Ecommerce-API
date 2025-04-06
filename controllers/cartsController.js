const pool = require('../database/db'); 

//Fetch all cart items for a user
const getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(`
      SELECT c.id, c.user_id, c.product_id, p.name, p.description, c.quantity, c.created_at
      FROM carts c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
};

//Add product to cart
const addToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
  
    try {
      const result = await pool.query(`
        INSERT INTO carts (user_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [user_id, product_id, quantity]);
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error adding to cart:', err);
      res.status(500).json({ error: 'Failed to add product to cart' });
    }
  };

//Update quantity of a cart item
const updateCartItem = async (req, res) => {
    const { cartId } = req.params;
    const { quantity } = req.body;
  
    try {
      const result = await pool.query(`
        UPDATE carts
        SET quantity = $1
        WHERE id = $2
        RETURNING *
      `, [quantity, cartId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating cart item:', err);
      res.status(500).json({ error: 'Failed to update cart item' });
    }
  };

//Remove item from cart
const deleteCartItem = async (req, res) => {
    const { cartId } = req.params;
  
    try {
      const result = await pool.query(`
        DELETE FROM carts
        WHERE id = $1
        RETURNING *
      `, [cartId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      res.json({ message: 'Item removed from cart', deletedItem: result.rows[0] });
    } catch (err) {
      console.error('Error deleting cart item:', err);
      res.status(500).json({ error: 'Failed to delete cart item' });
    }
  };  
  

module.exports = {
  getCartByUserId,
  addToCart,
  updateCartItem,
  deleteCartItem
};
