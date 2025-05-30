"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success("Giriş başarılı!");
        router.push("/");
      } else {
        toast.error(result.error || "Giriş başarısız");
      }
    } catch (error) {
      toast.error("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-red-900 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
            Giriş Yap
          </h2>
          <p className="mt-2 text-gray-400">
            Hesabınız yok mu?{" "}
            <Link
              href="/register"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Kayıt olun
            </Link>
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                E-posta
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                className="mt-1 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="ornek@email.com"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                className="mt-1 bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900/50 text-gray-400">veya</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full bg-gray-800 hover:bg-gray-700 border-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google ile Devam Et
            </Button>
            <Button
              variant="outline"
              className="w-full bg-gray-800 hover:bg-gray-700 border-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              <FaGithub className="h-5 w-5 mr-2" />
              GitHub ile Devam Et
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
