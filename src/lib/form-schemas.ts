import { z } from "zod";

/* ============ Helpers ============ */

// Aceita formatos comuns: "(41) 99999-9999", "41999999999", "+55 41 9999-9999"
// Exige 10 ou 11 dígitos (DDD + número fixo/celular)
const phoneRegex = /^[\d\s().+-]{10,20}$/;
const phoneDigitsOnly = (v: string) => v.replace(/\D/g, "");

// CNPJ formato simples: 14 dígitos (com ou sem máscara)
const cnpjOptional = z
  .string()
  .trim()
  .max(20, "CNPJ muito longo")
  .refine(
    (v) => v === "" || phoneDigitsOnly(v).length === 14,
    "CNPJ deve ter 14 dígitos",
  )
  .optional()
  .or(z.literal(""));

// Placa Mercosul (ABC1D23) ou antiga (ABC-1234 / ABC1234)
const placaRegex = /^[A-Z]{3}-?\d[A-Z\d]\d{2}$/i;

const phoneSchema = z
  .string()
  .trim()
  .nonempty("Telefone é obrigatório")
  .max(20, "Telefone muito longo")
  .regex(phoneRegex, "Telefone inválido")
  .refine((v) => {
    const d = phoneDigitsOnly(v);
    return d.length >= 10 && d.length <= 11;
  }, "Telefone deve ter DDD + número (10 ou 11 dígitos)");

const requiredString = (label: string, max = 100) =>
  z
    .string()
    .trim()
    .nonempty(`${label} é obrigatório`)
    .max(max, `${label} deve ter no máximo ${max} caracteres`);

/* ============ Quero Contratar ============ */

export const queroContratarSchema = z.object({
  empresa: requiredString("Nome da empresa", 120),
  categoria: requiredString("Categoria", 50),
  cnpj: cnpjOptional,
  responsavel: requiredString("Responsável", 100),
  telefone: phoneSchema,
  cidade: requiredString("Cidade", 80),
  bairro: requiredString("Bairro", 80),
  endereco: requiredString("Endereço", 200),
  retirada: z.string().trim().max(200, "Endereço de retirada muito longo").optional(),
  entrega: z.string().trim().max(200, "Endereço de entrega muito longo").optional(),
  tipoPedido: z.string().trim().max(50).optional(),
  tipoPagamento: requiredString("Tipo de pagamento", 30),
  valor: z
    .string()
    .trim()
    .nonempty("Valor é obrigatório")
    .refine((v) => {
      const n = Number(v.replace(",", "."));
      return !Number.isNaN(n) && n > 0;
    }, "Valor deve ser maior que zero")
    .refine((v) => Number(v.replace(",", ".")) <= 100000, "Valor muito alto"),
  urgente: z.boolean(),
  observacoes: z
    .string()
    .trim()
    .max(1000, "Observações devem ter no máximo 1000 caracteres")
    .optional(),
});

export type QueroContratarData = z.infer<typeof queroContratarSchema>;

/* ============ Sou Motoboy ============ */

export const souMotoboySchema = z
  .object({
    nome: requiredString("Nome completo", 120),
    telefone: phoneSchema,
    cidade: requiredString("Cidade", 80),
    bairro: requiredString("Bairro", 80),
    cnh: z
      .string()
      .trim()
      .max(20, "CNH muito longa")
      .optional()
      .or(z.literal("")),
    moto: requiredString("Modelo da moto", 80),
    placa: z
      .string()
      .trim()
      .max(10, "Placa muito longa")
      .refine(
        (v) => v === "" || placaRegex.test(v),
        "Placa inválida (ex: ABC-1D23)",
      )
      .optional()
      .or(z.literal("")),
    bag: z.boolean(),
    raioKm: z
      .string()
      .trim()
      .optional()
      .refine((v) => {
        if (!v) return true;
        const n = Number(v);
        return Number.isInteger(n) && n >= 1 && n <= 100;
      }, "Raio deve ser entre 1 e 100 km"),
    tipoPagamento: requiredString("Forma de cobrança", 30),
    valorMinimo: z
      .string()
      .trim()
      .nonempty("Valor mínimo é obrigatório")
      .refine((v) => {
        const n = Number(v.replace(",", "."));
        return !Number.isNaN(n) && n > 0;
      }, "Valor deve ser maior que zero")
      .refine((v) => Number(v.replace(",", ".")) <= 10000, "Valor muito alto"),
    horarioInicio: z
      .string()
      .nonempty("Horário de início é obrigatório")
      .regex(/^\d{2}:\d{2}$/, "Horário inválido"),
    horarioFim: z
      .string()
      .nonempty("Horário de fim é obrigatório")
      .regex(/^\d{2}:\d{2}$/, "Horário inválido"),
    disponibilidade: z
      .array(z.string())
      .min(1, "Selecione ao menos um período de disponibilidade"),
  })
  .refine((data) => data.horarioInicio !== data.horarioFim, {
    message: "Horário de início e fim não podem ser iguais",
    path: ["horarioFim"],
  });

export type SouMotoboyData = z.infer<typeof souMotoboySchema>;

/* ============ Helpers de erro ============ */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export const formatZodErrors = <T extends string>(
  err: z.ZodError,
): FieldErrors<T> => {
  const out: FieldErrors<T> = {};
  for (const issue of err.issues) {
    const key = issue.path[0] as T | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
};
