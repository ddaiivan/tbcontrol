
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Types
type Question = {
  id: string;
  text: string;
  category: "main" | "risk" | "mdr";
  weight: number;
};

type Answer = {
  questionId: string;
  answer: boolean | string;
};

type ConditionAnswer = {
  id: string;
  text: string;
};

const Screening = () => {
  // States
  const [currentStep, setCurrentStep] = useState(0);
  const [section, setSection] = useState<"intro" | "main" | "risk" | "mdr" | "results">("intro");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [conditionAnswers, setConditionAnswers] = useState<string[]>([]);
  const [mdrFlag, setMdrFlag] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ title: "", description: "" });

  // Question sets
  const mainSymptoms: Question[] = [
    { id: "cough", text: "Have you had a persistent cough for more than 2 weeks?", category: "main", weight: 3 },
    { id: "phlegm", text: "Is your cough accompanied by phlegm?", category: "main", weight: 1 },
    { id: "bloodyCough", text: "Have you ever coughed up phlegm mixed with blood?", category: "main", weight: 2 },
    { id: "fever", text: "Have you experienced intermittent fever over the past few weeks?", category: "main", weight: 2 },
    { id: "nightSweat", text: "Do you often sweat at night even when the weather is not hot?", category: "main", weight: 2 },
    { id: "weightLoss", text: "Have you lost weight unintentionally in the last few months?", category: "main", weight: 2 },
    { id: "appetite", text: "Have you experienced a drastic loss of appetite?", category: "main", weight: 1 },
    { id: "fatigue", text: "Do you often feel very tired or weak for no apparent reason?", category: "main", weight: 1 },
    { id: "chestPain", text: "Do you experience chest pain or shortness of breath when coughing or breathing?", category: "main", weight: 1 },
  ];

  const riskFactors: Question[] = [
    { id: "contact", text: "Have you lived with or had close contact with someone diagnosed with active TB in the last 2 years?", category: "risk", weight: 3 },
    { id: "conditions", text: "Do you have any of the following medical conditions?", category: "risk", weight: 2 },
    { id: "smoking", text: "Are you an active smoker?", category: "risk", weight: 1 },
    { id: "occupation", text: "Do you work in a high-risk environment for TB (e.g., healthcare worker, prison staff)?", category: "risk", weight: 2 },
    { id: "ventilation", text: "Do you feel the ventilation conditions in your home or workplace are poor?", category: "risk", weight: 1 },
  ];

  const mdrQuestions: Question[] = [
    { id: "previousTB", text: "Have you ever been diagnosed and treated for TB before?", category: "mdr", weight: 2 },
    { id: "completedTreatment", text: "Did you complete your previous TB treatment fully as recommended by your doctor (usually at least 6 months)?", category: "mdr", weight: 3 },
    { id: "failedTreatment", text: "Have you ever been told by a doctor that your previous TB treatment failed?", category: "mdr", weight: 3 },
    { id: "discontinuedMeds", text: "Have you ever stopped taking TB medication before the time prescribed by your doctor, even for just a few days/weeks?", category: "mdr", weight: 3 },
    { id: "mdrContact", text: "Are you aware that a person you had contact with (who had TB) was diagnosed with MDR-TB (Drug-Resistant TB)?", category: "mdr", weight: 3 },
    { id: "hiv", text: "Do you have HIV?", category: "mdr", weight: 2 },
  ];

  const medicalConditions: ConditionAnswer[] = [
    { id: "diabetes", text: "Diabetes Mellitus" },
    { id: "hiv_aids", text: "HIV/AIDS" },
    { id: "kidney", text: "Chronic Kidney Disease" },
    { id: "autoimmune", text: "Autoimmune Disease" },
    { id: "transplant", text: "Post Organ Transplant" },
    { id: "cancer", text: "Cancer or undergoing chemotherapy" },
    { id: "malnutrition", text: "Malnutrition" },
    { id: "other", text: "Other conditions that weaken the immune system" },
  ];

  // Current question based on section
  const getCurrentQuestion = () => {
    if (section === "main") {
      return mainSymptoms[currentStep];
    } else if (section === "risk") {
      return riskFactors[currentStep];
    } else if (section === "mdr") {
      return mdrQuestions[currentStep];
    }
    return null;
  };

  // Handle answering questions
  const handleAnswer = (answer: boolean | string) => {
    const question = getCurrentQuestion();
    if (!question) return;

    // Save answer
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === question.id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex].answer = answer;
    } else {
      newAnswers.push({
        questionId: question.id,
        answer,
      });
    }
    
    setAnswers(newAnswers);
    
    // NOTE: Removed moveToNext() call from here. User must click the 'Next' button.
  };

  // Handle condition checkboxes
  const handleConditionToggle = (conditionId: string) => {
    setConditionAnswers(prev => {
      if (prev.includes(conditionId)) {
        return prev.filter(id => id !== conditionId);
      } else {
        return [...prev, conditionId];
      }
    });
  };

  // Move to next question or section
  const moveToNext = () => {
    if (section === "intro") {
      // Move from intro to main symptoms
      setSection("main");
      setCurrentStep(0);
      return;
    }

    // Special case for conditions question
    if (section === "risk" && getCurrentQuestion()?.id === "conditions") {
      const newAnswers = [...answers];
      const existingIndex = newAnswers.findIndex(a => a.questionId === "conditions");
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex].answer = conditionAnswers.length > 0;
      } else {
        newAnswers.push({
          questionId: "conditions",
          answer: conditionAnswers.length > 0,
        });
      }
      
      setAnswers(newAnswers);
    }

    // Check if we're at the end of current section
    if (section === "main" && currentStep >= mainSymptoms.length - 1) {
      setSection("risk");
      setCurrentStep(0);
    } else if (section === "risk" && currentStep >= riskFactors.length - 1) {
      // Check if we should show MDR section based on answers
      const shouldShowMdrSection = checkIfShouldShowMdrSection();
      
      if (shouldShowMdrSection) {
        setSection("mdr");
        setCurrentStep(0);
      } else {
        calculateResults();
        setSection("results");
      }
    } else if (section === "mdr" && currentStep >= mdrQuestions.length - 1) {
      calculateResults();
      setSection("results");
    } else {
      // Just move to next question in current section
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to previous question or section
  const moveToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // At first question of a section, move to previous section
      if (section === "main") {
        setSection("intro");
      } else if (section === "risk") {
        setSection("main");
        setCurrentStep(mainSymptoms.length - 1);
      } else if (section === "mdr") {
        setSection("risk");
        setCurrentStep(riskFactors.length - 1);
      }
    }
  };

  // Check if MDR section should be shown
  const checkIfShouldShowMdrSection = () => {
    // Show MDR section if user had TB before or had contact with TB patient
    const hadTbBefore = answers.some(a => a.questionId === "contact" && a.answer === true);
    return hadTbBefore;
  };

  // Calculate results based on answers
  const calculateResults = () => {
    // Calculate score
    let score = 0;
    let hasKeySymptoms = false;
    
    // Check for key symptoms like persistent cough
    const persistentCough = answers.find(a => a.questionId === "cough");
    if (persistentCough && persistentCough.answer === true) {
      hasKeySymptoms = true;
      score += 3;
    }
    
    // Add up all other symptom weights
    for (const answer of answers) {
      if (answer.answer === true) {
        const question = [...mainSymptoms, ...riskFactors, ...mdrQuestions].find(q => q.id === answer.questionId);
        if (question && answer.questionId !== "cough") { // Avoid double counting cough
          score += question.weight;
        }
      }
    }
    
    // Check for MDR risk factors
    const previousTB = answers.find(a => a.questionId === "previousTB");
    const completedTreatment = answers.find(a => a.questionId === "completedTreatment");
    const failedTreatment = answers.find(a => a.questionId === "failedTreatment");
    const discontinuedMeds = answers.find(a => a.questionId === "discontinuedMeds");
    const mdrContact = answers.find(a => a.questionId === "mdrContact");
    
    // Set MDR flag if applicable
    if (
      (previousTB?.answer === true && (
        completedTreatment?.answer === false ||
        failedTreatment?.answer === true ||
        discontinuedMeds?.answer === true
      )) ||
      mdrContact?.answer === true
    ) {
      setMdrFlag(true);
    }
  };

  // Get risk level based on scores
  const getRiskLevel = () => {
    // Check for persistent cough (key symptom)
    const hasPersistentCough = answers.some(a => a.questionId === "cough" && a.answer === true);
    
    // Count positive answers in main symptoms
    const positiveMainSymptoms = answers.filter(a => {
      const isMainSymptom = mainSymptoms.some(q => q.id === a.questionId);
      return isMainSymptom && a.answer === true;
    }).length;
    
    // Count positive answers in risk factors
    const positiveRiskFactors = answers.filter(a => {
      const isRiskFactor = riskFactors.some(q => q.id === a.questionId);
      return isRiskFactor && a.answer === true;
    }).length;
    
    // Determine risk level
    if (hasPersistentCough || positiveMainSymptoms >= 3 || (positiveMainSymptoms >= 2 && positiveRiskFactors >= 1)) {
      return "high";
    } else if (positiveMainSymptoms >= 1 || positiveRiskFactors >= 2) {
      return "medium";
    } else {
      return "low";
    }
  };

  // Reset all state and start over
  const resetScreening = () => {
    setAnswers([]);
    setConditionAnswers([]);
    setCurrentStep(0);
    setSection("intro");
    setMdrFlag(false);
  };

  // Show info dialog with specific content
  const showInfo = (title: string, description: string) => {
    setCurrentInfo({ title, description });
    setShowInfoDialog(true);
  };

  // Calculated values
  const riskLevel = section === "results" ? getRiskLevel() : "low";
  const progress = 
    section === "intro" ? 0 :
    section === "main" ? ((currentStep + 1) / mainSymptoms.length) * 0.4 :
    section === "risk" ? 0.4 + ((currentStep + 1) / riskFactors.length) * 0.3 :
    section === "mdr" ? 0.7 + ((currentStep + 1) / mdrQuestions.length) * 0.3 :
    1;

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
            Initial TB Screening
          </h1>
          <p className="text-lg text-gray-600">
            Answer a few simple questions to assess your TB risk
          </p>
        </div>

        <div className="w-full max-w-2xl mx-auto">
          {section === "intro" ? (
            <Card className="p-6 shadow-md">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Welcome to the Initial TB Screening</h2>
                
                <Alert className="bg-blue-50 border-blue-200 text-left">
                  <AlertTitle className="text-blue-800 font-bold flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    DISCLAIMER
                  </AlertTitle>
                  <AlertDescription className="text-blue-800">
                    This screening is ONLY an initial tool based on the symptoms and history you report. 
                    The results CANNOT replace a medical diagnosis by a doctor or healthcare 
                    professional. If you have concerns about your health, 
                    IMMEDIATELY consult a doctor or visit the nearest health facility.
                  </AlertDescription>
                </Alert>
                
                <div className="text-left space-y-2 my-4">
                  <p className="font-medium">You will answer questions about:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Common TB symptoms you might be experiencing</li>
                    <li>Risk factors related to TB</li>
                    <li>TB treatment history (if relevant)</li>
                  </ul>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full mt-4 text-white" // Added text-white
                  onClick={() => setSection("main")}
                >
                  Start Screening
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ) : section === "results" ? (
            <Card className="p-6 shadow-md">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Screening Results</h3>
                <div
                  className={`mb-6 text-lg font-medium ${
                    riskLevel === "high"
                      ? "text-red-600"
                      : riskLevel === "medium"
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  Risk Level: {riskLevel.toUpperCase()}
                </div>

                {riskLevel === "high" && (
                  <Alert className="bg-red-50 border-red-200 mb-6 text-left">
                    <AlertTitle className="flex items-center text-red-700">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Important Attention
                    </AlertTitle>
                    <AlertDescription className="text-red-700">
                      Based on your answers, there are significant symptoms and/or risk factors 
                      that require attention regarding TB. This result is NOT a diagnosis. We strongly 
                      recommend that you IMMEDIATELY consult a doctor or visit the nearest 
                      Health Center/Facility for further examination (such as 
                      sputum test or X-ray). Do not delay examination.
                    </AlertDescription>
                  </Alert>
                )}

                {mdrFlag && (
                  <Alert className="bg-amber-50 border-amber-200 mb-6 text-left">
                    <AlertTitle className="flex items-center text-amber-700">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      MDR-TB Risk
                    </AlertTitle>
                    <AlertDescription className="text-amber-700">
                      IMPORTANT: Your history indicates a potential risk of Drug-Resistant TB (MDR-TB). 
                      It is crucial to fully inform your doctor about this history during the 
                      examination so that appropriate tests can be conducted and the most suitable treatment provided.
                    </AlertDescription>
                  </Alert>
                )}

                {riskLevel === "medium" && (
                  <Alert className="bg-orange-50 border-orange-200 mb-6 text-left">
                    <AlertTitle className="flex items-center text-orange-700">
                      <Info className="h-5 w-5 mr-2" />
                      Recommendation
                    </AlertTitle>
                    <AlertDescription className="text-orange-700">
                      You show some symptoms that may be related to TB. It is recommended 
                      to consult with a healthcare professional for further evaluation.
                    </AlertDescription>
                  </Alert>
                )}

                {riskLevel === "low" && (
                  <Alert className="bg-green-50 border-green-200 mb-6 text-left">
                    <AlertTitle className="flex items-center text-green-700">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Recommendation
                    </AlertTitle>
                    <AlertDescription className="text-green-700">
                      Based on your answers, your TB risk is low. However, continue to monitor 
                      your health and consult a healthcare professional if new symptoms appear.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
                  <p className="font-bold mb-2">Important:</p>
                  <p className="text-gray-700">
                    These screening results are NOT a medical diagnosis. This screening is only
                    an initial tool to assess risk. Consult with a
                    healthcare professional for proper evaluation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={resetScreening}
                    className="w-full sm:w-auto"
                  >
                    Repeat Screening
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto text-white" // Added text-white
                  >
                    <Link to="/advanced-screening" className="flex items-center">
                      Advanced Screening Tools
                    </Link>
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto text-white" // Added text-white
                    onClick={() => {
                      toast.success("Screening results have been recorded!");
                    }}
                  >
                    <Link to="/facilities" className="flex items-center">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Find Health Facilities
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 shadow-md">
              {/* Progress bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-secondary h-2.5 rounded-full transition-all"
                    style={{ width: `${progress * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {section === "main" && `Symptom ${currentStep + 1} of ${mainSymptoms.length}`}
                  {section === "risk" && `Risk Factor ${currentStep + 1} of ${riskFactors.length}`}
                  {section === "mdr" && `MDR-TB Question ${currentStep + 1} of ${mdrQuestions.length}`}
                </p>
              </div>

              {/* Current question */}
              {section === "risk" && getCurrentQuestion()?.id === "conditions" ? (
                <div>
                  <h3 className="text-xl font-medium mb-4 flex items-start">
                    {getCurrentQuestion()?.text}
                    <button 
                      onClick={() => showInfo(
                        "Medical Conditions", 
                        "These conditions can weaken the immune system, increasing the risk of TB infection or reactivation of latent TB."
                      )}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {medicalConditions.map((condition) => (
                      <div key={condition.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={condition.id}
                          checked={conditionAnswers.includes(condition.id)}
                          onCheckedChange={() => handleConditionToggle(condition.id)}
                        />
                        <Label htmlFor={condition.id}>{condition.text}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={moveToPrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <Button variant="secondary" onClick={moveToNext}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-medium mb-6 flex items-start">
                    {getCurrentQuestion()?.text}
                    {getCurrentQuestion()?.id === "mdrContact" && (
                      <button 
                        onClick={() => showInfo(
                          "MDR-TB", 
                          "MDR-TB (Multi-Drug Resistant Tuberculosis) is a form of TB resistant to at least two of the most effective first-line anti-TB drugs. This condition is harder to treat and requires special treatment."
                        )}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    )}
                  </h3>

                  <RadioGroup
                    // Use value to make it controlled
                    value={
                      answers.find(a => a.questionId === getCurrentQuestion()?.id)?.answer?.toString() || ""
                    }
                    // Handle value change on the group
                    onValueChange={(val) => {
                      if (val === "true") handleAnswer(true);
                      else if (val === "false") handleAnswer(false);
                      else if (val === "skip") handleAnswer("skip");
                    }}
                    className="space-y-3 mb-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="true"
                        id="option-yes"
                        // Remove onClick from item
                      />
                      <Label htmlFor="option-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="false"
                        id="option-no"
                        // Remove onClick from item
                      />
                      <Label htmlFor="option-no">No</Label>
                    </div>
                    {(getCurrentQuestion()?.id === "hiv") && (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="skip"
                          id="option-skip"
                          // Remove onClick from item
                        />
                        <Label htmlFor="option-skip">Prefer not to answer</Label>
                      </div>
                    )}
                  </RadioGroup>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={moveToPrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    {/* Always show Next button, disable if no answer selected (except for conditions) */}
                    <Button
                      variant="secondary"
                      onClick={moveToNext}
                      disabled={
                        getCurrentQuestion()?.id !== 'conditions' && // Don't disable for conditions question
                        !answers.some(a => a.questionId === getCurrentQuestion()?.id)
                      }
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </Card>
          )}

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              Attention: This screening is not a substitute for professional medical diagnosis. If
              you have suspicious symptoms, consult a doctor or the nearest healthcare
              provider immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentInfo.title}</DialogTitle>
            <DialogDescription>
              {currentInfo.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Screening;
