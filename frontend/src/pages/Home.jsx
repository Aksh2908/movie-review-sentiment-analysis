import { useNavigate } from "react-router-dom";
import Subheading from "../components/SubHeading";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200">
      <Subheading>How would you like to analyze your review?</Subheading>
      <div className="flex flex-col sm:flex-row gap-8 mt-8 w-full max-w-2xl justify-center">
        <button
          onClick={() => navigate("/text-review")}
          className="flex-1 py-12 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold transition hover:scale-105 hover:shadow-2xl"
        >
          ✍️ Analyze Text Review
        </button>
        <button
          onClick={() => navigate("/audio-review")}
          className="flex-1 py-12 rounded-2xl shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-bold transition hover:scale-105 hover:shadow-2xl"
        >
          🎤 Analyze Audio Review
        </button>
      </div>
    </div>
  );
}
