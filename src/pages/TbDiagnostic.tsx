import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Define step constants for clarity (for existing simulation)
const STEP_INTRO = 0;
const STEP_DAY1_INFO = 1;
const STEP_ANTIBIOTIC_INFO = 2;
const STEP_DAY5_TEST_INFO = 3;
const STEP_Q1_SMEAR_RESULT = 4;
const STEP_Q2_ANTIBIOTIC_RESPONSE = 5;
const STEP_Q3_DOCTOR_ACTION = 6;
const STEP_DAY12_INFO = 7;
const STEP_FINAL_INFO = 8;

const TbDiagnostic = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // --- State for Smear-Negative Simulation ---
  const [currentStep, setCurrentStep] = useState(STEP_INTRO);
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);
  const [q3Answer, setQ3Answer] = useState<string | null>(null);

  // --- State for NEW Diagnostic Algorithm Simulation ---
  const [currentInfoStepAlg, setCurrentInfoStepAlg] = useState<string>('start'); // e.g., 'start', 'questionnaire', 'outcome_...'
  const [sampleType, setSampleType] = useState<string | null>(null);
  const [isPLHIVChild, setIsPLHIVChild] = useState<string | null>(null);
  const [igraNonResp, setIgraNonResp] = useState<string | null>(null);
  const [recentHistory, setRecentHistory] = useState<string | null>(null);
  const [prevOutcome, setPrevOutcome] = useState<string | null>(null);
  const [cultureOther, setCultureOther] = useState<string | null>(null);
  const [otherCausesExcluded1, setOtherCausesExcluded1] = useState<string | null>(null);
  const [patientStable, setPatientStable] = useState<string | null>(null);
  const [respCultureResult, setRespCultureResult] = useState<string | null>(null);
  const [xpertCulturePositive, setXpertCulturePositive] = useState<string | null>(null);
  const [otherCausesExcluded2, setOtherCausesExcluded2] = useState<string | null>(null);
  const [igraResult2, setIgraResult2] = useState<string | null>(null);
  const [showQuestionnaireAlg, setShowQuestionnaireAlg] = useState<boolean>(false);

  // --- Functions for Smear-Negative Simulation ---
  const resetSimulation = () => {
    setCurrentStep(STEP_INTRO);
    setQ1Answer(null);
    setQ2Answer(null);
    setQ3Answer(null);
  };

  const handleQ1Submit = () => {
    if (q1Answer === 'positive') {
      setCurrentStep(STEP_FINAL_INFO);
    } else if (q1Answer === 'negative') {
      setCurrentStep(STEP_Q2_ANTIBIOTIC_RESPONSE);
    }
  };

  const handleQ2Submit = () => {
    if (q2Answer === 'no_response') {
      setCurrentStep(STEP_FINAL_INFO);
    } else if (q2Answer === 'good_response') {
      setCurrentStep(STEP_Q3_DOCTOR_ACTION);
    }
  };

  const handleQ3Submit = () => {
    if (q3Answer === 'discharged') {
      setCurrentStep(STEP_FINAL_INFO);
    } else if (q3Answer === 'changed_abx') {
      setCurrentStep(STEP_DAY12_INFO);
    }
  };

  // --- Render Logic for Smear-Negative Simulation ---
  const StepContent = () => {
    switch (currentStep) {
      case STEP_INTRO:
        return (
          <CardContent className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Smear-Negative TB Suspect Diagnostic</h1> {/* Shortened title */}
             <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4" role="alert"> {/* Updated styles */}
               <p className="font-bold flex items-center"><AlertCircle className="mr-2 h-5 w-5" />DISCLAIMER:</p>
               <p>This feature is for informational purposes ONLY. It simulates navigating a diagnostic pathway based on hypothetical inputs. All medical decisions must be made in consultation with a doctor.</p>
             </div>
            <p className="text-center">This pathway explains the steps if someone is suspected of having pulmonary TB, but the initial sputum smear test is negative.</p>
            <div className="text-center">
              <Button
                onClick={() => setCurrentStep(STEP_DAY1_INFO)}
                className="bg-[#00838F] text-white hover:bg-[#006064]" // Added custom styles
              >
                Start / View Day 1 <ArrowRight className="ml-2 h-4 w-4" /> {/* Shortened text */}
              </Button>
            </div>
          </CardContent>
        );
      case STEP_DAY1_INFO:
        return (
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Consultation Day 1</h2>
            <p>The doctor performs:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Clinical Assessment (symptoms, history)</li>
              <li>HIV Test (if relevant)</li>
              <li>Chest X-ray</li>
              <li>Sputum collection for Culture (takes time for results)</li>
            </ul>
            <p><strong>Initial Decision:</strong> If the X-ray strongly suggests TB or the clinical condition is severe, TB treatment may be started immediately.</p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(STEP_INTRO)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setCurrentStep(STEP_ANTIBIOTIC_INFO)}>
                Next (Antibiotic Info) <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        );
      case STEP_ANTIBIOTIC_INFO:
         return (
           <CardContent className="space-y-4">
             <h2 className="text-xl font-semibold">Towards Day 5: Antibiotic Trial</h2>
             <p>If TB treatment hasn't started but suspicion remains, the doctor might give a 5-day course of non-TB antibiotics. The goal is to see if symptoms are caused by a different bacterial infection.</p>
             <div className="flex justify-between">
               <Button variant="outline" onClick={() => setCurrentStep(STEP_DAY1_INFO)}>
                 <ArrowLeft className="mr-2 h-4 w-4" /> Back
               </Button>
               <Button onClick={() => setCurrentStep(STEP_DAY5_TEST_INFO)}>
                 Continue to Day 5 <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
             </div>
           </CardContent>
         );
      case STEP_DAY5_TEST_INFO:
        return (
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Consultation Day 5: Repeat Test</h2>
            <p>The doctor will request a repeat sputum smear test.</p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(STEP_ANTIBIOTIC_INFO)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setCurrentStep(STEP_Q1_SMEAR_RESULT)}>
                See Simulated Day 5 Results <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        );
      case STEP_Q1_SMEAR_RESULT:
        return (
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Question 1: Day 5 Repeat Smear Result</h2>
            <p>In this simulation, what is the result of your repeat sputum smear test on Day 5?</p>
            <RadioGroup value={q1Answer ?? ""} onValueChange={setQ1Answer} className="space-y-2">
              <div className="flex items-center space-x-2"> <RadioGroupItem value="positive" id="q1-positive" /> <Label htmlFor="q1-positive">(A) Positive (TB bacteria found)</Label> </div>
              <div className="flex items-center space-x-2"> <RadioGroupItem value="negative" id="q1-negative" /> <Label htmlFor="q1-negative">(B) Negative (No TB bacteria found)</Label> </div>
            </RadioGroup>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(STEP_DAY5_TEST_INFO)}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button>
              <Button onClick={handleQ1Submit} disabled={!q1Answer}> Submit Answer <ArrowRight className="ml-2 h-4 w-4" /> </Button>
            </div>
          </CardContent>
        );
      case STEP_Q2_ANTIBIOTIC_RESPONSE:
        return (
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Question 2: Antibiotic Response Assessment</h2>
            <p className="text-sm text-gray-600">(Since the repeat test was negative)</p>
            <p>How did the doctor assess your response after taking the 5-day course of non-TB antibiotics?</p>
            <RadioGroup value={q2Answer ?? ""} onValueChange={setQ2Answer} className="space-y-2">
              <div className="flex items-center space-x-2"> <RadioGroupItem value="no_response" id="q2-no-response" /> <Label htmlFor="q2-no-response">(A) Partial / No Response at All</Label> </div>
              <div className="flex items-center space-x-2"> <RadioGroupItem value="good_response" id="q2-good-response" /> <Label htmlFor="q2-good-response">(B) Partial / Complete Response</Label> </div>
            </RadioGroup>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(STEP_Q1_SMEAR_RESULT)}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button>
              <Button onClick={handleQ2Submit} disabled={!q2Answer}> Submit Answer <ArrowRight className="ml-2 h-4 w-4" /> </Button>
            </div>
          </CardContent>
        );
      case STEP_Q3_DOCTOR_ACTION:
        return (
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Question 3: Doctor's Action</h2>
            <p className="text-sm text-gray-600">(Since repeat test negative AND good antibiotic response)</p>
            <p>What action did the doctor take in this simulation?</p>
            <RadioGroup value={q3Answer ?? ""} onValueChange={setQ3Answer} className="space-y-2">
              <div className="flex items-center space-x-2"> <RadioGroupItem value="discharged" id="q3-discharged" /> <Label htmlFor="q3-discharged">(A) Discharged (awaiting culture)</Label> </div>
              <div className="flex items-center space-x-2"> <RadioGroupItem value="changed_abx" id="q3-changed-abx" /> <Label htmlFor="q3-changed-abx">(B) Changed antibiotic (exceptional)</Label> </div>
            </RadioGroup>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(STEP_Q2_ANTIBIOTIC_RESPONSE)}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button>
              <Button onClick={handleQ3Submit} disabled={!q3Answer}> Submit Answer <ArrowRight className="ml-2 h-4 w-4" /> </Button>
            </div>
          </CardContent>
        );
      case STEP_DAY12_INFO:
        return (
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Consultation Day 12 (If Antibiotics Changed)</h2>
            <p>Doctor performs another clinical assessment.</p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(STEP_Q3_DOCTOR_ACTION)}> <ArrowLeft className="mr-2 h-4 w-4" /> Back </Button>
              <Button onClick={() => setCurrentStep(STEP_FINAL_INFO)}> Importance of Culture & Finish <ArrowRight className="ml-2 h-4 w-4" /> </Button>
            </div>
          </CardContent>
        );
      case STEP_FINAL_INFO:
        let explanation = "";
        if (q1Answer === 'positive') { explanation = "Explanation: Repeat smear positive -> Start TB treatment."; }
        else if (q2Answer === 'no_response') { explanation = "Explanation: Negative smear, no antibiotic response -> Start TB treatment (pending culture)."; }
        else if (q3Answer === 'discharged') { explanation = "Explanation: Negative smear, good antibiotic response -> Discharged (pending culture)."; }
        else if (q3Answer === 'changed_abx') { explanation = "Explanation: Reassessed Day 12 -> Focus on pending culture."; }
        return (
          <CardContent className="space-y-4">
            {explanation && <p className="italic text-gray-700">{explanation}</p>}
            <h2 className="text-xl font-semibold">Key Role of Culture Result & Conclusion</h2>
            <p>Sputum Culture (Day 1) is crucial. If Positive: Patient traced and MUST start TB treatment.</p>
            <p><strong>Conclusion:</strong> Diagnosing smear-negative TB is complex. Culture is critical.</p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4" role="alert">
              <p className="font-bold flex items-center"><AlertCircle className="mr-2 h-5 w-5" />FINAL DISCLAIMER:</p>
              <p>This pathway is an example. Always follow professional medical advice.</p>
            </div>
            <div className="text-center"> <Button onClick={resetSimulation}> Restart Simulation </Button> </div>
          </CardContent>
        );
      default:
        return <CardContent><p>Error: Invalid step.</p></CardContent>;
    }
  };

  // --- Functions for NEW Diagnostic Algorithm Simulation ---
  const resetSimulationAlg = () => {
    setCurrentInfoStepAlg('start');
    setSampleType(null); setIsPLHIVChild(null); setIgraNonResp(null);
    setRecentHistory(null); setPrevOutcome(null); setCultureOther(null);
    setOtherCausesExcluded1(null); setPatientStable(null); setRespCultureResult(null);
    setXpertCulturePositive(null); setOtherCausesExcluded2(null); setIgraResult2(null);
    setShowQuestionnaireAlg(false);
  };

  const calculateOutcomeStepAlg = (): string => {
    if (sampleType === 'non_resp') {
        if (isPLHIVChild === 'yes' && igraNonResp === 'positive') return 'outcome_start_tx_plhiv_igra';
        else return 'outcome_non_resp_other';
    }
    if (sampleType === 'resp') {
        if (recentHistory === 'yes') {
            if (prevOutcome === 'failed') return 'outcome_consider_tx_failed_hx';
            if (prevOutcome === 'cured') {
                if (cultureOther === 'yes') return 'outcome_start_tx_other_culture';
                if (cultureOther === 'no') {
                    if (otherCausesExcluded1 === 'no') return 'outcome_further_investigations_1';
                    if (otherCausesExcluded1 === 'yes') {
                        if (patientStable === 'no') return 'outcome_consider_tx_deterioration';
                        if (patientStable === 'yes') {
                            if (respCultureResult === 'positive') return 'outcome_start_tx_resp_culture_pos';
                            if (respCultureResult === 'negative') return 'outcome_follow_up_resp_culture_neg';
                        }
                    }
                }
            }
        } else if (recentHistory === 'no') {
             if (xpertCulturePositive === 'yes') return 'outcome_start_tx_xpert_culture_pos';
             if (xpertCulturePositive === 'no') {
                 if (otherCausesExcluded2 === 'yes') return 'outcome_start_tx_other_causes_excl';
                 if (otherCausesExcluded2 === 'no') {
                     if (igraResult2 === 'positive') return 'outcome_start_tx_igra_pos';
                     if (igraResult2 === 'negative' || igraResult2 === 'unknown') return 'outcome_consider_tx_igra_neg';
                 }
             }
        }
    }
    console.warn("Algorithm Outcome calculation fallback triggered. Answers:", { sampleType, isPLHIVChild, igraNonResp, recentHistory, prevOutcome, cultureOther, otherCausesExcluded1, patientStable, respCultureResult, xpertCulturePositive, otherCausesExcluded2, igraResult2 });
    return 'outcome_uncertain_consult_dr';
  };

  const processQuestionnaireAlg = () => {
    const outcomeStep = calculateOutcomeStepAlg();
    setCurrentInfoStepAlg(outcomeStep);
    setShowQuestionnaireAlg(false);
  };

  // --- Render Logic for NEW Diagnostic Algorithm Simulation ---

  // Helper function to check if all required questions for the current path are answered
  const checkCanSubmitAlg = () => {
    if (!sampleType) return false;

    if (sampleType === 'non_resp') {
      if (!isPLHIVChild || !igraNonResp) return false;
    } else if (sampleType === 'resp') {
      if (!recentHistory) return false;
      if (recentHistory === 'yes') {
        if (!prevOutcome) return false;
        if (prevOutcome === 'cured') {
          if (!cultureOther) return false;
          if (cultureOther === 'no') {
            if (!otherCausesExcluded1) return false;
            if (otherCausesExcluded1 === 'yes') {
              if (!patientStable) return false;
              if (patientStable === 'yes') {
                if (!respCultureResult) return false;
              }
            }
          }
        }
      } else if (recentHistory === 'no') {
        if (!xpertCulturePositive) return false;
        if (xpertCulturePositive === 'no') {
          if (!otherCausesExcluded2) return false;
          if (otherCausesExcluded2 === 'no') {
            if (!igraResult2) return false;
          }
        }
      }
    }
    return true; // All required questions for the path are answered
  };


  // --- Main Return ---
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
       {/* Back Button - Moved to bottom */}

      {/* --- NEW Diagnostic Algorithm Simulation Section --- */}
      <Card className="max-w-3xl mx-auto">
        <CardContent className="space-y-4 pt-6">
          {/* Conditionally render Intro/Questionnaire or Outcome */}
          {!showQuestionnaireAlg && currentInfoStepAlg !== 'questionnaire' && (
            // Render Intro or Outcome based on currentInfoStepAlg
             (() => {
                switch (currentInfoStepAlg) {
                  case 'start':
                    return (
                      <div id="info_step_start_alg"> {/* Added suffix to avoid ID clash */}
                        <h1 className="text-2xl font-bold text-center mb-4">TB Diagnostic Algorithm</h1> {/* Shortened title */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 mb-4" role="alert"> {/* Updated styles */}
                          <p className="font-bold flex items-center"><AlertCircle className="mr-2 h-5 w-5" />DISCLAIMER:</p>
                          <p>This feature is for informational purposes ONLY. It simulates navigating a diagnostic pathway based on hypothetical inputs. All medical decisions must be made in consultation with a doctor.</p>
                        </div>
                        <p className="mb-4">This simulation helps understand the decision-making process for diagnosing presumptive TB, considering factors like patient history, sample types, and test results.</p>
                        <div className="text-center">
                          <Button
                            onClick={() => { setCurrentInfoStepAlg('questionnaire'); setShowQuestionnaireAlg(true); }}
                            className="bg-[#00838F] text-white hover:bg-[#006064]" // Added custom styles
                          >
                            Start <ArrowRight className="ml-2 h-4 w-4" /> {/* Shortened text */}
                          </Button>
                        </div>
                      </div>
                    );
                  // --- Outcome Steps ---
                  case 'outcome_start_tx_plhiv_igra':
                    return (
                      <div id="info_step_outcome_start_tx_plhiv_igra">
                        <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                        <p>Based on this simulation (Non-respiratory sample, PLHIV/Child {'<'}15, Positive IGRA), the pathway indicates <strong>starting TB treatment</strong>. A positive IGRA in this context strongly supports TB diagnosis.</p>
                        <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                        <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                      </div>
                    );
                  case 'outcome_non_resp_other':
                     return (
                       <div id="info_step_outcome_non_resp_other">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Non-respiratory sample, but not meeting the specific criteria for immediate treatment based on IGRA), the diagnostic approach would depend heavily on the specific sample type, clinical picture, and other test results. <strong>Further investigation is likely needed.</strong></p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_consider_tx_failed_hx':
                    return (
                      <div id="info_step_outcome_consider_tx_failed_hx">
                        <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                        <p>Based on this simulation (Respiratory sample, recent TB history {'<'}2 years with treatment failure/loss to follow-up), the pathway suggests <strong>considering TB treatment</strong>. This history significantly raises suspicion. Further evaluation and likely drug susceptibility testing are crucial.</p>
                        <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                        <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                      </div>
                    );
                  case 'outcome_start_tx_other_culture':
                     return (
                       <div id="info_step_outcome_start_tx_other_culture">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, recent TB history {'<'}2 years - cured/completed, but culture positive on other samples), the pathway indicates <strong>starting TB treatment</strong>. The positive culture elsewhere confirms active TB.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_further_investigations_1':
                     return (
                       <div id="info_step_outcome_further_investigations_1">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, recent TB history - cured/completed, no other positive cultures, other causes NOT excluded), the pathway suggests <strong>further investigations</strong> to rule out other diseases before deciding on TB treatment.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_consider_tx_deterioration':
                     return (
                       <div id="info_step_outcome_consider_tx_deterioration">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, recent TB history - cured/completed, other causes excluded, but patient is deteriorating), the pathway suggests <strong>considering TB treatment</strong> due to the clinical worsening, even if initial tests are pending/negative.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_start_tx_resp_culture_pos':
                     return (
                       <div id="info_step_outcome_start_tx_resp_culture_pos">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, recent TB history - cured/completed, other causes excluded, patient stable, initial respiratory culture becomes POSITIVE), the pathway indicates <strong>starting TB treatment</strong>. The positive culture confirms TB.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_follow_up_resp_culture_neg':
                     return (
                       <div id="info_step_outcome_follow_up_resp_culture_neg">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, recent TB history - cured/completed, other causes excluded, patient stable, initial respiratory culture is NEGATIVE), the pathway suggests <strong>follow-up</strong>. Clinical monitoring is needed, as TB isn't confirmed.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_start_tx_xpert_culture_pos':
                     return (
                       <div id="info_step_outcome_start_tx_xpert_culture_pos">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, no recent TB history, Xpert or initial culture is POSITIVE), the pathway indicates <strong>starting TB treatment</strong>. A positive microbiological test confirms TB.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_start_tx_other_causes_excl':
                     return (
                       <div id="info_step_outcome_start_tx_other_causes_excl">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, no recent TB history, Xpert/culture negative, but other causes ARE excluded), the pathway indicates <strong>starting TB treatment</strong>. In this scenario, TB remains the most likely diagnosis clinically, even without microbiological confirmation yet.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_start_tx_igra_pos':
                     return (
                       <div id="info_step_outcome_start_tx_igra_pos">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, no recent TB history, Xpert/culture negative, other causes NOT excluded, further investigation including a POSITIVE IGRA), the pathway indicates <strong>starting TB treatment</strong>. The positive IGRA supports the TB diagnosis in this context.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_consider_tx_igra_neg':
                     return (
                       <div id="info_step_outcome_consider_tx_igra_neg">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on this simulation (Respiratory sample, no recent TB history, Xpert/culture negative, other causes NOT excluded, further investigation including a NEGATIVE IGRA), the pathway suggests <strong>considering TB treatment</strong>. A negative IGRA doesn't rule out TB, and the clinical picture still needs evaluation.</p>
                         <p className="mt-2 text-sm text-gray-600">Remember: Consult a doctor for actual diagnosis.</p>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  case 'outcome_uncertain_consult_dr':
                     return (
                       <div id="info_step_outcome_uncertain_consult_dr">
                         <h2 className="text-xl font-semibold mb-2">Simulated Outcome</h2>
                         <p>Based on the combination of answers in this simulation, the specific pathway isn't clearly defined by this simplified model, or required information is missing. This highlights the complexity of diagnosis. <strong>Consulting a doctor is essential</strong> for proper evaluation and diagnosis based on the complete clinical picture.</p>
                         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-4" role="alert">
                           <p className="font-bold flex items-center"><AlertCircle className="mr-2 h-5 w-5" />FINAL DISCLAIMER:</p>
                           <p>This simulation is for educational purposes ONLY and cannot replace professional medical advice.</p>
                         </div>
                         <div className="text-center mt-4"> <Button onClick={resetSimulationAlg}>Restart</Button> </div>
                       </div>
                     );
                  default:
                    return <p>Loading or invalid step...</p>; // Fallback
                }
             })()
          )}
          {showQuestionnaireAlg && (
             // Render Questionnaire
             <div id="questionnaireContainerAlg" className="space-y-6"> {/* Added suffix */}
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 text-sm" role="alert">
                  <p><strong>Reminder:</strong> This is a simulation for informational purposes only.</p>
                </div>

                {/* Q1: Sample Type */}
                <fieldset className="space-y-2 border p-4 rounded">
                  <legend className="text-md font-semibold px-1">Q1: What type of sample is being primarily considered?</legend>
                  <RadioGroup value={sampleType ?? ""} onValueChange={setSampleType} name="q_sampleType_alg"> {/* Added suffix */}
                    <div className="flex items-center space-x-2"> <RadioGroupItem value="resp" id="q1_resp_alg" /> <Label htmlFor="q1_resp_alg">Respiratory (e.g., sputum/phlegm)</Label> </div>
                    <div className="flex items-center space-x-2"> <RadioGroupItem value="non_resp" id="q1_non_resp_alg" /> <Label htmlFor="q1_non_resp_alg">Non-Respiratory (e.g., fluid, tissue biopsy)</Label> </div>
                  </RadioGroup>
                </fieldset>

                {/* --- Non-Respiratory Path --- */}
                {sampleType === 'non_resp' && (
                  <>
                    <fieldset className="space-y-2 border p-4 rounded bg-blue-50">
                      <legend className="text-md font-semibold px-1">Q2: Is the person PLHIV or Child {'<'} 15?</legend>
                      <RadioGroup value={isPLHIVChild ?? ""} onValueChange={setIsPLHIVChild} name="q_plhivChild_alg"> {/* Added suffix */}
                        <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q2_yes_alg" /> <Label htmlFor="q2_yes_alg">Yes</Label> </div>
                        <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q2_no_alg" /> <Label htmlFor="q2_no_alg">No</Label> </div>
                      </RadioGroup>
                    </fieldset>
                    <fieldset className="space-y-2 border p-4 rounded bg-blue-50">
                      <legend className="text-md font-semibold px-1">Q3: Simulated IGRA result (non-resp sample)?</legend>
                      <RadioGroup value={igraNonResp ?? ""} onValueChange={setIgraNonResp} name="q_igraNonResp_alg"> {/* Added suffix */}
                        <div className="flex items-center space-x-2"> <RadioGroupItem value="positive" id="q3_pos_alg" /> <Label htmlFor="q3_pos_alg">Positive</Label> </div>
                        <div className="flex items-center space-x-2"> <RadioGroupItem value="negative" id="q3_neg_alg" /> <Label htmlFor="q3_neg_alg">Negative / Not Done / Unknown</Label> </div>
                      </RadioGroup>
                    </fieldset>
                  </>
                )}

                {/* --- Respiratory Path --- */}
                {sampleType === 'resp' && (
                  <>
                    <fieldset className="space-y-2 border p-4 rounded bg-green-50">
                      <legend className="text-md font-semibold px-1">Q4: History of TB treatment within last 2 years?</legend>
                      <RadioGroup value={recentHistory ?? ""} onValueChange={setRecentHistory} name="q_recentHistory_alg"> {/* Added suffix */}
                        <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q4_yes_alg" /> <Label htmlFor="q4_yes_alg">Yes</Label> </div>
                        <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q4_no_alg" /> <Label htmlFor="q4_no_alg">No (New case or TB {'>'} 2 years ago)</Label> </div>
                      </RadioGroup>
                    </fieldset>

                    {recentHistory === 'yes' && (
                      <fieldset className="space-y-2 border p-4 rounded bg-green-100">
                        <legend className="text-md font-semibold px-1">Q5: Outcome of recent TB treatment ({'<'} 2 years)?</legend>
                        <RadioGroup value={prevOutcome ?? ""} onValueChange={setPrevOutcome} name="q_prevOutcome_alg"> {/* Added suffix */}
                          <div className="flex items-center space-x-2"> <RadioGroupItem value="failed" id="q5_failed_alg" /> <Label htmlFor="q5_failed_alg">Failed / Lost to follow-up / Not evaluated</Label> </div>
                          <div className="flex items-center space-x-2"> <RadioGroupItem value="cured" id="q5_cured_alg" /> <Label htmlFor="q5_cured_alg">Cured / Completed</Label> </div>
                        </RadioGroup>
                      </fieldset>
                    )}

                    {recentHistory === 'yes' && prevOutcome === 'cured' && (
                      <fieldset className="space-y-2 border p-4 rounded bg-green-100">
                        <legend className="text-md font-semibold px-1">Q7: Culture positive on OTHER samples during/after last treatment?</legend>
                         <RadioGroup value={cultureOther ?? ""} onValueChange={setCultureOther} name="q_cultureOther_alg"> {/* Added suffix */}
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q7_yes_alg" /> <Label htmlFor="q7_yes_alg">Yes</Label> </div>
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q7_no_alg" /> <Label htmlFor="q7_no_alg">No</Label> </div>
                         </RadioGroup>
                      </fieldset>
                    )}

                    {recentHistory === 'yes' && prevOutcome === 'cured' && cultureOther === 'no' && (
                      <fieldset className="space-y-2 border p-4 rounded bg-green-100">
                        <legend className="text-md font-semibold px-1">Q9: Other causes reasonably excluded?</legend>
                         <RadioGroup value={otherCausesExcluded1 ?? ""} onValueChange={setOtherCausesExcluded1} name="q_otherCauses1_alg"> {/* Added suffix */}
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q9_yes_alg" /> <Label htmlFor="q9_yes_alg">Yes</Label> </div>
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q9_no_alg" /> <Label htmlFor="q9_no_alg">No</Label> </div>
                         </RadioGroup>
                      </fieldset>
                    )}

                     {recentHistory === 'yes' && prevOutcome === 'cured' && cultureOther === 'no' && otherCausesExcluded1 === 'yes' && (
                      <fieldset className="space-y-2 border p-4 rounded bg-green-100">
                        <legend className="text-md font-semibold px-1">Q11: Patient condition stable?</legend>
                         <RadioGroup value={patientStable ?? ""} onValueChange={setPatientStable} name="q_patientStable_alg"> {/* Added suffix */}
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q11_yes_alg" /> <Label htmlFor="q11_yes_alg">Yes, stable</Label> </div>
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q11_no_alg" /> <Label htmlFor="q11_no_alg">No, deteriorating</Label> </div>
                         </RadioGroup>
                      </fieldset>
                    )}

                    {recentHistory === 'yes' && prevOutcome === 'cured' && cultureOther === 'no' && otherCausesExcluded1 === 'yes' && patientStable === 'yes' && (
                      <fieldset className="space-y-2 border p-4 rounded bg-green-100">
                        <legend className="text-md font-semibold px-1">Q13: Final result of initial respiratory culture?</legend>
                         <RadioGroup value={respCultureResult ?? ""} onValueChange={setRespCultureResult} name="q_respCulture_alg"> {/* Added suffix */}
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="positive" id="q13_pos_alg" /> <Label htmlFor="q13_pos_alg">Positive</Label> </div>
                           <div className="flex items-center space-x-2"> <RadioGroupItem value="negative" id="q13_neg_alg" /> <Label htmlFor="q13_neg_alg">Negative</Label> </div>
                         </RadioGroup>
                      </fieldset>
                    )}

                    {/* --- No Recent History Path --- */}
                    {recentHistory === 'no' && (
                      <>
                        <fieldset className="space-y-2 border p-4 rounded bg-purple-50">
                          <legend className="text-md font-semibold px-1">Q14: Initial rapid test (Xpert) OR initial resp culture positive?</legend>
                          <RadioGroup value={xpertCulturePositive ?? ""} onValueChange={setXpertCulturePositive} name="q_xpertCulture_alg"> {/* Added suffix */}
                            <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q14_yes_alg" /> <Label htmlFor="q14_yes_alg">Yes</Label> </div>
                            <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q14_no_alg" /> <Label htmlFor="q14_no_alg">No</Label> </div>
                          </RadioGroup>
                        </fieldset>

                        {xpertCulturePositive === 'no' && (
                          <fieldset className="space-y-2 border p-4 rounded bg-purple-100">
                            <legend className="text-md font-semibold px-1">Q16: Other causes reasonably excluded?</legend>
                            <RadioGroup value={otherCausesExcluded2 ?? ""} onValueChange={setOtherCausesExcluded2} name="q_otherCauses2_alg"> {/* Added suffix */}
                              <div className="flex items-center space-x-2"> <RadioGroupItem value="yes" id="q16_yes_alg" /> <Label htmlFor="q16_yes_alg">Yes</Label> </div>
                              <div className="flex items-center space-x-2"> <RadioGroupItem value="no" id="q16_no_alg" /> <Label htmlFor="q16_no_alg">No</Label> </div>
                            </RadioGroup>
                          </fieldset>
                        )}

                        {xpertCulturePositive === 'no' && otherCausesExcluded2 === 'no' && (
                          <fieldset className="space-y-2 border p-4 rounded bg-purple-100">
                            <legend className="text-md font-semibold px-1">Q18: After further investigations, what was the IGRA result?</legend>
                            <RadioGroup value={igraResult2 ?? ""} onValueChange={setIgraResult2} name="q_igra2_alg"> {/* Added suffix */}
                              <div className="flex items-center space-x-2"> <RadioGroupItem value="positive" id="q18_pos_alg" /> <Label htmlFor="q18_pos_alg">Positive</Label> </div>
                              <div className="flex items-center space-x-2"> <RadioGroupItem value="negative" id="q18_neg_alg" /> <Label htmlFor="q18_neg_alg">Negative</Label> </div>
                              <div className="flex items-center space-x-2"> <RadioGroupItem value="unknown" id="q18_unknown_alg" /> <Label htmlFor="q18_unknown_alg">Not Done / Unknown</Label> </div>
                            </RadioGroup>
                             <p className="text-xs text-gray-500 pt-1">Note: Positive IGRA supports TB diagnosis; negative IGRA does not exclude TB.</p>
                          </fieldset>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* Submit Button */}
                <div className="flex justify-between mt-6">
                   <Button variant="outline" onClick={() => { setShowQuestionnaireAlg(false); setCurrentInfoStepAlg('start'); resetSimulationAlg(); /* Reset answers on going back */ }}>
                     <ArrowLeft className="mr-2 h-4 w-4" /> Back to Intro
                   </Button>
                   <Button onClick={processQuestionnaireAlg} disabled={!checkCanSubmitAlg()}>
                     See Simulated Pathway Outcome <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                 </div>
              </div>
          )}
        </CardContent>
      </Card>

       {/* --- Existing Smear-Negative Simulation Section --- */}
       <Card className="max-w-3xl mx-auto">
         <StepContent /> {/* This renders the existing simulation */}
       </Card>

      {/* Back Button - Moved to bottom and centered */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => navigate('/advanced-screening')}
          className="bg-[#00838F] text-white hover:bg-[#006971]" // Styles match example
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Advanced Tools {/* Text matches example */}
        </Button>
      </div>
    </div>
  );
};

export default TbDiagnostic;
