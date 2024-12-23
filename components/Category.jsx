import Link from "next/link";
const products = [
  {
    id: 1,
    name: "Shades",
    href: "#",
    price: "$35",
    imageSrc: "/img/shades.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },

  {
    id: 3,
    name: "Rings",
    href: "#",
    price: "$35",
    imageSrc: "/img/hand-rings.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 4,
    name: "Caps",
    href: "#",
    price: "$35",
    imageSrc: "/img/cap.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Neckpieces",
    href: "#",
    price: "$35",
    imageSrc: "/img/chain.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 6,
    name: "Tees",
    href: "#",
    price: "$35",
    imageSrc: "/img/tees-compressed.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 7,
    name: "Coats",
    href: "#",
    price: "$35",
    imageSrc: "/img/vivek-sharma.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
  id: 8,
  name: "Jackets",
  href: "#",
  price: "$35",
  imageSrc: "/img/jackets-compressed.jpg",
  imageAlt:
    "Hand holding black machined steel mechanical pencil with brass tip and top.",
},
{
  id: 10,
  name: "Bags",
  href: "#",
  price: "$35",
  imageSrc: "/img/bags.jpg",
  imageAlt:
    "Hand holding black machined steel mechanical pencil with brass tip and top.",
},
{
  id: 11,
  name: "Footwears",
  href: "#",
  price: "$35",
  imageSrc: "/img/footwear.jpg",
  imageAlt:
    "Hand holding black machined steel mechanical pencil with brass tip and top.",
},

{
  id: 12,
  name: "Jeans",
  href: "#",
  price: "$35",
  imageSrc: "/img/jeans-compressed.jpg",
  imageAlt:
    "Hand holding black machined steel mechanical pencil with brass tip and top.",
},



];

export default function Category() {
  return (
     <div className=" " style={{backgroundColor:"#FAF9F6"}}>
       <div className="px-4 mx-auto  sm:py-24  max-w-[80rem] lg:px-8">
         <h4 style={{fontFamily:'Poppins, sans-serif'}} className="text-2xl text-center mb-4 sm:mb-16">Shop by category</h4> <br />
          <div style={{fontFamily:'Poppins, sans-serif'}} className="grid grid-cols-2 gap-y-8 lg:gap-y-16  text-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-5">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                  />
                </div>

                <Link
                href={'/products'}
                  type="button"
                  className="text-gray-900 mt-4 hover:text-dark underline hover:text-black font-medium  text-lg  text-center mr-2 mb-2 "
                >
                  Shop {product.name}
                </Link>
              </a>
            ))}
          </div>
       </div>
     </div>

 
  );
}
