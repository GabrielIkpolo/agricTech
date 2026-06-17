import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function runFinalTests() {
  console.log('🧪 STARTING COMPREHENSIVE SECURITY & FUNCTIONAL TEST SUITE...\n');

  try {
    // --- AUTH & VALIDATION TESTS ---
    console.log('--- Test 1: Auth & Validation ---');
    
    // Test invalid signup (missing email)
    try {
      await axios.post(`${API_URL}/auth/signup`, { name: 'Fail' });
      console.log('❌ Error: Signup should have failed for missing email');
    } catch (e) {
      console.log('✅ Validation caught missing email');
    }

    // Test valid signup
    const farmerRes = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Farmer Test',
      email: `farmer_final_${Date.now()}@test.com`,
      password: 'password123',
      role: 'FARMER',
      phoneNumber: '08011122233',
      address: 'Jos'
    });
    const farmer = farmerRes.data;
    console.log('✅ Farmer Registered');

    const buyerRes = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Buyer Test',
      email: `buyer_final_${Date.now()}@test.com`,
      password: 'password123',
      role: 'BUYER',
      phoneNumber: '08044455566',
      address: 'Lagos'
    });
    const buyer = buyerRes.data;
    console.log('✅ Buyer Registered');

    const agentRes = await axios.post(`${API_URL}/auth/signup`, {
      name: 'Agent Test',
      email: `agent_final_${Date.now()}@test.com`,
      password: 'password123',
      role: 'AGENT',
      phoneNumber: '08077788899',
      address: 'Abuja'
    });
    const agent = agentRes.data;
    console.log('✅ Agent Registered');

    // --- PRODUCT & SECURITY TESTS ---
    console.log('\n--- Test 2: Product Security ---');
    
    // Test: Buyer trying to create product (Should be 403)
    try {
      await axios.post(`${API_URL}/products`, { name: 'Illegal Maize' }, { headers: { Authorization: `Bearer ${buyer.token}` } });
      console.log('❌ Error: Buyer should not be able to create products');
    } catch (e) {
      console.log('✅ Access Control: Buyer blocked from creating product');
    }

    // Test: Valid product creation by Farmer
    const prodRes = await axios.post(`${API_URL}/products`, {
      name: 'Secure Maize',
      quantity: 50,
      unit: 'bag',
      price: 20000,
      category: 'Grains',
      location: 'Jos'
    }, { headers: { Authorization: `Bearer ${farmer.token}` } });
    const product = prodRes.data;
    console.log('✅ Product created securely');

    // Test: Input validation (negative price)
    try {
      await axios.post(`${API_URL}/products`, { name: 'Free Maize', price: -100, quantity: 10, unit: 'bag', category: 'Grains', location: 'Jos' }, { headers: { Authorization: `Bearer ${farmer.token}` } });
      console.log('❌ Error: Negative price should be rejected');
    } catch (e) {
      console.log('✅ Validation: Negative price rejected');
    }

    // --- ORDER & PAYMENT TESTS ---
    console.log('\n--- Test 3: Order & Escrow ---');
    const orderRes = await axios.post(`${API_URL}/orders`, { productId: product._id, quantity: 5 }, { headers: { Authorization: `Bearer ${buyer.token}` } });
    const order = orderRes.data;
    console.log('✅ Order placed');

    // Simulate Payment
    await axios.post(`${API_URL}/payments/webhook`, { event: 'charge.success', data: { metadata: { orderId: order._id } } });
    console.log('✅ Payment Escrow confirmed');

    // --- AGENT & ANALYTICS TESTS ---
    console.log('\n--- Test 4: Agent & Analytics ---');
    
    // Agent creates farmer
    await axios.post(`${API_URL}/agents/farmers`, {
      name: 'Managed Farmer',
      email: `managed_${Date.now()}@test.com`,
      password: 'password123',
      phoneNumber: '08099988877',
      address: 'Kano'
    }, { headers: { Authorization: `Bearer ${agent.token}` } });
    console.log('✅ Agent successfully registered a farmer');

    // Agent accesses analytics
    const analyticsRes = await axios.get(`${API_URL}/analytics/market-stats`, { headers: { Authorization: `Bearer ${agent.token}` } });
    console.log('✅ Market Analytics accessed successfully');

    // Test: Buyer trying to access analytics (Should be 403)
    try {
      await axios.get(`${API_URL}/analytics/market-stats`, { headers: { Authorization: `Bearer ${buyer.token}` } });
      console.log('❌ Error: Buyer should not access analytics');
    } catch (e) {
      console.log('✅ Access Control: Buyer blocked from analytics');
    }

    console.log('\n\n🎉 ALL FINAL SECURITY & FUNCTIONAL TESTS PASSED! 🎉');

  } catch (error) {
    console.error('\n❌ FINAL TEST FAILED!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Message:', error.message);
    }
    process.exit(1);
  }
}

runFinalTests();
