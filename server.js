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

// Add MongoDB connection with error handling
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Start server only after MongoDB is connected
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Healthcheck available at: http://0.0.0.0:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error);
    console.log('🔧 Please check your MONGODB_URI environment variable');
    process.exit(1); // Exit if database connection fails
  });
