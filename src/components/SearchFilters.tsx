import React from 'react';
import { Search, RotateCcw, Filter, Gauge, Calendar, DollarSign, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarFilters } from '@/lib/index';
import { useLanguage } from '@/hooks/useLanguage';

interface SearchFiltersProps {
  filters: CarFilters;
  onFiltersChange: (filters: CarFilters) => void;
  onSearch: () => void;
}

interface SimpleSearchBarProps {
  filters: CarFilters;
  onFiltersChange: (filters: CarFilters) => void;
  onSearch: () => void;
}

/**
 * مكون البحث البسيط - الصفحة الرئيسية
 */
export function SimpleSearchBar({ filters, onFiltersChange, onSearch }: SimpleSearchBarProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-xl border border-slate-100 w-full max-w-3xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <Button 
        onClick={onSearch}
        className="bg-[#0269b8] hover:bg-[#002a56] text-white px-8 h-12 rounded-xl font-bold transition-all shrink-0"
      >
        {t("Search", "بحث")}
      </Button>
      <div className="relative flex-1">
        <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400`} />
        <input 
          type="text"
          className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} border-none bg-transparent focus:outline-none text-slate-700 h-12 text-base`}
          placeholder={t("Search cars...", "ابحث عن سيارات...")}
          value={filters.query || ''}
          onChange={(e) => onFiltersChange({...filters, query: e.target.value})}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
    </div>
  );
}

/**
 * مكون الفرز المنفصل - معدّل لدعم العربية مع سهم واحد فقط
 */
export function SortDropdown({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const { t, isRTL } = useLanguage();

  const sortOptions = [
    { value: "distance", label: t("Distance", "الاكثر تطابقا") },
    { value: "date_desc", label: t("First listing date", "أول تاريخ إعلان") },
    { value: "price_asc", label: t("Price (ascending)", "السعر (تصاعدي)") },
    { value: "price_desc", label: t("Price (descending)", "السعر (تنازلي)") },
    { value: "km_asc", label: t("Kilometer", "الكيلومترات") },
    { value: "km_desc", label: t("Kilometer (descending)", "الكيلومترات (تنازلي)") },
    { value: "year_asc", label: t("Model year (ascending)", "سنة الموديل (تصاعدي)") },
    { value: "year_desc", label: t("Model year (descending)", "سنة الموديل (تنازلي)") },
  ];

  const selectedOption = sortOptions.find(option => option.value === value);

  return (
    <div className={`flex items-center gap-2 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        {t("Sort by:", "ترتيب حسب:")}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[220px] bg-white border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-[#0269b8] focus:border-[#0269b8]">
          <div className="flex items-center justify-between w-full">
            <span className="truncate">{selectedOption?.label || t("Select", "اختر")}</span>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200 shadow-lg">
          {sortOptions.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value}
              className="hover:bg-gray-50 cursor-pointer py-3"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * الفلتر المتقدم - بدون خيار الفرز
 */
export function SearchFilters({ filters, onFiltersChange, onSearch }: SearchFiltersProps) {
  const { t, isRTL } = useLanguage();

  const updateFilter = (key: keyof CarFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      query: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      fuel: '',
      transmission: '',
      color: '',
      minYear: '',
      maxYear: '',
      minMileage: '',
      maxMileage: '',
      engine: '',
    });
  };

  return (
    <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm w-full space-y-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* الهيدر */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-[#0269b8]" />
          <h2 className="text-xl font-bold text-slate-900">{t("Advanced Filters", "خيارات البحث")}</h2>
        </div>
        <button onClick={resetFilters} className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#0269b8] transition-colors">
          <RotateCcw className="w-4 h-4" /> {t("Reset", "إعادة ضبط")}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        
        {/* 1. Make (الشركة المصنعة) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Make", "الشركة المصنعة")}</label>
          <Select value={filters.brand || ""} onValueChange={(v) => updateFilter('brand', v === "all" ? "" : v)}>
            <SelectTrigger className="bg-slate-50 h-11 border-slate-200">
              <SelectValue placeholder={t("All Makes", "جميع الماركات")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Makes", "جميع الماركات")}</SelectItem>
              <SelectItem value="volkswagen">Volkswagen</SelectItem>
<SelectItem value="hyundai">Hyundai</SelectItem>
<SelectItem value="kia">Kia</SelectItem>
<SelectItem value="skoda">Skoda</SelectItem>
<SelectItem value="seat">SEAT</SelectItem>
<SelectItem value="mercedes-benz">Mercedes-Benz</SelectItem>
<SelectItem value="bmw">BMW</SelectItem>
<SelectItem value="peugeot">Peugeot</SelectItem>
<SelectItem value="opel">Opel</SelectItem>
<SelectItem value="ford">Ford</SelectItem>
<SelectItem value="citroen">Citroën</SelectItem>
<SelectItem value="fiat">Fiat</SelectItem>
<SelectItem value="nissan">Nissan</SelectItem>
<SelectItem value="mitsubishi">Mitsubishi</SelectItem>
<SelectItem value="audi">Audi</SelectItem>
<SelectItem value="chevrolet">Chevrolet</SelectItem>
<SelectItem value="toyota">Toyota</SelectItem>
<SelectItem value="jeep">Jeep</SelectItem>
<SelectItem value="renault">Renault</SelectItem>
<SelectItem value="land-rover">Land Rover</SelectItem>
<SelectItem value="mazda">Mazda</SelectItem>
<SelectItem value="daewoo">Daewoo</SelectItem>
<SelectItem value="mg">MG</SelectItem>
<SelectItem value="subaru">Subaru</SelectItem>
<SelectItem value="honda">Honda</SelectItem>
<SelectItem value="ssangyong">SsangYong</SelectItem>
<SelectItem value="dodge">Dodge</SelectItem>
<SelectItem value="isuzu">Isuzu</SelectItem>
<SelectItem value="jaguar">Jaguar</SelectItem>
<SelectItem value="leapmotor">Leapmotor</SelectItem>
<SelectItem value="daihatsu">Daihatsu</SelectItem>
<SelectItem value="volvo">Volvo</SelectItem>
<SelectItem value="abarth">Abarth</SelectItem>
<SelectItem value="suzuki">Suzuki</SelectItem>
<SelectItem value="im-motors">IM Motors</SelectItem>
<SelectItem value="acura">Acura</SelectItem>
<SelectItem value="alfa-romeo">Alfa Romeo</SelectItem>
<SelectItem value="buick">Buick</SelectItem>
<SelectItem value="byd">BYD</SelectItem>
<SelectItem value="gac">GAC</SelectItem>
<SelectItem value="geely">Geely</SelectItem>
<SelectItem value="mini">Mini</SelectItem>
<SelectItem value="pontiac">Pontiac</SelectItem>
<SelectItem value="skywell">Skywell</SelectItem>
<SelectItem value="avatr">Avatr</SelectItem>
<SelectItem value="seres">Seres</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 2. Model (الموديل/الفئة) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Model", "الموديل / الفئة")}</label>
          <div className="relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400`} />
            <Input 
              className={`${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'} bg-slate-50 border-slate-200 h-11`} 
              placeholder={t("e.g. Golf, C-Class...", "مثال: جولف، سي كلاس...")} 
              value={filters.model || ''}
              onChange={(e) => updateFilter('model', e.target.value)}
            />
          </div>
        </div>

        {/* 3. Fuel Type (نوع الوقود) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Fuel Type", "نوع الوقود")}</label>
          <Select value={filters.fuel || ""} onValueChange={(v) => updateFilter('fuel', v)}>
            <SelectTrigger className="bg-slate-50 h-11 border-slate-200">
              <SelectValue placeholder={t("Any Fuel", "أي نوع")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">{t("Petrol", "بنزين")}</SelectItem>
              <SelectItem value="diesel">{t("Diesel", "ديزل")}</SelectItem>
              <SelectItem value="hybrid">{t("Hybrid", "هايبرد")}</SelectItem>
              <SelectItem value="electric">{t("Electric", "كهرباء")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 4. Engine (المحرك/سعة المحرك) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Engine", "المحرك")}</label>
          <Select value={filters.engine || ""} onValueChange={(v) => updateFilter('engine', v)}>
            <SelectTrigger className="w-full bg-slate-50 h-11 border-slate-200">
              <SelectValue placeholder={t("Any Engine", "أي سعة")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.4">1400 cc</SelectItem>
              <SelectItem value="1.6">1600 cc</SelectItem>
              <SelectItem value="2.0">2000 cc</SelectItem>
              <SelectItem value="3.0">3000 cc+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 5. Transmission (ناقل الحركة/الجير) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Transmission", "ناقل الحركة")}</label>
          <Select value={filters.transmission || ""} onValueChange={(v) => updateFilter('transmission', v)}>
            <SelectTrigger className="w-full bg-slate-50 h-11 border-slate-200">
              <SelectValue placeholder={t("Any Transmission", "أي نوع جير")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">{t("Automatic", "أوتوماتيك")}</SelectItem>
              <SelectItem value="manual">{t("Manual", "يدوي")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 6. Price (السعر) */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#0269b8]" /> {t("Price Range", "نطاق السعر")}
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 border border-slate-200 rounded-lg p-1 bg-white flex items-center px-3 h-11">
              <span className="text-xs text-slate-400 mx-2">{t("Min", "من")}</span>
              <Input 
                type="number"
                className="border-none shadow-none focus-visible:ring-0 text-center font-bold h-8 p-0" 
                placeholder="1000"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
              />
            </div>
            <span className="text-slate-400 text-sm">{t("to", "إلى")}</span>
            <div className="flex-1 border border-[#0269b8] rounded-lg p-1 bg-white flex items-center px-3 h-11">
              <span className="text-xs text-[#0269b8] mx-2">{t("Max", "إلى")}</span>
              <Input 
                type="number"
                className="border-none shadow-none focus-visible:ring-0 text-center font-bold text-[#0269b8] h-8 p-0" 
                placeholder="Max" 
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 7. Color (اللون) */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Color", "اللون")}</label>
          <Select value={filters.color || ""} onValueChange={(v) => updateFilter('color', v)}>
            <SelectTrigger className="w-full bg-slate-50 h-11 border-slate-200">
              <SelectValue placeholder={t("Any Color", "أي لون")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="white">{t("White", "أبيض")}</SelectItem>
              <SelectItem value="black">{t("Black", "أسود")}</SelectItem>
              <SelectItem value="silver">{t("Silver", "فضي")}</SelectItem>
              <SelectItem value="gray">{t("Gray", "سكني")}</SelectItem>
              <SelectItem value="red">{t("Red", "أحمر")}</SelectItem>
              <SelectItem value="blue">{t("Blue", "أزرق")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 8. Year (سنة الصنع) */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0269b8]" /> {t("Year Range", "سنة الصنع")}
          </label>
          <div className="flex items-center gap-2">
            <Select value={filters.minYear || ""} onValueChange={(v) => updateFilter('minYear', v)}>
              <SelectTrigger className="flex-1 bg-slate-50 border-slate-300 h-11">
                <SelectValue placeholder={t("From", "من")} />
              </SelectTrigger>
              <SelectContent>
                {[2010, 2012, 2015, 2018, 2020, 2022].map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            <span className="text-slate-400 font-bold">-</span>
            <Select value={filters.maxYear || ""} onValueChange={(v) => updateFilter('maxYear', v)}>
              <SelectTrigger className="flex-1 bg-slate-50 border-[#0269b8] h-11">
                <SelectValue placeholder={t("To", "إلى")} />
              </SelectTrigger>
              <SelectContent>
                {[2023, 2024, 2025, 2026].map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 9. Mileage (العداد/المسافة المقطوعة) */}
        <div className="space-y-3 pb-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#0269b8]" /> {t("Mileage (KM)", "المسافة المقطوعة")}
          </label>
          <div className="flex items-center gap-2">
            <Input 
              type="number"
              className="bg-slate-50 border-slate-200 h-11 text-center font-bold" 
              placeholder="0"
              value={filters.minMileage || ''}
              onChange={(e) => updateFilter('minMileage', e.target.value)}
            />
            <span className="text-slate-400">{t("to", "إلى")}</span>
            <Input 
              type="number"
              className="bg-slate-50 border-[#0269b8] h-11 text-center font-bold text-[#0269b8]" 
              placeholder="Max"
              value={filters.maxMileage || ''}
              onChange={(e) => updateFilter('maxMileage', e.target.value)}
            />
          </div>
        </div>

      </div>

      <Button 
        onClick={onSearch}
        className="w-full h-14 bg-[#0269b8] hover:bg-[#003d6b] text-white font-bold text-lg mt-4 rounded-xl shadow-lg transition-all active:scale-95"
      >
        {t("Apply Filters", "تطبيق الفلاتر")}
      </Button>
    </div>
  );
}