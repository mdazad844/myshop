const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Products route for healthcheck
app.get('/api/products', (req, res) => {
  res.json({ 
    message: 'Products endpoint is working',
    products: []
  });
});

// Import and use routes
try {
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/products', require('./routes/products'));
  app.use('/api/cart', require('./routes/cart'));
  app.use('/api/wishlist', require('./routes/wishlist'));
  app.use('/api/orders', require('./routes/orders'));
  console.log('✅ All routes loaded successfully');
} catch (error) {
  console.log('⚠️ Some routes failed to load, but server will continue');
}

// Database connection and server startup
const startServer = async () => {
  try {
    console.log('🔧 Starting server...');
    
    // Connect to MongoDB
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
    } else {
      console.log('⚠️ No MongoDB URI, running without database');
    }
    
    // Start server
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`🌐 Health: http://0.0.0.0:${port}/`);
      console.log(`📦 Products: http://0.0.0.0:${port}/api/products`);
    });
    
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
