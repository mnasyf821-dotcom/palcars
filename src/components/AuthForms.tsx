import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock, User, Phone } from "lucide-react";

interface AuthFormProps { onSuccess?: () => void; }

export function LoginForm({ onSuccess }: AuthFormProps) {
  const { login, isLoading } = useAuth();
  const { t, dir } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(t("Invalid credentials", "البريد الإلكتروني أو كلمة المرور غير صحيحة"));
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent" dir={dir}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 text-right">
          <Label>{t("Email", "البريد الإلكتروني")}</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2 text-right">
          <div className="flex justify-between items-center mb-1">
            <button type="button" className="text-sm text-[#0269b8] hover:underline">{t("Forgot?", "نسيت؟")}</button>
            <Label>{t("Password", "كلمة المرور")}</Label>
          </div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        <Button type="submit" className="w-full h-12 bg-[#0269b8] hover:bg-[#015494] text-lg font-bold" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : t("Sign In", "تسجيل الدخول")}
        </Button>
      </form>
    </Card>
  );
}

export function RegisterForm({ onSuccess }: AuthFormProps) {
  const { register, isLoading } = useAuth();
  const { t, dir } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(t("Registration failed", "فشل التسجيل، يرجى المحاولة لاحقاً"));
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent" dir={dir}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder={t("Name", "الاسم")} className="text-right" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <Input placeholder={t("Email", "البريد")} type="email" className="text-right" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <Input placeholder={t("Phone", "الهاتف")} className="text-right" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
        <Input placeholder={t("Password", "كلمة المرور")} type="password" className="text-right" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full h-12 bg-[#0269b8] hover:bg-[#015494] text-lg font-bold" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : t("Register", "إنشاء حساب")}
        </Button>
      </form>
    </Card>
  );
}