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
          <p className="text-sm text-gray-600 mt-2 text-center">Calculate your Body Mass Index.</p>
        </Link>
        <Link to="/tb-diagnostic" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">TB Diagnostic</Button>
          <p className="text-sm text-gray-600 mt-2 text-center">Assess TB risk based on symptoms and history.</p>
        </Link>
        <Link to="/chest-xray" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">Chest X-ray</Button>
          <p className="text-sm text-gray-600 mt-2 text-center">Analyze chest X-ray images for TB signs.</p>
        </Link>
        <Link to="/qna" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">QnA with TBControl</Button>
          <p className="text-sm text-gray-600 mt-2 text-center">Ask questions about TB to our AI assistant.</p>
        </Link>
        <Link to="/mdr-tb" className="w-full flex flex-col items-center"> {/* Added flex for centering text */}
          <Button className="w-full bg-[#00838F] text-white hover:bg-[#006971]">MDR-TB</Button>
          <p className="text-sm text-gray-600 mt-2 text-center">Info & tools for Multi-Drug Resistant TB.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdvancedScreening;
