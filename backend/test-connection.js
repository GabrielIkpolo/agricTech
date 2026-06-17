import connectDB from './config/db.js';
import User from './models/User.js';

async function test() {
  try {
    await connectDB();
    console.log("Connected successfully!");
    
    const count = await User.countDocuments();
    console.log(`Current User count: ${count}`);
    
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
