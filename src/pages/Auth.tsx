import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { LoginForm, RegisterForm } from "@/components/AuthForms";
import { useLanguage } from "@/hooks/useLanguage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTE_PATHS } from "@/lib/index";
import { toast } from "sonner";

export default function Auth() {
  const { t, isRTL } = useLanguage();

  /**
   * دالة النجاح: تُستدعى من نماذج الدخول والتسجيل
   * تستخدم الحل الجذري بـ window.location لكسر تعليق الصفحة
   */
  const handleAuthSuccess = () => {
    toast.success(t("Welcome back!", "مرحباً بك مجدداً!"));
    
    // تأخير بسيط لضمان انتهاء تخزين بيانات المستخدم (Token)
    setTimeout(() => {
      // استخدام href بدلاً من navigate يجبر المتصفح على قراءة حالة isAuthenticated الجديدة
      window.location.href = ROUTE_PATHS.ADD_CAR;
    }, 500); 
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t("Welcome", "مرحباً بك")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("Your gateway to the best car deals", "بوابتك لأفضل عروض السيارات")}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            <Tabs defaultValue="login" className="w-full" dir={isRTL ? "rtl" : "ltr"}>
              <TabsList className="grid w-full grid-cols-2 rounded-none h-14 bg-muted/50">
                <TabsTrigger 
                  value="login" 
                  className="text-white font-medium data-[state=active]:bg-card data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-[#0269b8] rounded-none"
                >
                  {t("Login", "تسجيل الدخول")}
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="text-base font-medium data-[state=active]:bg-card data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-[#0269b8] rounded-none"
                >
                  {t("Register", "إنشاء حساب")}
                </TabsTrigger>
              </TabsList>

              <div className="p-6 sm:p-8">
                <TabsContent value="login" className="mt-0 outline-none">
                  <LoginForm onSuccess={handleAuthSuccess} />
                </TabsContent>
                <TabsContent value="register" className="mt-0 outline-none">
                  <RegisterForm onSuccess={handleAuthSuccess} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}