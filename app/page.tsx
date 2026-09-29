import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import TrustSection from '@/components/sections/TrustSection'
import HydrateOnVisible from '@/components/ui/HydrateOnVisible'

const VideoGallerySection  = dynamic(() => import('@/components/sections/VideoGallerySection'))
const PhotoShowcaseSection = dynamic(() => import('@/components/sections/PhotoShowcaseSection'))
const VideoReviewsSection  = dynamic(() => import('@/components/sections/VideoReviewsSection'))
const ExperienceSection    = dynamic(() => import('@/components/sections/ExperienceSection'))
const PricingSection       = dynamic(() => import('@/components/sections/PricingSection'))
const DestinationsSection  = dynamic(() => import('@/components/sections/DestinationsSection'))
const TestimonialsSection  = dynamic(() => import('@/components/sections/TestimonialsSection'))
const FAQSection           = dynamic(() => import('@/components/sections/FAQSection'))
const InstagramSection     = dynamic(() => import('@/components/sections/InstagramSection'))
const ContactSection       = dynamic(() => import('@/components/sections/ContactSection'))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <HydrateOnVisible id="gallery"><VideoGallerySection /></HydrateOnVisible>
      <HydrateOnVisible id="reviews"><VideoReviewsSection /></HydrateOnVisible>
      <HydrateOnVisible id="photos"><PhotoShowcaseSection /></HydrateOnVisible>
      <HydrateOnVisible id="experience"><ExperienceSection /></HydrateOnVisible>
      <HydrateOnVisible id="pricing"><PricingSection /></HydrateOnVisible>
      <HydrateOnVisible id="destinations"><DestinationsSection /></HydrateOnVisible>
      <HydrateOnVisible id="testimonials"><TestimonialsSection /></HydrateOnVisible>
      <HydrateOnVisible id="faq"><FAQSection /></HydrateOnVisible>
      <HydrateOnVisible id="instagram"><InstagramSection /></HydrateOnVisible>
      <HydrateOnVisible id="contact"><ContactSection /></HydrateOnVisible>
    </>
  )
}
