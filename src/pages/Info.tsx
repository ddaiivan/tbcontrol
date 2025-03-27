
import { ArrowRight, BookOpen, ExternalLink, Heart, AlertCircle, Hospital, Activity, Users, Calendar, ChartBar } from "lucide-react"; // Consolidated imports
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Added Card imports

const Info = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold sm:text-4xl mb-4">
                Information About TB
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Learn about tuberculosis, symptoms, prevention, treatment, and other important facts
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {infoCategories.map((category) => (
              <Card key={category.title} className="card-hover">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-2">
                    <category.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <a
                    href={`#${category.id}`}
                    className="text-secondary hover:text-secondary-dark flex items-center"
                  >
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div id="what-is-tb" className="scroll-mt-20 mb-12">
              <h2 className="text-2xl font-bold mb-4">What is TB?</h2>
              <div className="prose max-w-none">
                <p className="mb-4">
                  Tuberculosis (TB) is an infectious disease caused by the bacterium <em>Mycobacterium tuberculosis</em>. 
                  TB primarily affects the lungs (known as pulmonary TB), but it can also affect other organs such as lymph nodes, 
                  bones, kidneys, and the brain (known as extrapulmonary TB).
                </p>
                <p className="mb-4">
                  TB spreads through the air when infected individuals with active TB cough, sneeze, speak, or spit. They unknowingly 
                  release TB bacteria into the air, which can then be inhaled by others nearby.
                </p>
                <div className="my-6">
                  <img 
                    src="/tb-bacteria.jpg" 
                    alt="Mycobacterium tuberculosis bacteria" 
                    className="w-full rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Mycobacterium tuberculosis bacteria, the cause of tuberculosis
                  </p>
                </div>
              </div>
            </div>

            <div id="tb-symptoms" className="scroll-mt-20 mb-12">
              <h2 className="text-2xl font-bold mb-4">TB Symptoms</h2>
              <div className="prose max-w-none">
                <p className="mb-4">
                  TB symptoms can develop slowly and may not be noticeable for weeks or months. 
                  Common TB symptoms include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Cough lasting more than 2-3 weeks, sometimes with sputum or blood</li>
                  <li>Persistent fever without an identifiable cause, especially at night</li>
                  <li>Night sweats</li>
                  <li>Unexplained weight loss</li>
                  <li>Fatigue and weakness</li>
                  <li>Loss of appetite</li>
                  <li>Chest pain when breathing or coughing</li>
                </ul>
                <p>
                  If you experience these symptoms, consult a healthcare professional promptly for proper diagnosis.
                </p>
                <div className="my-6">
                  <img
                    src="/TB-Symptoms.png"
                    alt="Common TB symptoms illustrated"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div id="tb-faq" className="scroll-mt-20 mb-12">
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm max-w-none">{item.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="bg-primary/30 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-bold mb-3">References and Reliable Sources</h2>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.who.int/health-topics/tuberculosis" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:underline"
                  >
                    World Health Organization (WHO)
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.tbindonesia.or.id/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:underline"
                  >
                    Stop TB Partnership Indonesia
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://kemkes.go.id/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:underline"
                  >
                    Ministry of Health, Republic of Indonesia
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main> {/* Added closing main tag */}
    </div>
  );
};

const infoCategories = [
  {
    id: "what-is-tb",
    title: "Understanding TB",
    description: "Learn about tuberculosis, its causes, and how it spreads",
    icon: AlertCircle,
  },
  {
    id: "tb-symptoms",
    title: "TB Symptoms",
    description: "Recognize common TB symptoms and when to consult a doctor",
    icon: Heart,
  },
  {
    id: "tb-faq",
    title: "FAQ",
    description: "Answers to common questions about TB, treatment, and prevention",
    icon: BookOpen,
  },
];

const faqItems = [
  {
    question: "Can TB be cured?",
    answer: "Yes, TB can be cured with proper treatment. TB treatment typically involves a combination of several antibiotics that must be taken regularly for 6-9 months, depending on the patient's condition. It is very important to complete the entire treatment regimen even if symptoms disappear to prevent recurrence and avoid developing drug-resistant TB (MDR-TB).",
  },
  {
    question: "How can TB transmission be prevented?",
    answer: "TB prevention includes: 1) Good home ventilation, 2) Proper cough and sneeze etiquette, 3) Avoiding crowded places with poor air circulation if you're at high risk, 4) BCG vaccination for infants, 5) Prompt treatment if diagnosed with TB to stop transmission, 6) Ensuring TB patients use masks, especially during the early phase of treatment.",
  },
  {
    question: "Can the BCG vaccine prevent TB?",
    answer: "The BCG (Bacillus Calmette-Guérin) vaccine is given to infants to provide protection against serious forms of TB such as TB meningitis and miliary TB that commonly affect children. However, the effectiveness of the BCG vaccine in preventing pulmonary TB in adults varies. Nevertheless, BCG vaccination remains an important strategy in TB control programs, especially in countries with high TB burden like Indonesia.",
  },
  {
    question: "Does TB only affect the lungs?",
    answer: "No. Although TB most commonly affects the lungs (pulmonary TB), TB bacteria can spread to other parts of the body through the bloodstream. TB that affects organs other than the lungs is called extrapulmonary TB. Extrapulmonary TB can affect the lymph nodes, bones and joints, central nervous system (TB meningitis), genitourinary system, skin, and other organs.",
  },
  {
    question: "How is TB diagnosed?",
    answer: "TB diagnosis involves several methods, including: 1) Examination of clinical symptoms, 2) Sputum tests to detect TB bacteria, 3) Chest X-rays, 4) Tuberculin skin test (Mantoux), 5) Interferon-gamma release assays (IGRAs) blood tests, 6) In more complex cases, tissue biopsy or molecular tests such as GeneXpert MTB/RIF may be needed. Diagnosis can only be made by trained healthcare professionals.",
  },
];

export default Info;
