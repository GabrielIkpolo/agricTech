import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewModal = ({ order, product, farmerId, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Using a global service or importing it
      const { reviewService } = await import('../services/api');
      await reviewService.create({
        productId: product._id,
        farmerId,
        rating,
        comment,
        orderId: order._id
      });
      onSubmitted();
      onClose();
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Rate Your Experience</h2>
        <p className="text-gray-500 text-sm mb-6">How was your trade for {product.name}?</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                size={32}
                className={`cursor-pointer transition ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          
          <textarea 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Tell us about the quality, delivery, etc."
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
