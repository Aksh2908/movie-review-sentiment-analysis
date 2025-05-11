import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import TextReview from "../pages/TextReview";
import AudioReview from "../pages/AudioReview.jsx";
import ReviewStats from "../pages/ReviewStats";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "text-review", element: <TextReview /> },
      { path: "audio-review", element: <AudioReview /> },
      { path: "stats", element: <ReviewStats /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

export default router;
