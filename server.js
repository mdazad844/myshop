// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API is running!',
    status: 'healthy'
  });
});

// Your existing routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/orders', require('./routes/orders'));

// Make sure you're listening on all interfaces
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
