import Header from "@/components/header";
import Pricing from "@/components/pricing";

const PricingPage = () => {
  return (
    <div className="bg-background-dark text-slate-100 font-display antialiased overflow-x-hidden selection:bg-primary selection:text-background-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        <Header />
        <Pricing />
      </div>
    </div>
  );
};

export default PricingPage;
