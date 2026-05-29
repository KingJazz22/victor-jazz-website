import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'
import TrustSection from '@/components/sections/TrustSection'

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
      <VideoGallerySection />
      <PhotoShowcaseSection />
      <VideoReviewsSection />
      <ExperienceSection />
      <PricingSection />
      <DestinationsSection />
      <TestimonialsSection />
      <FAQSection />
      <InstagramSection />
      <ContactSection />
    </>
  )
}
