import React, { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { SearchFilters, SortDropdown } from "@/components/SearchFilters";
import { SAMPLE_CARS } from "@/data/cars";
import { useLanguage } from "@/hooks/useLanguage";
import { CarFilters } from "@/lib/index";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, SearchX, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ITEMS_PER_PAGE = 6;

export default function Cars() {
  const { t } = useLanguage();
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<CarFilters>({
    condition: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("date_desc");

  const parseNumber = (value: string | number | undefined): number | undefined => {
    if (value === undefined || value === "" || value === null) return undefined;
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? undefined : num;
  };

  const compareIgnoreCase = (a: string = "", b: string = ""): boolean => {
    return a.toString().toLowerCase() === b.toString().toLowerCase();
  };

  const sortCars = (cars: typeof SAMPLE_CARS, sortOption: string) => {
    const sortedCars = [...cars];
    
    switch (sortOption) {
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
        return sortedCars;
      default:
        return sortedCars;
    }
  };

  const filteredCars = useMemo(() => {
    const minPrice = parseNumber(filters.minPrice);
    const maxPrice = parseNumber(filters.maxPrice);
    const minYear = parseNumber(filters.minYear);
    const maxYear = parseNumber(filters.maxYear);
    const minMileage = parseNumber(filters.minMileage);
    const maxMileage = parseNumber(filters.maxMileage);

    const filtered = SAMPLE_CARS.filter((car) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.location.toLowerCase().includes(query) ||
        car.description.toLowerCase().includes(query);

      const matchesBrand = !filters.brand || 
        compareIgnoreCase(car.brand, filters.brand);

      const matchesCondition =
        filters.condition === "All" || car.condition === filters.condition;

      const matchesLocation = !filters.location || 
        compareIgnoreCase(car.location, filters.location);

      const matchesMinPrice = minPrice === undefined || car.price >= minPrice;
      const matchesMaxPrice = maxPrice === undefined || car.price <= maxPrice;

      const matchesMinYear = minYear === undefined || car.year >= minYear;
      const matchesMaxYear = maxYear === undefined || car.year <= maxYear;

      const matchesMinMileage = minMileage === undefined || car.mileage >= minMileage;
      const matchesMaxMileage = maxMileage === undefined || car.mileage <= maxMileage;

      const fuelMap: Record<string, string> = {
        'petrol': 'Gasoline',
        'diesel': 'Diesel',
        'hybrid': 'Hybrid',
        'electric': 'Electric',
        'بنزين': 'Gasoline',
        'ديزل': 'Diesel',
        'هايبرد': 'Hybrid',
        'كهرباء': 'Electric'
      };
      const matchesFuel = !filters.fuel || 
        compareIgnoreCase(car.fuelType, fuelMap[filters.fuel.toLowerCase()] || filters.fuel);

      const transmissionMap: Record<string, string> = {
        'automatic': 'Automatic',
        'manual': 'Manual',
        'أوتوماتيك': 'Automatic',
        'يدوي': 'Manual'
      };
      const matchesTransmission = !filters.transmission || 
        compareIgnoreCase(car.transmission, transmissionMap[filters.transmission.toLowerCase()] || filters.transmission);

      const matchesColor = !filters.color || 
        compareIgnoreCase(car.color, filters.color);

      const matchesEngine = !filters.engine || 
        car.engine?.toString() === filters.engine.toString();

      const matchesModel = !filters.model || 
        car.model.toLowerCase().includes(filters.model.toLowerCase());

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCondition &&
        matchesLocation &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinYear &&
        matchesMaxYear &&
        matchesMinMileage &&
        matchesMaxMileage &&
        matchesFuel &&
        matchesTransmission &&
        matchesColor &&
        matchesEngine &&
        matchesModel
      );
    });

    return sortCars(filtered, sortBy);
  }, [filters, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: CarFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setFilters({
      condition: "All",
      brand: "",
      model: "",
      fuel: "",
      transmission: "",
      color: "",
      engine: "",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
      minMileage: "",
      maxMileage: "",
      location: "",
      query: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
    setSortBy("date_desc");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-full lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {t("Find Your Perfect Car", "ابحث عن سيارتك المثالية")}
                </h1>
                <p className="text-muted-foreground">
                  {t(`Showing ${filteredCars.length} vehicles in `, `نعرض ${filteredCars.length} مركبة في `)}
                  <span style={{ color: '#0269b8', fontWeight: 500 }}>
                    {t("Palestine", "فلسطين")}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3">
                {/* قائمة الفرز */}
                <SortDropdown value={sortBy} onChange={setSortBy} />
                
                {/* Mobile Filter Trigger */}
                <div className="lg:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <SlidersHorizontal className="h-4 w-4" />
                        {t("Filters", "الفلاتر")}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
                      <div className="p-6">
                        <SearchFilters
                          filters={filters}
                          onFiltersChange={handleFiltersChange}
                          onSearch={handleSearch}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
                  <Button
                    variant={viewType === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setViewType("grid")}
                    title={t("Grid View", "عرض الشبكة")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewType === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => setViewType("list")}
                    title={t("List View", "عرض القائمة")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Grid/List */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {paginatedCars.length > 0 ? (
                  <motion.div
                    key={`${viewType}-${currentPage}-${searchQuery}-${sortBy}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={
                      viewType === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    }
                  >
                    {paginatedCars.map((car) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        className={viewType === "list" ? "flex-col sm:flex-row sm:h-56" : ""}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-muted rounded-2xl"
                  >
                    <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                      <SearchX className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t("No matches found", "لم يتم العثور على نتائج")}
                    </h3>
                    <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                      {t(
                        "We couldn't find any cars matching your current filters. Try broadening your search.",
                        "لم نتمكن من العثور على أي سيارات تطابق الفلاتر الحالية. حاول توسيع نطاق البحث."
                      )}
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-8"
                      onClick={resetAllFilters}
                    >
                      {t("Reset All Filters", "إعادة ضبط جميع الفلاتر")}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground">
                  {t(
                    `Page ${currentPage} of ${totalPages}`,
                    `صفحة ${currentPage} من ${totalPages}`
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    {t("Previous", "السابق")}
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        className="w-9 h-9"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    {t("Next", "التالي")}
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}