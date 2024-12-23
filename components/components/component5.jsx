import styles from "../../styles/component5.module.css";
import CarouselWrapper from "../../components/CarouselWrapper";
import BrandCard from "../../components/brand-card"

const products = [
    {
      id: 1,
      name: "Pandora",
      href: "#",
      imageSrc: "/img/lauren-grogan-e46hyCWI73c-unsplash.jpg",
      details:
        "Jewelleries for everyone.",
    },
    {
      id: 2,
      name: "Jansport",
      href: "#",
      imageSrc: "/img/pexels-luis-quintero-3731256.jpg",
      details:
        "Quality collection of backpacks, bags, totes, and accessories.",
    },
    {
      id: 3,
      name: "Defacto",
      href: "#",
      imageSrc: "/img/natalie-hua.jpg",
      details:
        "Day to day, basic wears.",
    },
    {
        id: 4,
        name: "Defacto",
        href: "#",
        imageSrc: "/img/natalie-hua.jpg",
        details:
          "Day to day, basic wears.",
      },
      {
        id: 5,
        name: "Defacto",
        href: "#",
        imageSrc: "/img/natalie-hua.jpg",
        details:
          "Day to day, basic wears.",
      },
];
const imgs = [1, 2, 3, 4];
const productss = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const carouselBreakpoints = {
  640: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 30,
  },
};
export default function sponsored() {
    return (
        <>
 <section className="mt-5 trending">
        <h1 className="pt-10 text-3xl text-center capitalize">Sponsored Brands</h1>
<br />
          <CarouselWrapper
            
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={carouselBreakpoints}
            controls
            alt=""
          >
            {products.map((id) => {
              return <BrandCard key={id} id={id} />;
            })}
          </CarouselWrapper>
        </section>

        </>
    );
};