// ============================================
// lib/carModels.ts
// كل الموديلات والفئات الفرعية لجميع الماركات
// ============================================

import { Car, CarFilters } from './index';

// ------------------------------------------------------
// 1. الموديلات الرئيسية لكل ماركة (Models by Brand)
// ------------------------------------------------------
export const CAR_MODELS_BY_BRAND: Record<string, string[]> = {
  "Toyota": [
    "Corolla",
    "Camry",
    "Yaris",
    "RAV4",
    "Land Cruiser",
    "Prado",
    "Hilux",
    "Fortuner",
    "Avalon",
    "Supra",
    "CH-R",
    "Highlander",
    "Sequoia",
    "Tundra",
    "Sienna",
    "Venza",
    "4Runner",
    "Tacoma"
  ],
  "Hyundai": [
    "Elantra",
    "Sonata",
    "Tucson",
    "Santa Fe",
    "Accent",
    "i10",
    "i20",
    "i30",
    "Kona",
    "Palisade",
    "Venue",
    "Azera",
    "Genesis",
    "Equus",
    "Grandeur",
    "H-1",
    "Starex",
    "Getz",
    "Matrix"
  ],
  "Kia": [
    "Cerato",
    "Sportage",
    "Sorento",
    "Picanto",
    "Rio",
    "Optima",
    "Carnival",
    "Soul",
    "Stinger",
    "Telluride",
    "Mohave",
    "K5",
    "K3",
    "Pegas",
    "Seltos",
    "Sonet",
    "Niro",
    "EV6"
  ],
  "Volkswagen": [
    "Golf",
    "Golf Plus",
    "Passat",
    "Jetta",
    "Tiguan",
    "Polo",
    "Touran",
    "Caddy",
    "Transporter",
    "Amarok",
    "Atlas",
    "Beetle",
    "CC",
    "Eos",
    "Scirocco",
    "Sharan",
    "T-Roc",
    "T-Cross",
    "ID.3",
    "ID.4",
    "ID.5",
    "ID.6",
    "ID.7",
    "ID. Buzz"
  ],
  "Mercedes-Benz": [
    "A-Class",
    "B-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "G-Class",
    "GLA",
    "GLC",
    "GLE",
    "GLS",
    "EQA",
    "EQB",
    "EQC",
    "EQE",
    "EQS",
    "CLS",
    "AMG GT",
    "Maybach S-Class",
    "V-Class",
    "Vito",
    "Sprinter"
  ],
  "BMW": [
    "Series 1",
    "Series 2",
    "Series 3",
    "Series 4",
    "Series 5",
    "Series 6",
    "Series 7",
    "Series 8",
    "X1",
    "X2",
    "X3",
    "X4",
    "X5",
    "X6",
    "X7",
    "i3",
    "i4",
    "i7",
    "iX",
    "iX1",
    "iX3",
    "Z4"
  ],
  "Skoda": [
    "Octavia",
    "Superb",
    "Fabia",
    "Rapid",
    "Scala",
    "Kamiq",
    "Karoq",
    "Kodiaq",
    "Enyaq",
    "Citigo",
    "Yeti",
    "Roomster"
  ],
  "Seat": [
    "Leon",
    "Ibiza",
    "Arona",
    "Ateca",
    "Tarraco",
    "Alhambra",
    "Mii",
    "Toledo",
    "Exeo",
    "Altea"
  ],
  "Ford": [
    "Focus",
    "Fusion",
    "Mondeo",
    "Fiesta",
    "Mustang",
    "Explorer",
    "Escape",
    "Edge",
    "Ranger",
    "F-150",
    "Transit",
    "Tourneo",
    "Kuga",
    "Puma",
    "Bronco",
    "Everest"
  ],
  "Peugeot": [
    "208",
    "308",
    "508",
    "2008",
    "3008",
    "5008",
    "Partner",
    "Expert",
    "Boxer",
    "RCZ",
    "107",
    "207",
    "406",
    "407"
  ],
  "Renault": [
    "Clio",
    "Megane",
    "Talisman",
    "Captur",
    "Kadjar",
    "Koleos",
    "Scenic",
    "Espace",
    "Trafic",
    "Master",
    "Duster",
    "Logan",
    "Sandero",
    "Symbol",
    "Kwid"
  ],
  "Nissan": [
    "Sunny",
    "Altima",
    "Maxima",
    "Sentra",
    "Patrol",
    "X-Trail",
    "Qashqai",
    "Juke",
    "Navara",
    "Frontier",
    "370Z",
    "GT-R",
    "Leaf",
    "Micra",
    "Tiida",
    "Urvan"
  ],
  "Mazda": [
    "Mazda2",
    "Mazda3",
    "Mazda6",
    "CX-3",
    "CX-5",
    "CX-7",
    "CX-9",
    "CX-30",
    "CX-50",
    "CX-60",
    "MX-5",
    "BT-50",
    "323",
    "626",
    "MPV",
    "Premacy",
    "RX-8"
  ],
  "Honda": [
    "Civic",
    "Accord",
    "CR-V",
    "HR-V",
    "Fit",
    "City",
    "Odyssey",
    "Pilot",
    "Ridgeline",
    "S2000",
    "NSX",
    "Jazz",
    "Legend"
  ],
  "Mitsubishi": [
    "Lancer",
    "Pajero",
    "Outlander",
    "ASX",
    "Attrage",
    "Mirage",
    "Montero",
    "Eclipse",
    "Space Star",
    "Triton",
    "L200",
    "Delica"
  ],
  "Jeep": [
    "Wrangler",
    "Grand Cherokee",
    "Cherokee",
    "Compass",
    "Renegade",
    "Gladiator",
    "Patriot",
    "Liberty",
    "CJ"
  ],
  "Audi": [
    "A1",
    "A3",
    "A4",
    "A5",
    "A6",
    "A7",
    "A8",
    "Q2",
    "Q3",
    "Q5",
    "Q7",
    "Q8",
    "e-tron",
    "e-tron GT",
    "Q4 e-tron",
    "Q6 e-tron",
    "Q8 e-tron",
    "TT",
    "R8"
  ],
  "Land Rover": [
    "Range Rover",
    "Range Rover Sport",
    "Range Rover Evoque",
    "Range Rover Velar",
    "Discovery",
    "Discovery Sport",
    "Defender",
    "Freelander"
  ]
};

// ------------------------------------------------------
// 2. الفئات الفرعية (Variants) لكل موديل
// ------------------------------------------------------
export const MODEL_VARIANTS: Record<string, string[]> = {
  // ========== تويوتا ==========
  "Corolla": ["Sedan", "Hatchback", "Wagon", "Cross", "GR Sport"],
  "Camry": ["LE", "SE", "XLE", "XSE", "TRD"],
  "Yaris": ["Sedan", "Hatchback", "GR-4"],
  "RAV4": ["LE", "XLE", "Limited", "Adventure", "TRD Off-Road", "Prime"],
  "Land Cruiser": ["V8", "Heritage Edition", "GR Sport", "300"],
  "Prado": ["TX", "TX-L", "VX", "VXL", "Black Edition"],
  "Hilux": ["Single Cab", "Double Cab", "Smart Cab", "GR Sport", "Invincible"],
  "Fortuner": ["2.7L", "4.0L", "Legender", "GR Sport"],
  "Supra": ["3.0", "3.0 Premium", "A91-CF"],
  "CH-R": ["Style", "Dynamic", "GR Sport"],
  "Highlander": ["LE", "XLE", "Limited", "Platinum"],
  "4Runner": ["SR5", "TRD Off-Road", "TRD Pro", "Limited"],
  "Tacoma": ["SR", "SR5", "TRD Sport", "TRD Off-Road", "TRD Pro", "Limited"],

  // ========== فولكس فاجن ==========
  "Golf": ["Cabriolet", "Sportsvan", "Variant", "GTI", "R", "e-Golf", "GTE"],
  "Golf Plus": ["1.4 TSI", "1.6 FSI", "2.0 TDI"],
  "Passat": ["Sedan", "Variant", "Alltrack", "R-Line", "GTE"],
  "Jetta": ["Comfortline", "Highline", "GLI", "R-Line"],
  "Tiguan": ["Allspace", "R-Line", "Elegance", "Life"],
  "Polo": ["Beats", "GTI", "Life", "R-Line"],
  "Touran": ["Life", "Comfortline", "Highline"],
  "Caddy": ["Cargo", "Maxi", "Life"],
  "Transporter": ["Kombi", "Caravelle", "California"],
  "Amarok": ["Style", "Life", "Aventura", "PanAmericana"],
  "Beetle": ["Classic", "Design", "Dune"],
  "T-Roc": ["Life", "Style", "R-Line"],
  "T-Cross": ["Life", "Style", "R-Line"],
  "ID.3": ["Pure", "Pro", "Pro S", "GTX", "1st"],
  "ID.4": ["Pure", "Pro", "Pro S", "GTX", "1st"],
  "ID.5": ["Pro", "Pro Performance", "GTX"],
  "ID. Buzz": ["Cargo", "Pro", "1st Edition"],

  // ========== مرسيدس ==========
  "C-Class": ["Avantgarde", "Exclusive", "AMG Line", "Estate", "Coupe", "Cabriolet"],
  "E-Class": ["Avantgarde", "Exclusive", "AMG Line", "Estate", "Coupe", "Cabriolet", "All-Terrain"],
  "S-Class": ["Avantgarde", "Exclusive", "AMG Line", "Maybach", "Guard"],
  "A-Class": ["Style", "Progressive", "AMG Line", "Sedan", "Hatchback"],
  "B-Class": ["Style", "Progressive", "AMG Line"],
  "G-Class": ["Professional", "Exclusive", "AMG", "AMG Line"],
  "GLA": ["Style", "Progressive", "AMG Line"],
  "GLC": ["Avantgarde", "AMG Line", "Coupe"],
  "GLE": ["Avantgarde", "AMG Line", "Coupe"],
  "GLS": ["Avantgarde", "AMG Line", "Maybach"],
  "EQA": ["250", "300", "350"],
  "EQB": ["250", "300", "350"],
  "EQC": ["400"],
  "EQE": ["300", "350", "500", "AMG"],
  "EQS": ["450+", "580", "AMG", "Maybach"],
  "V-Class": ["Marco Polo", "Avantgarde", "Exclusive"],
  "Vito": ["Panel Van", "Crew Van", "Tourer"],
  "Sprinter": ["Panel Van", "Crew Van", "Bus"],

  // ========== بي ام دبليو ==========
  "Series 3": ["Sedan", "Touring", "Gran Turismo", "M3"],
  "Series 5": ["Sedan", "Touring", "M5"],
  "Series 7": ["Sedan", "M7"],
  "X3": ["xDrive20i", "xDrive30i", "M40i", "X3 M"],
  "X5": ["xDrive40i", "xDrive50e", "M60i", "X5 M"],
  "i4": ["eDrive35", "eDrive40", "M50"],
  "iX": ["xDrive40", "xDrive50", "M60"],

  // ========== كيا ==========
  "Cerato": ["LX", "EX", "GT Line", "GT"],
  "Sportage": ["LX", "EX", "SX", "GT Line", "X-Line"],
  "Sorento": ["LX", "EX", "SX", "SX Prestige"],
  "Picanto": ["LX", "EX", "GT Line"],
  "Rio": ["LX", "EX", "SX"],
  "Optima": ["LX", "EX", "SX", "SX Turbo"],
  "Carnival": ["LX", "EX", "SX", "SX Prestige"],
  "Stinger": ["GT-Line", "GT1", "GT2"],
  "K5": ["LX", "EX", "GT-Line", "GT"],
  "Seltos": ["LX", "EX", "SX", "SX Turbo"],
  "Niro": ["LX", "EX", "SX", "SX Touring", "PHEV", "EV"],
  "EV6": ["Light", "Wind", "GT-Line", "GT"],

  // ========== هونداي ==========
  "Elantra": ["SE", "SEL", "Limited", "N Line", "N"],
  "Sonata": ["SE", "SEL", "Limited", "N Line"],
  "Tucson": ["SE", "SEL", "Limited", "N Line"],
  "Santa Fe": ["SE", "SEL", "Limited", "Calligraphy"],
  "Accent": ["SE", "SEL", "Limited"],
  "i10": ["Motion", "Prime", "N Line"],
  "i20": ["Motion", "Prime", "N Line"],
  "i30": ["Go", "Prime", "N Line", "N"],
  "Kona": ["SE", "SEL", "Limited", "N Line", "N"],
  "Palisade": ["SE", "SEL", "Limited", "Calligraphy"],
  "Venue": ["SE", "SEL", "Denim", "Limited"],

  // ========== نيسان ==========
  "Patrol": ["LE", "SE", "Platinum", "Super Safari"],
  "X-Trail": ["S", "SV", "SL", "Platinum"],
  "Qashqai": ["S", "SV", "SL", "Platinum"],
  "Sunny": ["S", "SV", "SL"],
  "Altima": ["S", "SV", "SL", "SR", "Platinum"],
  "Maxima": ["SV", "SL", "SR", "Platinum"],
  "Navara": ["S", "SE", "SL", "LE", "Platinum"],
  "GT-R": ["Premium", "Track Edition", "Nismo"],

  // ========== مازدا ==========
  "Mazda3": ["Sport", "Sedan", "Premium", "Turbo"],
  "Mazda6": ["Sport", "Touring", "Grand Touring", "Signature"],
  "CX-5": ["Sport", "Touring", "Grand Touring", "Signature", "Turbo"],
  "CX-9": ["Sport", "Touring", "Grand Touring", "Signature"],
  "MX-5": ["Sport", "Club", "Grand Touring", "RF"],

  // ========== هوندا ==========
  "Civic": ["LX", "EX", "Sport", "Touring", "Si", "Type R"],
  "Accord": ["LX", "EX", "Sport", "Touring"],
  "CR-V": ["LX", "EX", "Sport", "Touring"],
  "HR-V": ["LX", "EX", "EX-L", "Sport"],
  "Fit": ["LX", "EX", "EX-L", "Sport"],
  "City": ["S", "V", "SV", "RS"],
  "Odyssey": ["EX", "EX-L", "Touring", "Elite"],

  // ========== ميتسوبيشي ==========
  "Pajero": ["3.5L", "3.8L", "Final Edition"],
  "Outlander": ["ES", "SE", "SEL", "GT", "PHEV"],
  "Lancer": ["ES", "SE", "GT", "Ralliart", "Evolution"],
  "ASX": ["ES", "SE", "LE", "GT"],
  "Triton": ["GLX", "GLX+", "GLS", "Athlete"],
  "L200": ["GLX", "GLS", "Barbarian"],

  // ========== جيب ==========
  "Wrangler": ["Sport", "Sahara", "Rubicon", "4xe"],
  "Grand Cherokee": ["Laredo", "Limited", "Trailhawk", "Overland", "Summit", "Trackhawk"],
  "Cherokee": ["Latitude", "Limited", "Trailhawk"],
  "Compass": ["Sport", "Latitude", "Limited", "Trailhawk"],
  "Renegade": ["Sport", "Latitude", "Limited", "Trailhawk"],
  "Gladiator": ["Sport", "Overland", "Rubicon", "Mojave"],

  // ========== أودي ==========
  "A3": ["35 TFSI", "40 TFSI", "45 TFSI", "S3", "RS3"],
  "A4": ["35 TFSI", "40 TFSI", "45 TFSI", "S4", "RS4"],
  "A5": ["40 TFSI", "45 TFSI", "S5", "RS5"],
  "A6": ["45 TFSI", "55 TFSI", "S6", "RS6"],
  "A7": ["45 TFSI", "55 TFSI", "S7", "RS7"],
  "A8": ["50 TDI", "55 TFSI", "60 TFSI", "S8"],
  "Q5": ["40 TDI", "45 TFSI", "55 TFSI", "SQ5"],
  "Q7": ["45 TDI", "55 TFSI", "SQ7"],
  "Q8": ["55 TFSI", "SQ8", "RSQ8"],
  "e-tron": ["50", "55", "S", "RS"],
  "Q4 e-tron": ["35", "40", "45", "50", "S"],
  "Q6 e-tron": ["55", "SQ6"],
  "Q8 e-tron": ["50", "55", "S", "RS"],
  "TT": ["40 TFSI", "45 TFSI", "S", "RS"],

  // ========== لاند روفر ==========
  "Range Rover": ["SE", "HSE", "Autobiography", "SV", "SVAutobiography"],
  "Range Rover Sport": ["SE", "HSE", "Autobiography", "SVR"],
  "Range Rover Evoque": ["S", "SE", "HSE", "Autobiography"],
  "Range Rover Velar": ["S", "SE", "HSE", "Autobiography"],
  "Discovery": ["S", "SE", "HSE", "Metropolitan"],
  "Discovery Sport": ["S", "SE", "HSE"],
  "Defender": ["90", "110", "130", "S", "SE", "HSE", "X"]
};

// ------------------------------------------------------
// 3. إحصائيات تجريبية (اختياري - استبدلها ببيانات حقيقية)
// ------------------------------------------------------
export const MODEL_COUNTS: Record<string, number> = {
  // تويوتا
  "Corolla": 24,
  "Camry": 18,
  "Yaris": 15,
  "RAV4": 12,
  "Land Cruiser": 8,
  "Prado": 14,
  "Hilux": 20,
  "Fortuner": 10,
  
  // فولكس فاجن
  "Golf": 16,
  "Golf Plus": 5,
  "Passat": 12,
  "Tiguan": 9,
  "ID. Buzz": 4,
  "Polo": 8,
  "Jetta": 7,
  
  // هيونداي
  "Elantra": 22,
  "Sonata": 14,
  "Tucson": 18,
  "Santa Fe": 11,
  "Accent": 20,
  
  // كيا
  "Cerato": 19,
  "Sportage": 16,
  "Sorento": 10,
  "Picanto": 25,
  "EV6": 6,
  
  // مرسيدس
  "C-Class": 20,
  "E-Class": 15,
  "S-Class": 7,
  "G-Class": 5,
  "GLC": 12,
  
  // بي ام دبليو
  "Series 3": 18,
  "Series 5": 12,
  "X3": 14,
  "X5": 10,
  "iX": 4
};

// ------------------------------------------------------
// 4. الدوال المساعدة (Helper Functions)
// ------------------------------------------------------

/**
 * جلب الموديلات حسب الماركة
 */
export const getModelsByBrand = (brand: string): string[] => {
  if (!brand || brand === "all") return [];
  return CAR_MODELS_BY_BRAND[brand] || [];
};

/**
 * جلب الفئات الفرعية حسب الموديل
 */
export const getVariantsByModel = (model: string): string[] => {
  if (!model) return [];
  return MODEL_VARIANTS[model] || [];
};

/**
 * هل للموديل فئات فرعية؟
 */
export const hasVariants = (model: string): boolean => {
  return MODEL_VARIANTS[model]?.length > 0;
};

/**
 * جلب الموديلات المتوفرة حسب الفلاتر (Conditional Logic)
 */
export const getAvailableModelsConditional = (
  cars: Car[],
  brand: string,
  currentFilters: Partial<CarFilters> = {}
): string[] => {
  if (!brand || brand === "all" || !cars || cars.length === 0) {
    return [];
  }

  try {
    let filteredCars = cars.filter(car => 
      car.brand?.toLowerCase() === brand.toLowerCase()
    );

    const { model, ...otherFilters } = currentFilters;

    // تطبيق الفلاتر الأخرى
    if (otherFilters.minPrice) {
      const min = parseFloat(otherFilters.minPrice.toString());
      if (!isNaN(min)) filteredCars = filteredCars.filter(car => car.price >= min);
    }
    if (otherFilters.maxPrice) {
      const max = parseFloat(otherFilters.maxPrice.toString());
      if (!isNaN(max)) filteredCars = filteredCars.filter(car => car.price <= max);
    }
    if (otherFilters.minYear) {
      const min = parseFloat(otherFilters.minYear.toString());
      if (!isNaN(min)) filteredCars = filteredCars.filter(car => car.year >= min);
    }
    if (otherFilters.maxYear) {
      const max = parseFloat(otherFilters.maxYear.toString());
      if (!isNaN(max)) filteredCars = filteredCars.filter(car => car.year <= max);
    }
    if (otherFilters.minMileage) {
      const min = parseFloat(otherFilters.minMileage.toString());
      if (!isNaN(min)) filteredCars = filteredCars.filter(car => car.mileage >= min);
    }
    if (otherFilters.maxMileage) {
      const max = parseFloat(otherFilters.maxMileage.toString());
      if (!isNaN(max)) filteredCars = filteredCars.filter(car => car.mileage <= max);
    }
    if (otherFilters.fuel) {
      filteredCars = filteredCars.filter(car => 
        car.fuelType?.toLowerCase() === otherFilters.fuel?.toLowerCase()
      );
    }
    if (otherFilters.transmission) {
      filteredCars = filteredCars.filter(car => 
        car.transmission?.toLowerCase() === otherFilters.transmission?.toLowerCase()
      );
    }
    if (otherFilters.color) {
      filteredCars = filteredCars.filter(car => 
        car.color?.toLowerCase() === otherFilters.color?.toLowerCase()
      );
    }
    if (otherFilters.location) {
      filteredCars = filteredCars.filter(car => 
        car.location?.toLowerCase() === otherFilters.location?.toLowerCase()
      );
    }
    if (otherFilters.condition && otherFilters.condition !== "All") {
      filteredCars = filteredCars.filter(car => 
        car.condition === otherFilters.condition
      );
    }

    const modelSet = new Set<string>();
    filteredCars.forEach(car => {
      if (car.model && car.model.trim() !== '') {
        modelSet.add(car.model.trim());
      }
    });

    return Array.from(modelSet).sort((a, b) => 
      a.localeCompare(b, 'ar', { sensitivity: 'base' })
    );
  } catch (error) {
    console.error('Error in conditional models:', error);
    return [];
  }
};

/**
 * جلب عدد السيارات لكل موديل
 */
export const getModelCounts = (
  cars: Car[],
  brand: string,
  currentFilters: Partial<CarFilters> = {}
): Record<string, number> => {
  if (!brand || brand === "all" || !cars || cars.length === 0) {
    return {};
  }

  try {
    let filteredCars = cars.filter(car => 
      car.brand?.toLowerCase() === brand.toLowerCase()
    );

    const { model, ...otherFilters } = currentFilters;

    if (otherFilters.minPrice) {
      const min = parseFloat(otherFilters.minPrice.toString());
      if (!isNaN(min)) filteredCars = filteredCars.filter(car => car.price >= min);
    }
    if (otherFilters.maxPrice) {
      const max = parseFloat(otherFilters.maxPrice.toString());
      if (!isNaN(max)) filteredCars = filteredCars.filter(car => car.price <= max);
    }
    if (otherFilters.minYear) {
      const min = parseFloat(otherFilters.minYear.toString());
      if (!isNaN(min)) filteredCars = filteredCars.filter(car => car.year >= min);
    }
    if (otherFilters.maxYear) {
      const max = parseFloat(otherFilters.maxYear.toString());
      if (!isNaN(max)) filteredCars = filteredCars.filter(car => car.year <= max);
    }
    if (otherFilters.fuel) {
      filteredCars = filteredCars.filter(car => 
        car.fuelType?.toLowerCase() === otherFilters.fuel?.toLowerCase()
      );
    }
    if (otherFilters.transmission) {
      filteredCars = filteredCars.filter(car => 
        car.transmission?.toLowerCase() === otherFilters.transmission?.toLowerCase()
      );
    }

    const counts: Record<string, number> = {};
    filteredCars.forEach(car => {
      if (car.model) {
        counts[car.model] = (counts[car.model] || 0) + 1;
      }
    });

    return counts;
  } catch (error) {
    console.error('Error getting model counts:', error);
    return {};
  }
};

/**
 * تحويل نص الموديلات المفصول بفواصل إلى مصفوفة
 */
export const parseModelsFromFilter = (modelString?: string): string[] => {
  if (!modelString) return [];
  return modelString.split(',').map(m => m.trim()).filter(Boolean);
};

/**
 * تصفية السيارات حسب الموديلات المختارة
 */
export const filterCarsByModels = (cars: Car[], models: string[]): Car[] => {
  if (!models || models.length === 0) return cars;
  
  return cars.filter(car => {
    return models.some(model => 
      car.model?.toLowerCase().includes(model.toLowerCase()) ||
      model.toLowerCase().includes(car.model?.toLowerCase() || '')
    );
  });
};