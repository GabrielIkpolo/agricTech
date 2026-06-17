import axios from 'axios';
import fs from 'fs';

const API_URL = 'http://localhost:5000/api';

async function runTest() {
  console.log('🚀 Starting Full Trade Cycle Integration Test...\n');

  try {
    // 1. Create Users
    console.log('--- Step 1: Creating Users ---');
    const farmerRes = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Farmer Musa',
      email: `musa_${Date.now()}@test.com`,
      password: 'password123',
      role: 'FARMER',
      phoneNumber: '08011122233',
      address: 'Jos, Plateau State'
    });
    const farmer = farmerRes.data;
    console.log('✅ Farmer Created:', farmer.name);

    const buyerRes = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Buyer Emeka',
      email: `emeka_${Date.now()}@test.com`,
      password: 'password123',
      role: 'BUYER',
      phoneNumber: '08044455566',
      address: 'Lagos, Nigeria'
    });
    const buyer = buyerRes.data;
    console.log('✅ Buyer Created:', buyer.name);

    const driverRes = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Driver Chidi',
      email: `chidi_${Date.now()}@test.com`,
      password: 'password123',
      role: 'DRIVER',
      phoneNumber: '08077788899',
      address: 'Abuja, Nigeria'
    });
    const driver = driverRes.data;
    console.log('✅ Driver Created:', driver.name);

    // 2. Farmer Lists a Product
    console.log('\n--- Step 2: Listing Product ---');
    const productRes = await axios.post(`${API_URL}/products`, 
      {
        name: 'Premium White Maize',
        description: 'High quality dried maize',
        quantity: 100,
        unit: 'bag',
        price: 25000,
        category: 'Grains',
        location: 'Jos'
      }, 
      { headers: { Authorization: `Bearer ${farmer.token}` } }
    );
    const product = productRes.data;
    console.log('✅ Product Listed:', product.name, 'at ₦', product.price);

    // 3. Buyer Searches for Product
    console.log('\n--- Step 3: Searching for Product ---');
    const searchRes = await axios.get(`${API_URL}/products?search=Maize`);
    const foundProduct = searchRes.data.find(p => p._id === product._id);
    if (!foundProduct) throw new Error('Product not found in search results');
    console.log('✅ Product Found in Marketplace!');

    // 4. Buyer Places Order
    console.log('\n--- Step 4: Placing Order ---');
    const orderRes = await axios.post(`${API_URL}/orders`, 
      {
        productId: product._id,
        quantity: 10
      }, 
      { headers: { Authorization: `Bearer ${buyer.token}` } }
    );
    const order = orderRes.data;
    console.log('✅ Order Placed. Order ID:', order._id);

    // 5. Simulate Payment Webhook (Escrow)
    console.log('\n--- Step 5: Simulating Payment (Webhook) ---');
    await axios.post(`${API_URL}/payments/webhook`, {
      event: 'charge.success',
      data: {
        metadata: { orderId: order._id }
      }
    });
    console.log('✅ Payment Webhook processed. Funds held in Escrow.');

    // 6. Farmer Assigns Driver
    console.log('\n--- Step 6: Assigning Driver ---');
    await axios.put(`${API_URL}/orders/${order._id}/driver`, 
      { driverId: driver._id }, 
      { headers: { Authorization: `Bearer ${farmer.token}` } }
    );
    console.log('✅ Driver assigned to order.');

    // 7. Farmer marks as Shipped
    console.log('\n--- Step 7: Marking as Shipped ---');
    await axios.put(`${API_URL}/orders/${order._id}/status`, 
      { status: 'SHIPPED' }, 
      { headers: { Authorization: `Bearer ${farmer.token}` } }
    );
    console.log('✅ Order marked as Shipped.');

    // 8. Buyer marks as Delivered
    console.log('\n--- Step 8: Marking as Delivered ---');
    await axios.put(`${API_URL}/orders/${order._id}/status`, 
      { status: 'DELIVERED' }, 
      { headers: { Authorization: `Bearer ${buyer.token}` } }
    );
    console.log('✅ Order marked as Delivered.');

    // 9. Buyer leaves a review
    console.log('\n--- Step 9: Leaving a Review ---');
    await axios.post(`${API_URL}/reviews`, 
      {
        productId: product._id,
        farmerId: farmer._id,
        rating: 5,
        comment: 'Excellent quality and fast delivery!',
        orderId: order._id
      }, 
      { headers: { Authorization: `Bearer ${buyer.token}` } }
    );
    console.log('✅ Review submitted. Farmer rating updated.');

    console.log('\n\n🎉 ALL TESTS PASSED! The AgriTech Pipeline is fully functional. 🎉');

  } catch (error) {
    console.error('\n❌ TEST FAILED!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

runTest();
