import Header from '@/components/Header';
import SmoothMotion from '@/components/SmoothMotion';
import Hero from '@/components/Hero';
import TrustStats from '@/components/TrustStats';
import ProductsSection from '@/components/ProductsSection';
import ExperienceSection from '@/components/ExperienceSection';
import SupplierNetwork from '@/components/SupplierNetwork';
import DifferenceSection from '@/components/DifferenceSection';
import DeliveryProcess from '@/components/DeliveryProcess';
import TradeBridge from '@/components/TradeBridge';
import InquirySection from '@/components/InquirySection';
import Footer from '@/components/Footer';
import ValuesSection from '@/components/ValuesSection';
import EnquiryModal from '@/components/EnquiryModal';

export default function HomePage() {
  return (
    <>
      <SmoothMotion />
      <Header />
      <main>
        <Hero />
        <TrustStats />
        <ProductsSection />
        <ExperienceSection />
        <SupplierNetwork />
        <DifferenceSection />
        <DeliveryProcess />
        <TradeBridge />
        <ValuesSection />
        <InquirySection />
      </main>
      <Footer />
      <EnquiryModal />
    </>
  );
}
