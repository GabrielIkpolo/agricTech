import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShoppingCart, Truck, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-green-600 font-bold text-2xl">
          <Leaf className="w-8 h-8" />
          <span>AgriTech Pipeline</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-green-600 font-medium transition">
            Log In
          </Link>
          <Link to="/signup" className="px-5 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition shadow-md">
            Join Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 py-16 md:py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
            Bridging the Gap from <span className="text-green-600">Farm to Table</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The most trusted digital ecosystem for Nigerian agriculture. We connect rural farmers with bulk buyers and reliable logistics to ensure fair pricing, quality produce, and secure payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg group">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/marketplace" className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
              Explore Marketplace
            </Link>
          </div>
        </div>
        <div className="relative">
          <img 
            src="/src/assets/hero.png" 
            alt="Nigerian Agriculture" 
            className="rounded-3xl shadow-2xl w-full h-auto object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000'; }}
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
            <div className="bg-green-100 p-2 rounded-full">
              <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-bold">Secure Escrow</p>
              <p className="text-xs text-gray-500">Payment held until delivery</p>
            </div>
          </div>
        </div>
      </header>

      {/* Role-Based Benefits */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored for Every Player</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Whether you grow it, buy it, or move it, AgriTech Pipeline makes the process seamless and profitable.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Farmers */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 transition group">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition">
                <Leaf className="w-7 h-7 text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Farmers</h3>
              <p className="text-gray-600 mb-6">Get fair market prices by reaching bulk buyers directly. No more exploitative middlemen.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /> Direct Market Access</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /> Better Price Discovery</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /> Secure Payouts</li>
              </ul>
              <Link to="/signup" className="text-green-600 font-bold hover:underline flex items-center gap-1">Join as Farmer <ArrowRight className="w-4 h-4" /></Link>
            </div>

            {/* Buyers */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 transition group">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition">
                <ShoppingCart className="w-7 h-7 text-blue-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Bulk Buyers</h3>
              <p className="text-gray-600 mb-6">Source fresh, quality produce from verified farmers. Scale your supply chain with confidence.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-500" /> Quality Assurance</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-500" /> Reduced Procurement Costs</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-blue-500" /> Secure Escrow Payments</li>
              </ul>
              <Link to="/signup" className="text-blue-600 font-bold hover:underline flex items-center gap-1">Join as Buyer <ArrowRight className="w-4 h-4" /></Link>
            </div>

            {/* Drivers */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 transition group">
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition">
                <Truck className="w-7 h-7 text-orange-600 group-hover:text-white transition" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Logistics</h3>
              <p className="text-gray-600 mb-6">Turn your vehicle into a profit machine. Find available loads and get paid for every trip.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-orange-500" /> Real-time Load Matching</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-orange-500" /> Optimized Routing</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-orange-500" /> Guaranteed Payouts</li>
              </ul>
              <Link to="/signup" className="text-orange-600 font-bold hover:underline flex items-center gap-1">Join as Driver <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">A simple, transparent process to move produce from the farm to the city.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">1</div>
            <h4 className="font-bold mb-2">Farmer Lists</h4>
            <p className="text-sm text-gray-500">Farmers upload their harvest, quantity, and expected price.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">2</div>
            <h4 className="font-bold mb-2">Buyer Orders</h4>
            <p className="text-sm text-gray-500">Buyer finds the produce and pays into the secure escrow account.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">3</div>
            <h4 className="font-bold mb-2">Driver Delivers</h4>
            <p className="text-sm text-gray-500">A verified driver is assigned, picks up the produce and delivers it.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">4</div>
            <h4 className="font-bold mb-2">Payment Released</h4>
            <p className="text-sm text-gray-500">Once delivery is confirmed, escrow funds are released to the farmer.</p>
          </div>
        </div>
      </section>

      {/* Trust / Escrow Section */}
      <section className="bg-green-600 py-16 px-6 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-8 h-8" />
              <span className="font-bold uppercase tracking-wider text-green-200">Trust & Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">No More Trust Issues. <br />Just Secure Trade.</h2>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              In the traditional market, farmers fear not getting paid, and buyers fear getting poor quality produce. Our **Trust-Based Escrow System** eliminates this risk. Money is held securely by the platform and only released when the buyer confirms the produce has arrived in the promised condition.
            </p>
            <Link to="/signup" className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg inline-block">
              Start Trading Securely
            </Link>
          </div>
          <div className="hidden md:block bg-green-500 p-8 rounded-3xl border border-green-400 shadow-inner">
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-4">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                <p className="text-sm">Buyer has deposited ₦250,000 into Escrow</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-4 ml-8">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm">Driver "Okon" has picked up the load</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex items-center gap-4 ml-16">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="text-sm">Delivery confirmed by Buyer</p>
              </div>
              <div className="bg-white text-green-600 p-4 rounded-xl flex items-center gap-4 ml-20 font-bold shadow-lg">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm">₦250,000 released to Farmer's wallet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
                <Leaf className="w-6 h-6" />
                <span>AgriTech Pipeline</span>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                Powered by <span className="text-gray-900 font-bold">Gikps</span>
              </p>
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#terms" className="hover:text-green-600 transition">Terms of Service</a>
              <a href="#privacy" className="hover:text-green-600 transition">Privacy Policy</a>
              <a href="#contact" className="hover:text-green-600 transition">Contact</a>
            </div>
          </div>

          {/* Legal Disclaimer Section */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="text-[11px] leading-relaxed text-gray-400 uppercase tracking-widest font-semibold">
              Legal Disclaimer & Limitation of Liability
            </div>
            <div className="text-[12px] leading-relaxed text-gray-500 text-justify md:text-center space-y-4">
              <p>
                <strong>Limitation of Liability:</strong> AgriTech Pipeline and Gikps (the "Company") provide this platform as a facilitator for agricultural trade. The Company shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform, including but not limited to crop quality disputes, delivery delays, or financial losses arising from user-to-user transactions.
              </p>
              <p>
                <strong>Indemnity Clause:</strong> By using this platform, the user agrees to indemnify, defend, and hold harmless Gikps, its developers, and affiliates from any claims, losses, or expenses (including legal fees) arising out of the user's breach of these terms, negligence, or misuse of the platform's services.
              </p>
              <p>
                <strong>User Responsibilities:</strong> Users are solely responsible for verifying the identity of their trading partners and the quality of goods received. While the Escrow system provides a layer of security, the final acceptance of goods is the sole responsibility of the Buyer.
              </p>
              <p>
                <strong>No Guarantee:</strong> The Company does not guarantee the accuracy of listings or the performance of third-party logistics providers. All trade is conducted at the user's own risk.
              </p>
            </div>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} AgriTech Pipeline Nigeria. A product of Gikps. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
