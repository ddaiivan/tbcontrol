import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Link } from "react-router-dom"; // Import Link

const AdvancedScreening = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900"> {/* Changed text-primary to text-gray-900 */}
        Advanced Screening Tools
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Please select one of the advanced screening features below:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"> {/* Increased gap */}
        <Link to="/bmi-calculator" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">BMI Calculator</Button>
          <img src="/bmi.png" alt="BMI Chart" className="mt-2 h-24 w-auto object-contain" /> {/* Added image */}
          <p className="text-sm text-gray-600 mt-2 text-center">Calculate your Body Mass Index (BMI) to understand your weight status, which can be a factor in overall health and TB risk.</p>
        </Link>
        <Link to="/tb-diagnostic" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">TB Diagnostic</Button>
          <img src="/tuberculosis.png" alt="TB Bacteria" className="mt-2 h-24 w-auto object-contain" /> {/* Added image */}
          <p className="text-sm text-gray-600 mt-2 text-center">Assess your potential risk for Tuberculosis (TB) by answering questions about your symptoms, medical history, and potential exposure.</p>
        </Link>
        <Link to="/chest-xray" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">Chest X-ray</Button>
          <img src="/medical.png" alt="Chest X-ray Analysis" className="mt-2 h-24 w-auto object-contain" /> {/* Added image */}
          <p className="text-sm text-gray-600 mt-2 text-center">Utilize our AI-powered tool to analyze uploaded chest X-ray images for potential signs indicative of Tuberculosis infection.</p>
        </Link>
        <Link to="/qna" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">QnA with TBControl</Button>
          <img src="/chatbot.png" alt="Chatbot Icon" className="mt-2 h-24 w-auto object-contain" /> {/* Added image */}
          <p className="text-sm text-gray-600 mt-2 text-center">Ask our intelligent AI assistant any questions you have about Tuberculosis, its symptoms, transmission, prevention, and treatment.</p>
        </Link>
        <Link to="/mdr-tb" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">MDR-TB</Button>
          <img src="/tuberculosis (1).png" alt="MDR-TB Info" className="mt-2 h-24 w-auto object-contain" /> {/* Added image */}
          <p className="text-sm text-gray-600 mt-2 text-center">Access specific information and resources related to Multi-Drug Resistant Tuberculosis (MDR-TB), including its causes, diagnosis, and complex treatment protocols.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdvancedScreening;
