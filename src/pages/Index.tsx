
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Users, Calendar, ChartBar, Heart, AlertCircle, Linkedin, Stethoscope, Skull } from "lucide-react"; // Added Skull icon
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  ChartContainer, 
} from "@/components/ui/chart"; // Removed unused imports

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-up">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Know the Symptoms, <span className="text-secondary">Stop the Spread</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              TB Information & Support at Your Fingertips. Together fighting TB for a healthier world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/screening" className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-secondary rounded-lg hover:bg-secondary/90 transition-all">
                Check Your Symptoms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/info"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-secondary border-2 border-secondary rounded-lg hover:bg-secondary hover:text-white transition-all"
              >
                Learn About TB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TB Facts & Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              TB in Indonesia: Key Facts
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Indonesia ranks 2nd globally for TB burden with approximately 845,000 cases annually
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Incidence Image */}
            <div className="bg-white p-6 rounded-xl shadow-sm border transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
              <h3 className="text-xl font-semibold mb-4">Estimated number of incident TB cases in 2023, for countries with at least 100 000 incident cases</h3>
              <div className="h-80 flex items-center justify-center"> {/* Added flex centering */}
                <img 
                  src="/incidence.jpg" 
                  alt="TB Incidence in Indonesia" 
                  className="w-full h-full object-cover" // Make image cover the container
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Data source: WHO Global TB Report</p> {/* Kept data source, update if needed */}
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-10 w-10 text-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Global Impact</h3>
                    <p className="mt-1 text-gray-600">TB remains one of the world's deadliest infectious diseases, causing over 1.3 million deaths annually.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Skull className="h-10 w-10 text-secondary" /> {/* Replaced Heart with Skull */}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Indonesia's Burden</h3>
                    <p className="mt-1 text-gray-600">With approximately 845,000 cases annually and 93,000 deaths, Indonesia faces a significant TB challenge.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ChartBar className="h-10 w-10 text-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Treatment Success</h3>
                    <p className="mt-1 text-gray-600">With proper diagnosis and adherence to treatment, TB has a cure rate of over 85% for drug-susceptible cases.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Carousel - Fixed image paths */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-center">Understanding TB Through Imagery</h3>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/Campaign.png" 
                        alt="TB Awareness Campaign" 
                        className="w-full h-[450px] object-contain" /* Increased height further */
                      />
                      <div className="bg-white p-4">
                        <h4 className="font-medium">TB Awareness Campaign</h4>
                        <p className="text-sm text-gray-500">Community-based education is crucial for early detection</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/tb-xray.jpg" 
                        alt="Lung X-ray showing TB infection" 
                        className="w-full h-[450px] object-contain" /* Applied consistent height */
                      />
                      <div className="bg-white p-4">
                        <h4 className="font-medium">TB Diagnosis</h4>
                        <p className="text-sm text-gray-500">Chest X-rays are an important diagnostic tool for TB</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/tb-bacteria.jpg" 
                        alt="TB Bacteria" 
                        className="w-full h-[450px] object-contain" /* Applied consistent height */
                      />
                      <div className="bg-white p-4">
                        <h4 className="font-medium">TB Pathogen</h4>
                        <p className="text-sm text-gray-500">Mycobacterium tuberculosis causes TB infection</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="/tb-treatment.png"
                        alt="TB Treatment"
                        className="w-full h-[450px] object-contain" /* Applied consistent height */
                      />
                      <div className="bg-white p-4">
                        <h4 className="font-medium">Treatment Adherence</h4>
                        <p className="text-sm text-gray-500">Completing the full course of TB treatment is essential for cure</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src="/TB-Symptoms.png"
                        alt="TB Symptoms"
                        className="w-full h-[450px] object-contain" /* Applied consistent height */
                      />
                      <div className="bg-white p-4">
                        <h4 className="font-medium">TB Symptoms</h4>
                        <p className="text-sm text-gray-500">Common TB symptoms illustrated</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-0 sm:-left-12" />
              <CarouselNext className="right-0 sm:-right-12" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="relative p-6 bg-white rounded-xl shadow-sm border card-hover animate-fade-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Screening Tools Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Advanced Screening Tools Preview
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              Explore our specialized tools for a more in-depth health assessment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* BMI Calculator Preview */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
              <img src="/bmi.png" alt="BMI Chart" className="h-24 w-auto object-contain mb-2" />
              <h4 className="font-semibold text-center mb-1">BMI Calculator</h4>
              <p className="text-sm text-gray-600 text-center">Calculate your Body Mass Index (BMI) to understand your weight status.</p>
            </div>
            {/* TB Diagnostic Preview */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
              <img src="/tuberculosis.png" alt="TB Bacteria" className="h-24 w-auto object-contain mb-2" />
              <h4 className="font-semibold text-center mb-1">TB Diagnostic</h4>
              <p className="text-sm text-gray-600 text-center">Assess your potential risk for Tuberculosis (TB) based on symptoms and history.</p>
            </div>
            {/* Chest X-ray Preview */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
              <img src="/medical.png" alt="Chest X-ray Analysis" className="h-24 w-auto object-contain mb-2" />
              <h4 className="font-semibold text-center mb-1">Chest X-ray</h4>
              <p className="text-sm text-gray-600 text-center">Utilize our AI-powered tool to analyze chest X-ray images for potential TB signs.</p>
            </div>
            {/* QnA with TBControl Preview */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
              <img src="/chatbot.png" alt="Chatbot Icon" className="h-24 w-auto object-contain mb-2" />
              <h4 className="font-semibold text-center mb-1">QnA with TBControl</h4>
              <p className="text-sm text-gray-600 text-center">Ask our AI assistant questions about Tuberculosis.</p>
            </div>
            {/* MDR-TB Preview */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-gray-50 transition-transform duration-200 ease-in-out hover:scale-105"> {/* Added hover animation */}
              <img src="/tuberculosis (1).png" alt="MDR-TB Info" className="h-24 w-auto object-contain mb-2" />
              <h4 className="font-semibold text-center mb-1">MDR-TB</h4>
              <p className="text-sm text-gray-600 text-center">Access specific information and resources related to Multi-Drug Resistant TB.</p>
            </div>
          </div>
           <div className="text-center mt-8">
             <Link to="/advanced-screening" className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-secondary rounded-lg hover:bg-secondary/90 transition-all">
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
           </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-20 bg-gray-50"> {/* Changed background to gray-50 to alternate */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Author
            </h2>
          </div>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center"> {/* Added flex for centering image */}
            <img
              src="/profile.jpg" // Assuming image is in public folder
              alt="Daivan Febri Juan Setiya"
              className="w-32 h-32 rounded-full mb-6 object-cover shadow-md" // Added image styling
            />
            <h3 className="text-2xl font-semibold mb-4">Daivan Febri Juan Setiya</h3>
            <p className="text-lg text-gray-600 mb-6">
              A third year undergraduate student majoring in Medicine at Islamic University of Indonesia. Deeply passionate about acquiring new knowledge and having diverse experiences. Aiming to enhance the health standards in Indonesia, bring about sustainable change, and create lasting positive impacts.
            </p>
            <a
              href="https://www.linkedin.com/in/daivan-febri-juan-setiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-base font-semibold text-white bg-secondary rounded-lg hover:bg-secondary/90 transition-all"
            >
              <Linkedin className="mr-2 h-5 w-5" /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    name: "Initial Screening",
    description:
      "Perform an initial screening of TB symptoms easily and quickly through our platform.",
    icon: Activity,
  },
  {
    name: "Advanced Screening Tools",
    description:
      "Utilize advanced tools like BMI calculation, diagnostic aids, and X-ray analysis for a deeper health assessment.",
    icon: Stethoscope, // Changed icon to Stethoscope
  },
  {
    name: "Health Facilities",
    description:
      "Find nearby health facilities that provide TB diagnosis and treatment services.",
    icon: Users,
  },
];

// Removed unused tbStatistics constant

export default Index;
