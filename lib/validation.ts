import { z } from "zod";

const phoneRegex = /^[+0-9()\-\s]{7,20}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(phoneRegex),
  city: z.string().trim().min(2).max(80),
  source: z.string().trim().max(40).optional(),
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(phoneRegex),
  company: z.string().trim().min(2).max(120),
  bookingDate: z.string().regex(dateRegex),
  bookingTime: z.string().regex(timeRegex),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
