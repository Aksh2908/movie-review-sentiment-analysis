export default function Footer() {
    return (
      <footer className="bg-blue-50 text-blue-900 py-4 mt-12 border-t">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Movie Review Sentiment Analyzer &middot; Built with React &amp; Flask
        </div>
      </footer>
    );
  }
  