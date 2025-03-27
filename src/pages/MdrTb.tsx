import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Removed CardFooter
import { ArrowRight, Info, ArrowLeft } from "lucide-react"; // Import icons including ArrowLeft
import { Link } from "react-router-dom"; // Import Link

// Define types for state clarity
type SimulationStep =
  | 'start'
  | 'questionnaire'
  | 'outcome_dots_no_xpert'
  | 'outcome_no_tb_mgmt'
  | 'outcome_enroll_cat_II'
  | 'outcome_enroll_cat_I'
  | 'outcome_enroll_mdr_prog'
  | 'outcome_dots_confirm_neg'
  | 'outcome_uncertain_consult_dr';

type InitialCategory = 'catI' | 'relapse' | 'taf' | 'mdr_contact' | null;
type YesNo = 'yes' | 'no' | null;
type XpertResult = 'no_tb' | 'tb_no_r_res' | 'tb_r_res' | null;
type ConfirmationResult = 'confirmed' | 'not_confirmed' | null;

const MdrTb = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('start');
  const [initialCategory, setInitialCategory] = useState<InitialCategory>(null);
  const [xpertAccess, setXpertAccess] = useState<YesNo>(null);
  const [xpertResult, setXpertResult] = useState<XpertResult>(null);
  const [firstConfirm, setFirstConfirm] = useState<ConfirmationResult>(null);
  const [secondConfirm, setSecondConfirm] = useState<ConfirmationResult>(null);

  const resetSimulation = () => {
    setCurrentStep('start');
    setInitialCategory(null);
    setXpertAccess(null);
    setXpertResult(null);
    setFirstConfirm(null);
    setSecondConfirm(null);
  };

  const startSimulation = () => {
    setCurrentStep('questionnaire');
  };

  const calculateTBOutcomeStep = (): SimulationStep => {
    // --- Decision Logic based on Flowchart ---
    if (xpertAccess === 'no') {
      return 'outcome_dots_no_xpert'; // Facility has no access
    }

    // Facility has Xpert access
    if (xpertResult === 'no_tb') {
      return 'outcome_no_tb_mgmt'; // Xpert negative for TB
    }

    if (xpertResult === 'tb_no_r_res') {
      // TB detected, No Rifampicin resistance
      if (initialCategory === 'relapse' || initialCategory === 'taf') {
        return 'outcome_enroll_cat_II'; // TAF/Relapse cases
      } else if (initialCategory === 'catI' || initialCategory === 'mdr_contact') {
        return 'outcome_enroll_cat_I'; // New Case or MDR-TB Contact
      } else {
        return 'outcome_uncertain_consult_dr'; // Category combination unclear or not selected
      }
    }

    if (xpertResult === 'tb_r_res') {
      // TB detected, Rifampicin resistance detected (needs confirmation)
      if (firstConfirm === 'confirmed') {
        return 'outcome_enroll_mdr_prog'; // Confirmed on 1st test
      }
      if (firstConfirm === 'not_confirmed') {
        if (secondConfirm === 'confirmed') {
          return 'outcome_enroll_mdr_prog'; // Confirmed on 2nd test
        }
        if (secondConfirm === 'not_confirmed') {
          return 'outcome_dots_confirm_neg'; // Not confirmed even after 2nd test
        }
        // If secondConfirm is null (question not answered yet), need clinical judgement
        return 'outcome_uncertain_consult_dr';
      }
       // If firstConfirm is null (question not answered yet), need clinical judgement
       return 'outcome_uncertain_consult_dr';
    }

    // Default fallback if required answers are missing
    return 'outcome_uncertain_consult_dr';
  };

  const processTBQuestionnaire = () => {
    const outcomeStep = calculateTBOutcomeStep();
    setCurrentStep(outcomeStep);
  };

  // Updated Disclaimer Rendering
  const renderDisclaimer = (context: string) => (
    <div className="flex items-start space-x-2 rounded-md border border-blue-300 bg-blue-50 p-3 mb-4 text-blue-800">
      <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm text-justify"> {/* Added text-justify */}
        <span className="font-semibold">DISCLAIMER:</span> This feature is for informational purposes ONLY. It simulates navigating a diagnostic pathway based on hypothetical inputs. All medical decisions must be made in consultation with a doctor. {/* Removed ({context}) */}
      </div>
    </div>
  );


  return (
    // Changed flex direction and alignment for vertical stacking and centering
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <Card className="w-full max-w-2xl"> {/* Card remains centered */}
        <CardHeader>
          <CardTitle className="text-center text-2xl">MDR-TB Diagnostic</CardTitle> {/* Shortened title */}
        </CardHeader>
        <CardContent> {/* Content wrapper */}

          {/* --- Start Step --- */}
          {currentStep === 'start' && (
            <div id="info_step_start" className="info-step-content"> {/* Removed text-center */}
              {renderDisclaimer("Introduction")}
              <p className="mb-4 text-gray-700 text-sm text-justify"> {/* Added text-justify */}
                This interactive feature simulates the diagnostic pathway for patients suspected of Tuberculosis (TB), focusing on how rapid molecular tests like Xpert MTB/RIF help detect TB and potential Rifampicin resistance (R-res), a key indicator for Multi-Drug Resistant TB (MDR-TB).
              </p>
              <p className="mb-6 text-gray-700 text-sm text-justify"> {/* Added text-justify */}
                Navigate the flowchart by answering hypothetical questions to understand the process, the meaning of different test results, and how they influence treatment decisions.
              </p>
              <div className="text-center"> {/* Added wrapper for button centering */}
              <Button
                onClick={startSimulation}
                className="bg-[#00838F] text-white hover:bg-[#006971]" // Added background, text, and hover styles
              >
                Start <ArrowRight className="ml-2 h-4 w-4" /> {/* Shortened text */}
              </Button>
              </div>
            </div>
          )}

          {/* --- Questionnaire Step --- */}
          {currentStep === 'questionnaire' && (
            <div id="tbQuestionnaireContainer" className="info-step-content space-y-6">
              {renderDisclaimer("Simulation Questions")}

              {/* Q1: Initial Category */}
          <div className="space-y-2">
            <Label className="font-semibold">Q1: In this simulation, which category best describes the patient when they first present with TB symptoms or suspicion?</Label>
            <RadioGroup value={initialCategory ?? undefined} onValueChange={(value) => setInitialCategory(value as InitialCategory)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="catI" id="q1_catI" />
                <Label htmlFor="q1_catI">New Case (Cat I / Cat II not previously treated)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="relapse" id="q1_relapse" />
                <Label htmlFor="q1_relapse">Relapse (Declared cured/completed, now TB positive again)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="taf" id="q1_taf" />
                <Label htmlFor="q1_taf">Treatment After Failure (TAF) / Defaulted Treatment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mdr_contact" id="q1_mdr_contact" />
                <Label htmlFor="q1_mdr_contact">Suspected MDR-TB Contact (Close contact of a known MDR-TB patient)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Q2: Xpert Access */}
          <div className="space-y-2">
            <Label className="font-semibold">Q2: Does the simulated healthcare facility have access to Xpert MTB/RIF testing (either directly or via referral)?</Label>
            <RadioGroup value={xpertAccess ?? undefined} onValueChange={(value) => setXpertAccess(value as YesNo)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="q2_yes" />
                <Label htmlFor="q2_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="q2_no" />
                <Label htmlFor="q2_no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Q3: Xpert Result (Conditional) */}
          {xpertAccess === 'yes' && (
            <div className="space-y-2">
              <Label className="font-semibold">Q3: What is the simulated result of the Xpert MTB/RIF test?</Label>
              <RadioGroup value={xpertResult ?? undefined} onValueChange={(value) => setXpertResult(value as XpertResult)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no_tb" id="q3_no_tb" />
                  <Label htmlFor="q3_no_tb">No TB Detected</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tb_no_r_res" id="q3_tb_no_r_res" />
                  <Label htmlFor="q3_tb_no_r_res">TB Detected, Rifampicin Resistance NOT Detected</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tb_r_res" id="q3_tb_r_res" />
                  <Label htmlFor="q3_tb_r_res">TB Detected, Rifampicin Resistance DETECTED (R-res)</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q4: First Confirmation (Conditional) */}
          {xpertAccess === 'yes' && xpertResult === 'tb_r_res' && (
            <div className="space-y-2">
              <Label className="font-semibold">Q4: The first confirmation test (like LPA or Liquid Culture) was performed. Was MDR-TB or Rifampicin resistance confirmed by this first test?</Label>
              <RadioGroup value={firstConfirm ?? undefined} onValueChange={(value) => setFirstConfirm(value as ConfirmationResult)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="confirmed" id="q4_confirmed" />
                  <Label htmlFor="q4_confirmed">Yes, Confirmed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_confirmed" id="q4_not_confirmed" />
                  <Label htmlFor="q4_not_confirmed">No, Not Confirmed</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Q5: Second Confirmation (Conditional) */}
          {xpertAccess === 'yes' && xpertResult === 'tb_r_res' && firstConfirm === 'not_confirmed' && (
            <div className="space-y-2">
              <Label className="font-semibold">Q5: A second confirmation test (by liquid culture) was performed because the first wasn't conclusive. Was MDR-TB or Rifampicin resistance confirmed by this second test?</Label>
              <RadioGroup value={secondConfirm ?? undefined} onValueChange={(value) => setSecondConfirm(value as ConfirmationResult)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="confirmed" id="q5_confirmed" />
                  <Label htmlFor="q5_confirmed">Yes, Confirmed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_confirmed" id="q5_not_confirmed" />
                  <Label htmlFor="q5_not_confirmed">No, Not Confirmed</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button onClick={processTBQuestionnaire}>See Simulated Pathway Outcome</Button>
          </div>
        </div>
      )}

      {/* --- Outcome Steps --- */}
      {currentStep.startsWith('outcome_') && (
         // Removed extra div, using CardContent for styling
          <>
            <h2 className="text-xl font-semibold mb-3 text-center">Simulated Outcome</h2>
            {renderDisclaimer("Outcome Interpretation")}

            <div className="text-sm space-y-2 mb-6 text-justify"> {/* Added text-justify */}
              {currentStep === 'outcome_dots_no_xpert' && (
            <p>Based on this simulation (facility without Xpert access), the pathway indicates managing the patient according to standard DOTS guidelines. This usually involves diagnosis based on smear microscopy and clinical assessment, followed by standard TB treatment regimens.</p>
          )}
          {currentStep === 'outcome_no_tb_mgmt' && (
            <p>Based on this simulation (Xpert MTB/RIF test did not detect TB), the pathway suggests appropriate clinical management for other potential causes of the symptoms. TB is considered unlikely based on this test result, but clinical judgment is key.</p>
          )}
          {currentStep === 'outcome_enroll_cat_II' && (
            <p>Based on this simulation (Xpert detected TB with NO Rifampicin resistance, and the patient is a Relapse/TAF/Default case), the pathway indicates enrollment onto a Category II (Retreatment) regimen under DOTS. Standard drugs are used, but the regimen is different from a new case.</p>
          )}
          {currentStep === 'outcome_enroll_cat_I' && (
            <p>Based on this simulation (Xpert detected TB with NO Rifampicin resistance, and the patient is a New Case or MDR-TB Contact), the pathway indicates enrollment onto a Category I (New Case) regimen under DOTS using standard first-line TB drugs.</p>
          )}
          {currentStep === 'outcome_enroll_mdr_prog' && (
            <p>Based on this simulation (Xpert detected TB WITH Rifampicin resistance, and this resistance was CONFIRMED by subsequent testing), the pathway indicates enrollment into the MDR-TB treatment programme. This involves specialized, longer treatment with second-line drugs under close supervision.</p>
          )}
          {currentStep === 'outcome_dots_confirm_neg' && (
            <p>Based on this simulation (Xpert detected TB WITH Rifampicin resistance, but this resistance was NOT CONFIRMED even after second-line testing), the pathway indicates managing the patient as per standard DOTS guidelines, likely treating as drug-sensitive TB (e.g., Category I or II depending on history). The initial Xpert R-res result is considered likely inaccurate in this specific case after confirmation testing.</p>
          )}
          {currentStep === 'outcome_uncertain_consult_dr' && (
            <p>Based on the combination of answers in this simulation, the specific pathway outcome isn't clearly defined by this model, or required information might be missing according to the flowchart (e.g., confirmation test results). This highlights the need for expert clinical judgment. Consulting a doctor is essential for proper evaluation and diagnosis based on the complete clinical picture and local guidelines.</p>
              )}
              {/* ... other outcome paragraphs remain the same ... */}
               {currentStep === 'outcome_uncertain_consult_dr' && (
                 <p>Based on the combination of answers in this simulation, the specific pathway outcome isn't clearly defined by this model, or required information might be missing according to the flowchart (e.g., confirmation test results). This highlights the need for expert clinical judgment. Consulting a doctor is essential for proper evaluation and diagnosis based on the complete clinical picture and local guidelines.</p>
               )}
            </div>

            <div className="text-center"> {/* Centered button */}
              <Button variant="outline" onClick={resetSimulation}>Start New Simulation</Button>
            </div>
          </>
        // Removed closing div
      )}
        </CardContent> {/* Close CardContent */}
      </Card> {/* Close Card */}

      {/* Back Button (Now inside the main flex container) */}
      <div className="mt-8"> {/* Removed text-center as items-center handles it */}
        <Link to="/advanced-screening">
          <Button className="bg-[#00838F] text-white hover:bg-[#006971]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Advanced Tools
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MdrTb;
