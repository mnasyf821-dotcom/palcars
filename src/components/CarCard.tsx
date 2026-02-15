import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  MessageCircle,
  ExternalLink,
  Tag,
  User,
  Car as CarIcon
} from "lucide-react";
import { Car, ROUTE_PATHS, formatPrice, getWhatsAppUrl } from "@/lib/index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLanguage } from "@/hooks/useLanguage";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CarCardProps {
  car: Car;
  className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
  const { t, language, isRTL } = useLanguage();
  
  const detailUrl = ROUTE_PATHS.CAR_DETAIL.replace(":id", car.id);
  
  // رسالة واتساب باللغة المختارة
  const whatsappMessage = language === 'ar' 
    ? `مرحباً، أنا مهتم بسيارتك ${car.brand} ${car.model} (${car.year}) المعروضة في سوق السيارات الفلسطيني.`
    : `Hello, I am interested in your ${car.brand} ${car.model} (${car.year}) listed on the Palestine Car Marketplace.`;
  
  const whatsappUrl = getWhatsAppUrl(car.sellerPhone, whatsappMessage);

  // دالة لعرض السعر بالإنجليزية دائماً
  const formatPriceEnglish = (price: number) => {
    // استخدام تنسيق إنجليزي دائماً
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: 'symbol'
    }).format(price);
  };

  // دالة لتحويل fuelType للغة المختارة
  const getFuelTypeText = (fuelType: string) => {
    const fuelMap: Record<string, { en: string, ar: string }> = {
      'Gasoline': { en: 'Gasoline', ar: 'بنزين' },
      'Diesel': { en: 'Diesel', ar: 'ديزل' },
      'Hybrid': { en: 'Hybrid', ar: 'هايبرد' },
      'Electric': { en: 'Electric', ar: 'كهرباء' }
    };
    return fuelMap[fuelType]?.[language] || fuelType;
  };

  // دالة لتحويل transmission للغة المختارة
  const getTransmissionText = (transmission: string) => {
    const transmissionMap: Record<string, { en: string, ar: string }> = {
      'Automatic': { en: 'Automatic', ar: 'أوتوماتيك' },
      'Manual': { en: 'Manual', ar: 'يدوي' }
    };
    return transmissionMap[transmission]?.[language] || transmission;
  };

  // دالة لتحويل condition للغة المختارة
  const getConditionText = (condition: string) => {
    const conditionMap: Record<string, { en: string, ar: string }> = {
      'New': { en: 'New', ar: 'جديد' },
      'Used': { en: 'Used', ar: 'مستعمل' }
    };
    return conditionMap[condition]?.[language] || condition;
  };

  // دالة لتنسيق الأرقام (المسافة، السنة) حسب اللغة المختارة
  const formatNumber = (num: number) => {
    return language === 'ar' 
      ? new Intl.NumberFormat('ar-PS').format(num)
      : new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Card className="group overflow-hidden h-full flex flex-col border-2 border-gray-200 hover:border-blue-400 bg-white hover:shadow-2xl transition-all duration-300 shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Link to={detailUrl} className="block h-full">
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                    <div class="text-5xl mb-4">🚗</div>
                    <div class="text-xl font-bold text-blue-800">${car.brand}</div>
                    <div class="text-lg text-blue-600">${car.model}</div>
                  </div>
                `;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          {/* Top Badges */}
          <div className="absolute top-3 inset-inline-start-3 flex gap-2">
            <Badge className={cn(
              "px-3 py-1.5 font-bold text-white border-0 shadow-lg",
              car.condition === "New" 
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            )}>
              {getConditionText(car.condition)}
            </Badge>
          </div>

          {/* Price Tag - واضح وبارز وبالإنجليزية دائماً */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <div className="flex items-center gap-2 text-sm opacity-90 mb-1">
                  <Tag className="w-4 h-4" />
                  <span>{t('Price', 'السعر')}</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-white drop-shadow-lg">
                  {/* السعر بالإنجليزية دائماً */}
                  {formatPriceEnglish(car.price)}
                </div>
                {/* تم إزالة سطر "شامل الضريبة" هنا */}
              </div>
              <div className="text-white text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="max-w-[80px] truncate">{car.sellerName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="flex-1 p-5">
          <div className="flex justify-between items-start mb-4">
            <Link to={detailUrl} className="block group-hover:text-blue-600 transition-colors">
              <h3 className="text-xl font-bold leading-tight text-gray-900">
                {car.brand} <span className="font-medium text-gray-600">{car.model}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {car.year} • {car.color || t('Available', 'متوفر')}
              </p>
            </Link>
          </div>

          {/* Key Specs Grid - محسّن */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t('Year', 'سنة الصنع')}</p>
                <p className="text-sm font-bold text-gray-900">{car.year}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Gauge className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t('Mileage', 'المسافة')}</p>
                <p className="text-sm font-bold text-gray-900">
                  {car.mileage === 0 
                    ? t('New', 'جديد') 
                    : `${formatNumber(car.mileage)} ${t('KM', 'كم')}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Fuel className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t('Fuel Type', 'نوع الوقود')}</p>
                <p className="text-sm font-bold text-gray-900">{getFuelTypeText(car.fuelType)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Settings2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t('Transmission', 'ناقل الحركة')}</p>
                <p className="text-sm font-bold text-gray-900">{getTransmissionText(car.transmission)}</p>
              </div>
            </div>
          </div>

          {/* Location - محسّن */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-blue-600">{t('Location', 'الموقع')}</p>
              <p className="text-sm font-medium text-gray-900">{car.location}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex flex-col gap-3">
          <div className="w-full flex gap-2">
            <Button 
              asChild 
              variant="outline" 
              className="flex-1 h-12 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 font-bold text-base shadow-sm"
            >
              <Link to={detailUrl} className="flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                {t('Details', 'التفاصيل الكاملة')}
              </Link>
            </Button>
            
            <Button 
              asChild
              className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all text-base"
            >
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {t('WhatsApp', 'تواصل عبر واتساب')}
              </a>
            </Button>
          </div>
          
          {/* Seller Info */}
          <div className="text-center pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">{t('Seller', 'البائع')}:</span> {car.sellerName}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              {new Date(car.createdAt).toLocaleDateString(language === 'ar' ? 'ar-PS' : 'en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}