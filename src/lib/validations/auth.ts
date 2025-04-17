import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
    surname: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
      .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
    confirmPassword: z.string(),
    country: z.string().min(1, "Lütfen bir ülke seçin"),
    city: z.string().min(2, "Şehir en az 2 karakter olmalıdır"),
    birthDate: z.string().min(1, "Lütfen doğum tarihinizi seçin"),
    education: z.string().min(1, "Lütfen eğitim durumunuzu seçin"),
    phone: z
      .string()
      .min(10, "Geçerli bir telefon numarası giriniz")
      .regex(/^[0-9+\-() ]+$/, "Geçerli bir telefon numarası giriniz"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
