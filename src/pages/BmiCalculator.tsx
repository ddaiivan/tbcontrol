import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import { Button } from "@/components/ui/button"; // Added Button
import { Link } from "react-router-dom"; // Added Link

const BmiCalculator = () => {
  const [heightCm, setHeightCm] = useState<number>(160);
  const [weightKg, setWeightKg] = useState<number>(60);
  const [bmi, setBmi] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>("Enter height & weight."); // Translated
  const [interpretationColor, setInterpretationColor] = useState<string>("bg-gray-200 text-gray-800"); // Tailwind classes

  useEffect(() => {
    updateBMI();
  }, [heightCm, weightKg]); // Recalculate whenever height or weight changes

  const calculateBmi = (height: number, weight: number): number | null => {
    if (height <= 0 || weight <= 0) {
      return null;
    }
    const heightM = height / 100;
    return weight / (heightM * heightM);
  };

  const interpretBMI = (calculatedBmi: number | null) => {
    let interp = "";
    let colorClasses = "bg-gray-200 text-gray-800"; // Default

    if (calculatedBmi === null) {
      interp = "Enter valid height & weight."; // Translated
    } else if (calculatedBmi < 18.5) {
      interp = "Underweight. Consider nutritional consultation."; // Translated
      colorClasses = "bg-blue-100 text-blue-800"; // Blue for Underweight
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      interp = "Normal Weight. Maintain a healthy lifestyle!"; // Translated
      colorClasses = "bg-green-100 text-green-800"; // Green for Normal
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      interp = "Overweight. Be mindful of associated health risks."; // Translated
      colorClasses = "bg-yellow-100 text-yellow-800"; // Yellow/Orange for Overweight
    } else if (calculatedBmi >= 30 && calculatedBmi <= 34.9) {
      interp = "Obesity Class I. Increased health risk. Consult your doctor."; // Translated
      colorClasses = "bg-red-100 text-red-800"; // Red for Obesity I
    } else if (calculatedBmi >= 35 && calculatedBmi <= 39.9) {
      interp = "Obesity Class II. High health risk. Consult your doctor immediately."; // Translated
      colorClasses = "bg-red-200 text-red-900"; // Darker Red for Obesity II
    } else if (calculatedBmi >= 40) {
      interp = "Obesity Class III (Morbid). Very high health risk. Requires immediate medical attention."; // Translated
      colorClasses = "bg-purple-200 text-purple-900"; // Purple for Obesity III
    } else {
      interp = "Invalid value."; // Translated
    }

    setInterpretation(interp);
    setInterpretationColor(colorClasses);
  };

  const updateBMI = () => {
    const calculatedBmi = calculateBmi(heightCm, weightKg);
    setBmi(calculatedBmi);
    interpretBMI(calculatedBmi);
    // updateGauge(calculatedBmi); // Placeholder for visual gauge update
  };

  // Handlers for sliders
  const handleHeightChange = (value: number[]) => {
    setHeightCm(value[0]);
  };

  const handleWeightChange = (value: number[]) => {
    setWeightKg(value[0]);
  };

  // Handlers for manual input (optional, added for completeness)
  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setHeightCm(value);
    }
  };

  const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setWeightKg(value);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            BMI Calculator
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Use the sliders or enter numbers to calculate your BMI in real-time. {/* Translated */}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Height Input */}
          <div className="space-y-2">
            <Label htmlFor="height" className="flex justify-between">
              <span>Height</span> {/* Translated */}
              <span className="font-semibold">{heightCm} cm</span>
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="height"
                min={100}
                max={220}
                step={1}
                value={[heightCm]}
                onValueChange={handleHeightChange}
                className="flex-grow"
              />
              <Input
                type="number"
                value={heightCm}
                onChange={handleHeightInputChange}
                className="w-20"
                min={100}
                max={220}
              />
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex justify-between">
              <span>Weight</span> {/* Translated */}
              <span className="font-semibold">{weightKg} kg</span>
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="weight"
                min={30}
                max={200}
                step={0.5}
                value={[weightKg]}
                onValueChange={handleWeightChange}
                className="flex-grow"
              />
               <Input
                type="number"
                value={weightKg}
                onChange={handleWeightInputChange}
                className="w-20"
                min={30}
                max={200}
                step={0.5}
              />
            </div>
          </div>

          {/* BMI Result */}
          <div className="text-center pt-4">
            <p className="text-lg text-gray-600">Your BMI Result:</p> {/* Translated */}
            <p className="text-4xl font-bold text-gray-900">
              {bmi !== null ? bmi.toFixed(1) : "-"}
            </p>
          </div>

          {/* Interpretation */}
          <div className={`p-4 rounded-md text-center ${interpretationColor}`}>
            <p className="font-medium">{interpretation}</p>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 text-center border-t pt-4 mt-6">
            <AlertCircle className="inline-block w-4 h-4 mr-1" />
            <span className="font-semibold">Disclaimer:</span> BMI is one indicator of nutritional status, but it does not account for body composition (muscle vs. fat mass). This result is informative and does not replace professional medical consultation. Discuss this result with your doctor. {/* Translated */}
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="mt-6 text-center">
        <Link to="/advanced-screening">
          <Button className="bg-[#00838F] text-white hover:bg-[#006971]"> {/* Changed styling */}
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Advanced Tools
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BmiCalculator;
