import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  whatsapp: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-().]{5,}$/.test(val.trim()),
      { message: 'Please enter a valid phone number' }
    ),
  weddingDate: z
    .string()
    .min(1, 'Please select your wedding date')
    .refine(
      (val) => {
        const date = new Date(val)
        return !isNaN(date.getTime()) && date > new Date()
      },
      { message: 'Wedding date must be in the future' }
    ),
  venue: z.string().min(3, 'Please enter your venue or location'),
  message: z
    .string()
    .min(10, 'Please tell me a bit more about your special day (min 10 characters)'),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const resortSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  hotel: z.string().min(2, 'Please enter your hotel or venue name'),
  destination: z.string().min(2, 'Please enter the destination'),
  season: z.string().min(3, 'Please indicate the desired period or season'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please add a brief message (min 10 characters)'),
})

export type ResortFormData = z.infer<typeof resortSchema>
