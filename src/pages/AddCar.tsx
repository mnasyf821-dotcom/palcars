import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Camera, X, ChevronRight, CheckCircle2
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  PALESTINIAN_CITIES, 
  CAR_BRANDS, 
  ROUTE_PATHS 
} from "@/lib/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// 1. تعريف جميع الحقول الجديدة في الـ Schema
const carSchema = z.object({
  brand: z.string().min(1, "العلامة التجارية مطلوبة"),
  model: z.string().min(1, "الطراز مطلوب"),
  year: z.string().min(1, "السنة مطلوبة"),
  price: z.string().min(1, "السعر مطلوب"),
  mileage: z.string().min(1, "المسافة المقطوعة مطلوبة"),
  engine: z.string().min(1, "حجم المحرك مطلوب"),
  transmission: z.string().min(1, "ناقل الحركة مطلوب"),
  fuelType: z.string().min(1, "نوع الوقود مطلوب"),
  color: z.string().min(1, "اللون مطلوب"),
  location: z.string().min(1, "المدينة مطلوبة"),
  sellerPhone: z.string().min(7, "رقم الهاتف مطلوب"),
  description: z.string().optional(),
});

type CarFormData = z.infer<typeof carSchema>;

export default function AddCar() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: "", model: "", year: "", price: "", mileage: "", 
      engine: "", transmission: "", fuelType: "", color: "", 
      location: "", sellerPhone: "", description: ""
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  };

  const onSubmit = async (data: CarFormData) => {
    if (images.length === 0) {
      toast.error(t("Please upload at least one image", "يرجى تحميل صورة واحدة على الأقل"));
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("بيانات الإعلان الجديدة:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success(t("Listing created successfully!", "تم إنشاء الإعلان بنجاح!"));
    } catch (error) {
      toast.error(t("Error", "حدث خطأ أثناء النشر"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <CheckCircle2 className="w-20 h-20 text-emerald-600 mb-6" />
          <h1 className="text-3xl font-bold mb-4">{t("Listing Posted!", "تم نشر الإعلان!")}</h1>
          <Button onClick={() => navigate(ROUTE_PATHS.CARS)} className="bg-[#0269b8] px-8 h-12 text-white">
            {t("Go to Marketplace", "الذهاب إلى السوق")}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4" dir={isRTL ? "rtl" : "ltr"}>
        <h1 className="text-4xl font-bold text-center mb-10 text-[#0269b8]">{t("Sell Your Car", "بيع سيارتك")}</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* صور المركبة */}
          <Card className="border-dashed border-2 bg-muted/30 p-6">
             <Label className="text-lg font-semibold mb-4 block text-right">{t("Vehicle Images", "صور المركبة")}</Label>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((src, idx) => (
                  <div key={idx} className="relative aspect-square">
                    <img src={src} className="w-full h-full object-cover rounded-xl" />
                  </div>
                ))}
                {images.length < 6 && (
                  <label className="cursor-pointer aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-all">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
             </div>
          </Card>

          {/* تفاصيل السيارة الأساسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="block text-right">{t("Make", "الماركة")}</Label>
              <Controller name="brand" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange}><SelectTrigger className="text-right h-12"><SelectValue placeholder="اختر الماركة" /></SelectTrigger>
                <SelectContent>{CAR_BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
              )} />

              <Label className="block text-right">{t("Model", "الموديل")}</Label>
              <Input className="text-right h-12" placeholder="مثلاً: Golf" {...register("model")} />

              <Label className="block text-right">{t("Year", "السنة")}</Label>
              <Input className="text-right h-12" type="number" placeholder="2024" {...register("year")} />

              <Label className="block text-right">{t("Price", "السعر")}</Label>
              <Input className="text-right h-12" type="number" placeholder="شيكل" {...register("price")} />
            </div>

            <div className="space-y-4">
              <Label className="block text-right">{t("Mileage", "المسافة المقطوعة")}</Label>
              <Input className="text-right h-12" placeholder="كم" {...register("mileage")} />

              <Label className="block text-right">{t("Engine CC", "المحرك CC")}</Label>
              <Input className="text-right h-12" placeholder="مثلاً: 2000 توربو" {...register("engine")} />

              <Label className="block text-right">{t("Color", "اللون")}</Label>
              <Input className="text-right h-12" placeholder="لون السيارة" {...register("color")} />

              <Label className="block text-right">{t("Location", "المدينة")}</Label>
              <Controller name="location" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange}><SelectTrigger className="text-right h-12"><SelectValue placeholder="اختر المدينة" /></SelectTrigger>
                <SelectContent>{PALESTINIAN_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
              )} />
            </div>
          </div>

          {/* خيارات الوقود والجير */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="block text-right">{t("Transmission", "ناقل الحركة")}</Label>
              <Controller name="transmission" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange}><SelectTrigger className="text-right h-12"><SelectValue placeholder="نوع الجير" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">أتوماتيك</SelectItem>
                  <SelectItem value="Manual">يدوي (عادي)</SelectItem>
                </SelectContent></Select>
              )} />
            </div>
            <div className="space-y-4">
              <Label className="block text-right">{t("Fuel Type", "نوع الوقود")}</Label>
              <Controller name="fuelType" control={control} render={({ field }) => (
                <Select onValueChange={field.onChange}><SelectTrigger className="text-right h-12"><SelectValue placeholder="نوع الوقود" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gasoline">بنزين</SelectItem>
                  <SelectItem value="Diesel">ديزل</SelectItem>
                  <SelectItem value="Hybrid">هايبرد</SelectItem>
                  <SelectItem value="Electric">كهرباء</SelectItem>
                </SelectContent></Select>
              )} />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="block text-right">{t("Phone", "رقم الهاتف للتواصل")}</Label>
            <Input className="text-right h-12" {...register("sellerPhone")} placeholder="059xxxxxxx" />

            <Label className="block text-right">{t("Description", "وصف إضافي")}</Label>
            <Textarea className="text-right min-h-[100px]" {...register("description")} placeholder="أية تفاصيل أخرى..." />
          </div>

          <Button type="submit" className="w-full h-14 bg-[#0269b8] hover:bg-[#015494] text-white text-xl font-bold shadow-xl" disabled={isSubmitting}>
            {isSubmitting ? "جاري النشر..." : t("Post Car Ad", "نشر إعلان السيارة")}
          </Button>
        </form>
      </div>
    </Layout>
  );
}