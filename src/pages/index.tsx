import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { CarCard } from '@/components/CarCard';
import { SimpleSearchBar } from '@/components/SearchFilters'; 
import { SAMPLE_CARS } from '@/data/cars';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTE_PATHS, CarFilters } from '@/lib/index';
import { springPresets, fadeInUp, staggerContainer } from '@/lib/motion';
import { Button } from '@/components/ui/button';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [filters, setFilters] = useState<CarFilters>({
    query: '',
    brand: '',
    condition: 'All',
    location: '',
  });

  const featuredCars = SAMPLE_CARS.slice(0, 4);

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if (filters.query) params.append('query', filters.query);
    navigate(`${ROUTE_PATHS.CARS}?${params.toString()}`);
  };

  const handleViewAllCars = () => {
    navigate(ROUTE_PATHS.CARS);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden text-center">
        
        {/* خلفية الصورة */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://4kwallpapers.com/images/walls/thumbs_3t/11125.jpeg?q=80&w=2070&auto=format&fit=crop" 
            alt="Studio Car" 
            className="w-full h-full object-cover"
          />
          {/* طبقة تظليل */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.gentle}
            className="text-sm" // تصغير جميع النصوص داخل هذا القسم
          >
            {/* البادج - تصغير */}
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-white uppercase bg-[#0269b8] backdrop-blur-md rounded-full shadow">
              {t('The Largest Car Marketplace in Palestine', 'أكبر سوق للسيارات في فلسطين')}
            </span>
            
            {/* العنوان الرئيسي - تصغير */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              {t('Find Your Perfect Car', 'جد سيارتك المثالية')} <span className="text-blue-300">{t('Today', 'اليوم')}</span>
            </h1>
            
            {/* الوصف - تصغير */}
            <p className="text-base text-white/90 mb-8 max-w-xl mx-auto drop-shadow">
              {t('Browse thousands of certified cars across Palestine.', 'تصفح آلاف السيارات المضمونة في جميع أنحاء فلسطين.')}
            </p>
          </motion.div>

          {/* شريط البحث - تصغير */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springPresets.snappy, delay: 0.2 }}
            className="w-full max-w-2xl mx-auto scale-90" // تصغير الحجم
          >
            <SimpleSearchBar 
              filters={filters} 
              onFiltersChange={setFilters}
              onSearch={handleSearchClick}
            />
          </motion.div>

          {/* زر عرض السيارات - تصغير */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Button
              onClick={handleViewAllCars}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0269b8] hover:bg-[#025aa5] text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-white scale-95" // تصغير الحجم
            >
              <Car className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span>{t('View All Cars', 'عرض جميع السيارات')}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings - قسم السيارات المميزة */}
      <section className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t('Featured Listings', 'إعلانات مميزة')}</h2>
              <p className="text-slate-500 text-sm">{t('Explore the best deals available right now', 'استكشف أفضل العروض المتاحة الآن')}</p>
            </div>
            <Link to={ROUTE_PATHS.CARS} className="flex items-center gap-2 text-[#0269b8] font-semibold text-sm">
              {t('View All', 'عرض الكل')} <ArrowRight className="w-3 h-3 rtl:rotate-180" />
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-right"
          >
            {featuredCars.map((car) => (
              <motion.div key={car.id} variants={fadeInUp} className="scale-95"> {/* تصغير بطاقات السيارات */}
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}