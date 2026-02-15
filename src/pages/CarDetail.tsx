import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  MapPin,
  User,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Info,
  Zap,
  Palette
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { CarCard } from "@/components/CarCard";
import { SAMPLE_CARS } from "@/data/cars";
import { useLanguage } from "@/hooks/useLanguage";
import { ROUTE_PATHS, getWhatsAppUrl } from "@/lib/index";
import { IMAGES } from "@/assets/images";

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, formatCurrency, isRTL } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const car = useMemo(() => SAMPLE_CARS.find((c) => c.id === id), [id]);

  const galleryImages = useMemo(() => {
    if (!car) return [];
    return [...car.images, IMAGES.INTERIOR_1, IMAGES.INTERIOR_2];
  }, [car]);

  const relatedCars = useMemo(() => {
    if (!car) return [];
    return SAMPLE_CARS.filter(
      (c) => c.id !== car.id && (c.brand === car.brand)
    ).slice(0, 4);
  }, [car]);

  if (!car) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold mb-4">{t("Car not found", "السيارة غير موجودة")}</h1>
          <Link to={ROUTE_PATHS.CARS} className="text-primary hover:underline font-medium">
            {t("Back to listings", "العودة إلى القائمة")}
          </Link>
        </div>
      </Layout>
    );
  }

  const whatsappMessage = t(
    `Hello, I am interested in your ${car.brand} ${car.model} listed on Palestine Car Market.`,
    `مرحباً، أنا مهتم بسيارتك ${car.brand} ${car.model} المعروضة في سوق السيارات الفلسطيني.`
  );
  const whatsappUrl = getWhatsAppUrl(car.sellerPhone, whatsappMessage);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8" dir={isRTL ? "rtl" : "ltr"}>
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to={ROUTE_PATHS.HOME} className="hover:text-primary">{t("Home", "الرئيسية")}</Link>
          <span>/</span>
          <Link to={ROUTE_PATHS.CARS} className="hover:text-primary">{t("Cars", "السيارات")}</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{car.brand} {car.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {/* Gallery */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted border border-border group">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={galleryImages[activeImage]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Specs Grid - الإضافات الجديدة هنا */}
            <div className="bg-card p-6 rounded-2xl border border-border">
              <h2 className="text-xl font-bold mb-6">{t("Technical Specifications", "المواصفات الفنية")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 rounded-xl bg-accent/30 text-center">
                  <Zap className="w-6 h-6 text-[#0269b8] mb-2" />
                  <span className="text-xs text-muted-foreground uppercase font-bold">{t("Engine", "المحرك")}</span>
                  <span className="font-semibold">{car.engine || "---"}</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-accent/30 text-center">
                  <Fuel className="w-6 h-6 text-[#0269b8] mb-2" />
                  <span className="text-xs text-muted-foreground uppercase font-bold">{t("Fuel", "الوقود")}</span>
                  <span className="font-semibold">{t(car.fuelType, car.fuelType)}</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-accent/30 text-center">
                  <Gauge className="w-6 h-6 text-[#0269b8] mb-2" />
                  <span className="text-xs text-muted-foreground uppercase font-bold">{t("Mileage", "المسافة")}</span>
                  <span className="font-semibold">{car.mileage?.toLocaleString()} km</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-accent/30 text-center">
                  <Settings2 className="w-6 h-6 text-[#0269b8] mb-2" />
                  <span className="text-xs text-muted-foreground uppercase font-bold">{t("Gear", "الجير")}</span>
                  <span className="font-semibold">{t(car.transmission, car.transmission === 'Automatic' ? 'أوتوماتيك' : 'يدوي')}</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-accent/30 text-center">
                  <Calendar className="w-6 h-6 text-[#0269b8] mb-2" />
                  <span className="text-xs text-muted-foreground uppercase font-bold">{t("Year", "السنة")}</span>
                  <span className="font-semibold">{car.year}</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-xl bg-accent/30 text-center">
                  <Palette className="w-6 h-6 text-[#0269b8] mb-2" />
                  <span className="text-xs text-muted-foreground uppercase font-bold">{t("Color", "اللون")}</span>
                  <span className="font-semibold">{car.color || "---"}</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-2">{t("Description", "الوصف")}</h3>
                <p className="text-muted-foreground leading-relaxed">{car.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-2xl border border-border sticky top-24 shadow-sm">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-1">{car.brand} {car.model}</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 me-1" />
                  <span>{car.location}</span>
                </div>
                <div className="mt-4 text-3xl font-black text-[#0269b8]">
                  {formatCurrency(car.price)}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t("Condition", "الحالة")}</span>
                  <span className="font-medium">{t(car.condition, car.condition === 'New' ? 'جديد' : 'مستعمل')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t("Engine Size", "سعة المحرك")}</span>
                  <span className="font-medium">{car.engine}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{t("Fuel Type", "نوع الوقود")}</span>
                  <span className="font-medium">{t(car.fuelType, car.fuelType)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg">
                  <MessageCircle className="w-5 h-5" /> {t("WhatsApp", "واتساب")}
                </a>
                <a href={`tel:${car.sellerPhone}`} 
                   className="flex items-center justify-center gap-2 w-full py-4 bg-[#0269b8] text-white rounded-xl font-bold shadow-lg">
                  <Phone className="w-5 h-5" /> {t("Call Seller", "اتصال بالبائع")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}