import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  partnerName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  whatsapp: z.string().optional(),
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
  source: z.enum(['instagram', 'google', 'blog', 'friend', 'other'], {
    errorMap: () => ({ message: 'Please select how you found us' }),
  }),
  message: z
    .string()
    .min(20, 'Please tell me a bit more about your special day (min 20 characters)'),
})

export type ContactFormData = z.infer<typeof contactSchema>
