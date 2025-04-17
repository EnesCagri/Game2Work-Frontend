"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  surname: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  country: z.string().min(1, "Lütfen bir ülke seçin"),
  city: z.string().min(2, "Şehir en az 2 karakter olmalıdır"),
  birthDate: z.string().min(1, "Lütfen doğum tarihinizi seçin"),
  education: z.string().min(1, "Lütfen eğitim durumunuzu seçin"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz")
    .regex(/^[0-9+\-() ]+$/, "Geçerli bir telefon numarası giriniz"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileSetupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      surname: "",
      country: "",
      city: "",
      birthDate: "",
      education: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement profile update logic
      toast.success("Profil bilgileri kaydedildi!");
      router.push("/register/roles"); // Redirect to role selection
    } catch (error) {
      toast.error("Profil güncellenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl space-y-8 p-8 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 shadow-2xl"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
            Profil Bilgileri
          </h2>
          <p className="mt-2 text-gray-400">
            Lütfen profil bilgilerinizi doldurun
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Ad</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="Adınız"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Soyad</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="Soyadınız"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Ülke</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500">
                          <SelectValue placeholder="Ülke seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="tr">Türkiye</SelectItem>
                        <SelectItem value="us">
                          Amerika Birleşik Devletleri
                        </SelectItem>
                        <SelectItem value="gb">Birleşik Krallık</SelectItem>
                        <SelectItem value="de">Almanya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Şehir</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="Şehriniz"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Doğum Tarihi
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Eğitim Durumu
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500">
                          <SelectValue placeholder="Eğitim durumu seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="highschool">Lise</SelectItem>
                        <SelectItem value="bachelor">Lisans</SelectItem>
                        <SelectItem value="master">Yüksek Lisans</SelectItem>
                        <SelectItem value="phd">Doktora</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-gray-300">
                      Telefon Numarası
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                        placeholder="+90 555 555 55 55"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Kaydediliyor..." : "Devam Et"}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
