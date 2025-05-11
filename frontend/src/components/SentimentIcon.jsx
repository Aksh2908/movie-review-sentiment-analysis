export default function SentimentIcon({ sentiment }) {
    if (sentiment === "positive") {
      return <span className="text-green-600 text-2xl">😊</span>;
    }
    if (sentiment === "negative") {
      return <span className="text-red-600 text-2xl">😞</span>;
    }
    return null;
  }
  