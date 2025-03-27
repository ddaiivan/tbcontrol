import React from 'react';
import { Button } from "@/components/ui/button"; // Import Button
import { Link } from "react-router-dom"; // Import Link
import { ArrowLeft } from "lucide-react"; // Import Icon

const ChestXray: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Chest X-ray AI Analysis</h1>
      {/* Replace placeholder with the iframe */}
      <iframe
         src="https://udify.app/chatbot/l7MjNlUWLiCezBUN"
         style={{ width: '100%', height: '100%', minHeight: '700px' }}
         frameBorder="0"
         allow="microphone">
      </iframe>
      {/* Add Back button */}
      <div className="mt-6 text-center">
        <Link to="/advanced-screening">
          <Button className="bg-[#00838F] text-white hover:bg-[#006971]"> {/* Apply new styles */}
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Advanced Screening Tools
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChestXray;
