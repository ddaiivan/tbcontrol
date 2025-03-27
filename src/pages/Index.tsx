
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Users, Calendar, ChartBar, Heart, AlertCircle, Linkedin } from "lucide-react"; // Added Linkedin icon
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

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
            {/* Statistics Chart - Adjusted for better responsiveness */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">TB Prevalence in Indonesia</h3>
              <div className="h-80">
                <ChartContainer 
                  className="h-full"
                  config={{
                    cases: { theme: { light: "#7e22ce", dark: "#c084fc" } },
                    deaths: { theme: { light: "#e11d48", dark: "#fb7185" } }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tbStatistics}
                      margin={{ top: 10, right: 5, left: 5, bottom: 20 }} // Adjusted left and right margins
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                      <Bar dataKey="cases" name="TB Cases (thousands)" fill="var(--color-cases)" />
                      <Bar dataKey="deaths" name="TB Deaths (thousands)" fill="var(--color-deaths)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-sm text-gray-500 mt-2">Data source: WHO Global TB Report</p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
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
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Heart className="h-10 w-10 text-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Indonesia's Burden</h3>
                    <p className="mt-1 text-gray-600">With approximately 845,000 cases annually and 93,000 deaths, Indonesia faces a significant TB challenge.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
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

      {/* Author Section */}
      <section className="py-20 bg-white"> {/* Similar styling to other sections */}
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
              href="https://www.linkedin.com/in/daivan-febri-juan-setiya/details/honors/"
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
    name: "Comprehensive Information",
    description:
      "Access reliable information about prevention, treatment, and management of TB.",
    icon: Users,
  },
  {
    name: "Treatment Monitoring",
    description:
      "Monitor treatment progress and medication schedules with ease.",
    icon: Calendar,
  },
];

const tbStatistics = [
  { year: "2018", cases: 845, deaths: 93 },
  { year: "2019", cases: 842, deaths: 91 },
  { year: "2020", cases: 824, deaths: 89 },
  { year: "2021", cases: 815, deaths: 86 },
  { year: "2022", cases: 795, deaths: 82 },
];

export default Index;
