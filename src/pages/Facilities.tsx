
import { useState } from "react";
import { Search, MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Facility = {
  id: number;
  name: string;
  type: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  hours: string;
  services: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
};

const Facilities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("list"); // Add state for active tab

  // Filter facilities based on search query and selected province
  const filteredFacilities = healthFacilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          facility.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProvince = selectedProvince === "all" || facility.province === selectedProvince;
    
    return matchesSearch && matchesProvince;
  });

  // Get unique provinces for filter
  const provinces = Array.from(
    new Set(healthFacilities.map((facility) => facility.province))
  ).sort();

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold sm:text-4xl mb-4">
                Health Facilities
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Find nearby health facilities that provide TB diagnosis and treatment services
              </p>
              
              {/* Search bar removed */}
            </div>
          </div>
        </section>

        {/* Facilities List */}
        <section className="py-12 container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="list"
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <TabsList>
                <TabsTrigger value="list">List</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>

              {/* Conditionally render the filter only for the list view */}
              {activeTab === 'list' && (
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Filter by Province:</span>
                  <select
                    className="p-2 border rounded-md"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                  >
                    <option value="all">All Provinces</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredFacilities.length > 0 ? (
                  filteredFacilities.map((facility) => (
                    <Card key={facility.id} className="card-hover">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{facility.name}</CardTitle>
                            <p className="text-sm text-gray-500">{facility.type}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                            <span className="text-sm">
                              {facility.address}, {facility.city}, {facility.province}
                            </span>
                          </div>
                          <div className="flex">
                            <Phone className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                            <span className="text-sm">{facility.phone}</span>
                          </div>
                          <div className="flex">
                            <Clock className="h-5 w-5 text-gray-500 mr-2 shrink-0" />
                            <span className="text-sm">{facility.hours}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium mt-3 mb-1">TB Services:</p>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {facility.services.map((service, index) => (
                                <li key={index}>{service}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-2">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${facility.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary text-sm flex items-center hover:underline"
                            >
                              View on Google Maps
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">
                      No health facilities found. Try changing your search criteria.
                    </p>
                  </div>
                )}
              </div>

              {/* Health Center Directory Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4 text-center">Health Center Directory</h2>
                {/* Embed PDF using iframe */}
                <div className="w-full aspect-[4/3] md:aspect-video rounded-lg overflow-hidden border"> {/* Added border */}
                  <iframe
                    src="/Data List Puskesmas.pdf"
                    className="w-full h-full"
                    title="Health Center Directory PDF"
                  ></iframe>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map" className="mt-0">
              <div className="w-full aspect-video md:aspect-[16/7] rounded-lg overflow-hidden"> {/* Adjusted container for responsiveness */}
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=17hrHaGw_hgmmVzrz9lyOKi6nS5NLIpg&ehbc=2E312F"
                  className="w-full h-full border-0" // Use classes for sizing
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

// Sample data for health facilities
const healthFacilities: Facility[] = [
  {
    id: 1,
    name: "RSUP Dr. Cipto Mangunkusumo",
    type: "Central Hospital",
    address: "Jl. Diponegoro No. 71",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    phone: "(021) 1500135",
    hours: "24 Hours",
    services: [
      "TB Screening and Diagnosis",
      "TB Treatment",
      "MDR-TB Management",
      "TB Patient Counseling"
    ]
  },
  {
    id: 2,
    name: "RSUD Pasar Minggu",
    type: "Regional General Hospital",
    address: "Jl. TB Simatupang No. 1",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    phone: "(021) 7501524",
    hours: "24 Hours",
    services: [
      "TB Screening and Diagnosis",
      "TB Treatment",
      "TB Patient Counseling"
    ]
  },
  {
    id: 3,
    name: "Puskesmas Kebon Jeruk",
    type: "Community Health Center",
    address: "Jl. Raya Kebon Jeruk No. 1",
    city: "Jakarta Barat",
    province: "DKI Jakarta",
    phone: "(021) 5350709",
    hours: "07:30 - 16:00 (Monday-Friday)",
    services: [
      "TB Screening",
      "TB Treatment (DOTS)",
      "Patient and Family Education"
    ]
  },
  {
    id: 4,
    name: "RSUD Dr. Soetomo",
    type: "Regional General Hospital",
    address: "Jl. Prof. Dr. Moestopo No. 6-8",
    city: "Surabaya",
    province: "Jawa Timur",
    phone: "(031) 5501078",
    hours: "24 Hours",
    services: [
      "TB Screening and Diagnosis",
      "TB Treatment",
      "MDR-TB Management",
      "TB Patient Counseling",
      "TB Research"
    ]
  },
  {
    id: 5,
    name: "Puskesmas Pacarkeling",
    type: "Community Health Center",
    address: "Jl. Pacarkeling No. 43",
    city: "Surabaya",
    province: "Jawa Timur",
    phone: "(031) 3719445",
    hours: "07:30 - 15:00 (Monday-Saturday)",
    services: [
      "TB Screening",
      "TB Treatment (DOTS)",
      "TB Education/Outreach"
    ]
  },
  {
    id: 6,
    name: "RSUP Dr. Hasan Sadikin",
    type: "Central Hospital",
    address: "Jl. Pasteur No. 38",
    city: "Bandung",
    province: "Jawa Barat",
    phone: "(022) 2034953",
    hours: "24 Hours",
    services: [
      "TB Screening and Diagnosis",
      "TB Treatment",
      "MDR-TB Management",
      "TB Patient Counseling"
    ]
  },
  {
    id: 7,
    name: "Puskesmas Garuda",
    type: "Community Health Center",
    address: "Jl. Garuda No. 23",
    city: "Bandung",
    province: "Jawa Barat",
    phone: "(022) 6031521",
    hours: "08:00 - 15:00 (Monday-Friday)",
    services: [
      "TB Screening",
      "TB Treatment (DOTS)",
      "Patient and Family Education"
    ]
  },
  {
    id: 8,
    name: "RSUP Dr. Kariadi",
    type: "Central Hospital",
    address: "Jl. Dr. Sutomo No. 16",
    city: "Semarang",
    province: "Jawa Tengah",
    phone: "(024) 8413476",
    hours: "24 Hours",
    services: [
      "TB Screening and Diagnosis",
      "TB Treatment",
      "MDR-TB Management",
      "TB Patient Counseling"
    ]
  }
];

export default Facilities;
