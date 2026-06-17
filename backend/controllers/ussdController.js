import Product from '../models/Product.js';

export const handleUSSDRequest = async (req, res) => {
  const { sessionId, phoneNumber, text } = req.body;

  // Text comes as a string of inputs separated by asterisks: "1*2*Maize"
  const inputs = text ? text.split('*') : [];
  const step = inputs.length;

  try {
    // Main Menu
    if (step === 0) {
      return res.send(`CON Welcome to AgriTech Pipeline!
1. Check Crop Prices
2. List Produce
3. My Orders
0. Exit`);
    }

    // Route 1: Check Prices
    if (inputs[0] === '1') {
      if (step === 1) {
        return res.send(`CON Select Category:
1. Grains
2. Tubers
3. Vegetables
0. Back`);
      }
      
      if (step === 2) {
        const categories = { '1': 'Grains', '2': 'Tubers', '3': 'Vegetables' };
        const selectedCat = categories[inputs[1]];
        
        if (!selectedCat) return res.send(`CON Invalid option. 0. Back`);

        const products = await Product.find({ category: selectedCat }).limit(3);
        if (products.length === 0) {
          return res.send(`CON No products in ${selectedCat}. 0. Back`);
        }

        const priceList = products.map(p => `${p.name}: N${p.price}/${p.unit}`).join('\n');
        return res.send(`CON Latest ${selectedCat}:\n${priceList}\n0. Back`);
      }
    }

    // Route 2: List Produce (Basic)
    if (inputs[0] === '2') {
      if (step === 1) {
        return res.send(`CON Enter Crop Name (e.g. Maize):`);
      }
      if (step === 2) {
        return res.send(`CON Enter Quantity (e.g. 10):`);
      }
      if (step === 3) {
        const cropName = inputs[1];
        const qty = inputs[2];
        // In a real app, we'd find the user by phoneNumber and create a Product
        return res.send(`END Your request for ${qty} ${cropName} has been received. An agent will contact you soon.`);
      }
    }

    // Back to main menu
    if (inputs[step - 1] === '0') {
      return res.send(`CON Welcome to AgriTech Pipeline!
1. Check Crop Prices
2. List Produce
3. My Orders
0. Exit`);
    }

    return res.send(`END Invalid option. Please try again.`);
  } catch (error) {
    console.error('USSD Error:', error);
    return res.send(`END Service temporarily unavailable.`);
  }
};
