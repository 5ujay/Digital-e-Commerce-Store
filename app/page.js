import Hero from "./_components/Hero";
import ProductsList from "./_components/ProductsList";

export default function Home() {
  return (
    <div>
      <Hero/>
      
      <div className="p-10 md:px-28 lg:px-48">
      <ProductsList/>
      </div>
    </div>
  );
}
