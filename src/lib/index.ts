export const ROUTE_PATHS = {
  HOME: "/",
  CARS: "/cars",
  CAR_DETAIL: "/cars/:id",
  ADD_CAR: "/add-car",
  AUTH: "/auth",
} as const;

export const PALESTINIAN_CITIES = [
  "Jerusalem",
  "Ramallah",
  "Al-Bireh",
  "Nablus",
  "Jenin",
  "Tulkarm",
  "Qalqilya",
  "Salfit",
  "Tubas",
  "Jericho",
  "Bethlehem",
  "Beit Jala",
  "Beit Sahour",
  "Hebron",
  "Halhul",
  "Dura",
  "Yatta",
  "Gaza City",
  "Khan Younis",
  "Rafah",
  "Deir al-Balah",
  "Jabalia",
  "Beit Lahia",
  "Beit Hanoun",
] as const;

export const CAR_BRANDS = [
  "Toyota",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Mercedes-Benz",
  "BMW",
  "Skoda",
  "Seat",
  "Ford",
  "Peugeot",
  "Renault",
  "Nissan",
  "Mazda",
  "Honda",
  "Mitsubishi",
  "Jeep",
  "Audi",
  "Land Rover",
] as const;

export type CarCondition = "New" | "Used";
export type FuelType = "Gasoline" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Automatic" | "Manual";

// إضافة أنواع الفرز
export type SortOption = 
  | "distance"
  | "date_desc"
  | "price_asc"
  | "price_desc"
  | "km_asc"
  | "km_desc"
  | "year_asc"
  | "year_desc"
  | "dealer";

export const SORT_OPTIONS: { value: SortOption; label: { en: string; ar: string } }[] = [
  { value: "distance", label: { en: "Distance", ar: "المسافة" } },
  { value: "date_desc", label: { en: "First listing date", ar: "أول تاريخ إعلان" } },
  { value: "price_asc", label: { en: "Price (ascending)", ar: "السعر (تصاعدي)" } },
  { value: "price_desc", label: { en: "Price (descending)", ar: "السعر (تنازلي)" } },
  { value: "km_asc", label: { en: "Kilometer", ar: "الكيلومترات" } },
  { value: "km_desc", label: { en: "Kilometer (descending)", ar: "الكيلومترات (تنازلي)" } },
  { value: "year_asc", label: { en: "Model year (ascending)", ar: "سنة الموديل (تصاعدي)" } },
  { value: "year_desc", label: { en: "Model year (descending)", ar: "سنة الموديل (تنازلي)" } },
  { value: "dealer", label: { en: "DEALER", ar: "تاجر" } },
];

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Car {
  id: string;
  name: string;
  brand: typeof CAR_BRANDS[number];
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  condition: CarCondition;
  location: typeof PALESTINIAN_CITIES[number];
  description: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  createdAt: string;
  color?: string;
  engine?: string;
}

export interface CarFilters {
  query?: string;
  brand?: string;
  model?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  minYear?: string | number;
  maxYear?: string | number;
  minMileage?: string | number;
  maxMileage?: string | number;
  condition?: CarCondition | "All";
  location?: string;
  fuel?: string;
  transmission?: string;
  color?: string;
  engine?: string;
}

export const formatPrice = (price: number, locale: "en" | "ar" = "en") => {
  const formatter = new Intl.NumberFormat(locale === "ar" ? "ar-PS" : "en-US", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

export const getWhatsAppUrl = (phone: string, message: string) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

// دالة مساعدة للفرز
export const sortCars = (cars: Car[], sortBy: SortOption): Car[] => {
  const sortedCars = [...cars];
  
  switch (sortBy) {
    case "price_asc":
      return sortedCars.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedCars.sort((a, b) => b.price - a.price);
    case "km_asc":
      return sortedCars.sort((a, b) => a.mileage - b.mileage);
    case "km_desc":
      return sortedCars.sort((a, b) => b.mileage - a.mileage);
    case "year_asc":
      return sortedCars.sort((a, b) => a.year - b.year);
    case "year_desc":
      return sortedCars.sort((a, b) => b.year - a.year);
    case "date_desc":
      return sortedCars.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "dealer":
      return sortedCars.sort((a, b) => {
        const aIsDealer = a.sellerName.toLowerCase().includes("dealer") || a.sellerName.toLowerCase().includes("تاجر");
        const bIsDealer = b.sellerName.toLowerCase().includes("dealer") || b.sellerName.toLowerCase().includes("تاجر");
        if (aIsDealer && !bIsDealer) return -1;
        if (!aIsDealer && bIsDealer) return 1;
        return 0;
      });
    case "distance":
    default:
      return sortedCars;
  }
};