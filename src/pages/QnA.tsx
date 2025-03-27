import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const QnA = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* The container will be handled by the iframe's parent or global styles if needed */}
      {/* The title might be redundant if the iframe provides its own */}
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        QnA with TBControl
      </h1> */}
      <iframe
        src="https://udify.app/chatbot/Naxtve6aoQYTHGbu"
        style={{ width: '100%', height: '100%', minHeight: '700px', border: 'none' }} // Added border: none
        // frameborder="0" // Deprecated, use style instead
        allow="microphone"
        title="QnA with TBControl Chatbot" // Added title for accessibility
      ></iframe>
      <div className="mt-8 flex justify-center"> {/* Moved below iframe, added margin-top and centering */}
        <Link to="/advanced-screening">
          <Button className="bg-[#00838F] text-white hover:bg-[#006971]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Advanced Screening Tools
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QnA;
