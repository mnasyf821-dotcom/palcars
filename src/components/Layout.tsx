import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  Globe, 
  LogOut, 
  Car,  // تغيير من CarFront إلى Car
  Plus
} from "lucide-react";
import { ROUTE_PATHS } from "@/lib/index";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, language, toggleLanguage, dir, isRTL } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
      setIsScrolled(window.scrollY > 20);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader);
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  // القائمة المحدثة
  const navigationItems = [
    { name: t("Home", "الرئيسية"), path: ROUTE_PATHS.HOME },
    { name: t("Inventory", "المعرض"), path: ROUTE_PATHS.CARS },
    { name: t("Sell Your Car", "بيع سيارتك"), path: ROUTE_PATHS.ADD_CAR },
  ];

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            transition-all duration-200 font-medium text-sm
            ${mobile ? "text-lg py-4 border-b border-border/50" : ""}
            ${isActive 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-slate-500 hover:text-blue-600"}
          `}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white border-b border-border shadow-sm"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
{/* Logo Section - الشعار الجديد المعتمد على الصورة */}
          <Link to={ROUTE_PATHS.HOME} className="flex items-center">
            <img 
              src="/logo.png" 
              alt="PalCars Logo" 
              className="h-10 md:h-14 w-auto object-contain transition-transform hover:scale-105" 
            />
          </Link>

          {/* القائمة الوسطى المحدثة (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItems />
          </nav>

          {/* الأزرار الجانبية واللغة */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{language === "en" ? "العربية" : "English"}</span>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align={isRTL ? "start" : "end"}>
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4 ms-0 me-2" />
                    <span>{t("Logout", "تسجيل الخروج")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to={ROUTE_PATHS.AUTH}>{t("Login", "دخول")}</Link>
                </Button>
                {/* تم إضافة text-white هنا لجعل النص أبيض */}
                <Button asChild className="bg-[#0269b8] hover:bg-[#01579b] text-white">
                  <Link to={ROUTE_PATHS.AUTH}>{t("Register", "حساب جديد")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"}>
                <div className="flex flex-col gap-1 pt-10">
                  <NavItems mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow" style={{ paddingTop: `${headerHeight}px` }}>
        {children}
      </main>
    </div>
  );
}