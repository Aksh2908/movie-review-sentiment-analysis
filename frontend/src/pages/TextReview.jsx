import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subheading from "../components/SubHeading";
import SentimentIcon from "../components/SentimentIcon";
import axios from "axios";

export default function TextReview() {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSentiment(null);
    setError("");
    setFeedback(null);

    try {
      const response = await axios.post("http://localhost:5000/api/reviews", { review });
      if (response.data && response.data.sentiment) {
        setSentiment(response.data.sentiment);
        setTimeout(() => navigate("/stats"), 1500);
      } else {
        setError("No sentiment returned from server.");
      }
    } catch (err) {
      setError("Could not analyze sentiment. Please try again.");
    }
    setLoading(false);
  };

  const handleFeedback = (isCorrect) => {
    setFeedback(isCorrect ? "Thank you for your feedback!" : "Sorry for the mistake. We'll improve!");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="text-5xl mb-2">✍️</div>
          <Subheading>Analyze Your Text Review</Subheading>
          <p className="text-gray-500 text-center mb-2">
            Paste or type your movie review below and get instant sentiment analysis.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full mb-6">
          <textarea
            className="w-full min-h-[120px] text-lg p-3 border-2 border-blue-400 rounded-lg focus:border-orange-400 outline-none transition mb-4"
            placeholder="Type your movie review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
        {sentiment && !error && (
          <div className="mt-4 p-4 rounded-lg flex items-center gap-4 bg-gray-100 w-full justify-between">
            <div className="flex items-center gap-2">
              <SentimentIcon sentiment={sentiment} />
              <span className="text-lg font-semibold">
                Sentiment: {sentiment === "positive" ? "Positive" : sentiment === "negative" ? "Negative" : sentiment}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-sm">Was this correct?</span>
              <button onClick={() => handleFeedback(true)} className="text-green-600 font-bold">👍</button>
              <button onClick={() => handleFeedback(false)} className="text-red-600 font-bold">👎</button>
            </div>
          </div>
        )}
        {feedback && (
          <div className="mt-2 text-blue-700 font-medium">{feedback}</div>
        )}
        {error && (
          <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-700 font-semibold w-full">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
