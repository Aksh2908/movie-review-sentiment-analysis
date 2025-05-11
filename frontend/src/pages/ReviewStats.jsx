import Subheading from "../components/SubHeading";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const sentimentColors = {
  positive: "#22c55e",
  negative: "#ef4444",
};

const typeColors = {
  text: "#3b82f6",
  audio: "#10b981",
};

export default function ReviewStats() {
  const [stats, setStats] = useState(null);

  // Refetch reviews every 5 seconds for live updates (optional)
  useEffect(() => {
    const fetchStats = () => {
      axios.get("http://localhost:5000/api/reviews")
        .then(res => {
          const reviews = res.data;
          const totalReviews = reviews.length;
          const positiveReviews = reviews.filter(r => r.sentiment === "positive").length;
          const negativeReviews = reviews.filter(r => r.sentiment === "negative").length;
          const textReviews = reviews.filter(r => r.type === "text").length;
          const audioReviews = reviews.filter(r => r.type === "audio").length;
          const recentReviews = reviews.slice(-4).reverse();

          setStats({
            totalReviews,
            positiveReviews,
            negativeReviews,
            textReviews,
            audioReviews,
            recentReviews,
          });
        });
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Subheading>Review Statistics</Subheading>
        <div>Loading stats...</div>
      </div>
    );
  }

  const { totalReviews, positiveReviews, negativeReviews, textReviews, audioReviews, recentReviews } = stats;

  const sentimentData = [
    { name: "Positive", value: positiveReviews },
    { name: "Negative", value: negativeReviews },
  ];

  const typeData = [
    { name: "Text", value: textReviews },
    { name: "Audio", value: audioReviews },
  ];

  const positivePercent = totalReviews > 0 ? ((positiveReviews / totalReviews) * 100).toFixed(0) : 0;
  const negativePercent = totalReviews > 0 ? ((negativeReviews / totalReviews) * 100).toFixed(0) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Subheading>Review Statistics</Subheading>
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        <StatCard label="Total Reviews" value={totalReviews} />
        <StatCard label="Positive Reviews" value={`${positiveReviews} (${positivePercent}%)`} />
        <StatCard label="Negative Reviews" value={`${negativeReviews} (${negativePercent}%)`} />
        <StatCard label="Text Reviews" value={textReviews} />
        <StatCard label="Audio Reviews" value={audioReviews} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-center text-lg">Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {sentimentData.map((entry, idx) => (
                  <Cell key={entry.name} fill={Object.values(sentimentColors)[idx]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <h3 className="font-semibold mb-4 text-center text-lg">Review Type Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={typeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
              <Bar dataKey="value" name="Reviews">
                {typeData.map((entry, idx) => (
                  <Cell key={entry.name} fill={Object.values(typeColors)[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
        <h3 className="font-semibold mb-4 text-center text-lg">Recent Reviews</h3>
        <ul className="list-disc list-inside space-y-2">
          {recentReviews.map((review, i) => (
            <li key={i} className="text-center">
              <span className="capitalize font-medium">{review.type || "text"}</span> review:{" "}
              <span className={review.sentiment === "positive" ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                {review.sentiment}
              </span>
              <span className="ml-2 italic text-gray-600">"{review.review.length > 60 ? review.review.slice(0, 60) + "..." : review.review}"</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center font-medium text-blue-700 text-lg">
          {positivePercent > negativePercent
            ? "Most reviews this week were positive! 🎉"
            : "Most reviews this week were negative. 😞"}
        </div>
      </div>
    </div>
  );
}
