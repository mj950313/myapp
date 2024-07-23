import { useEffect, useState } from "react";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import { CiWarning } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  new: boolean;
  category: string;
}

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "전체"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const getTitleProps = (category: string) => {
    switch (category) {
      case "전체":
        return { title: "All Products", title2: "모든 상품들을 만나보세요" };
      case "바다":
        return {
          title: "SALT WATER",
          title2: "바다 낚시 상품들을 만나보세요",
        };
      case "민물":
        return {
          title: "FRESH WATER",
          title2: "민물 낚시 상품들을 만나보세요",
        };
      case "루어":
        return {
          title: "Lure Products",
          title2: "루어 낚시 상품들을 만나보세요",
        };
      case "낚시용품":
        return {
          title: "Fishing Accessories",
          title2: "낚시용품을 만나보세요",
        };
      default:
        return {
          title: "All Products",
          title2: "모든 상품들을 만나보세요",
        };
    }
  };

  const titleProps = getTitleProps(selectedCategory);

  return (
    <div className="bg-[url('/product.png')] bg-repeat-x bg-blend-multiply bg-blue-300">
      <div className="flex flex-col gap-3 xl:w-[1280px] mx-auto px-3 xl:px-8 py-28 xl:py-48">
        <h1 className="text-white text-4xl xl:text-5xl font-bold">
          Products <br />
        </h1>
        <p className="text-white text-xl xl:text-2xl">상품별</p>
      </div>

      <div className="border bg-white">
        <div className="xl:w-[1280px] mx-auto px-3 xl:px-8 my-10">
          <div className="flex gap-8 mb-8 text-lg xl:text-2xl">
            <button
              className={`${
                selectedCategory === "전체" ? "text-blue-500" : "text-black"
              }`}
              onClick={() => setSelectedCategory("전체")}
            >
              전체
            </button>
            <button
              className={`${
                selectedCategory === "바다" ? "text-blue-500" : "text-black"
              }`}
              onClick={() => setSelectedCategory("바다")}
            >
              바다
            </button>
            <button
              className={`${
                selectedCategory === "민물" ? "text-blue-500" : "text-black"
              }`}
              onClick={() => setSelectedCategory("민물")}
            >
              민물
            </button>
            <button
              className={`${
                selectedCategory === "루어" ? "text-blue-500" : "text-black"
              }`}
              onClick={() => setSelectedCategory("루어")}
            >
              루어
            </button>
            <button
              className={`${
                selectedCategory === "낚시용품" ? "text-blue-500" : "text-black"
              }`}
              onClick={() => setSelectedCategory("낚시용품")}
            >
              낚시용품
            </button>
          </div>

          <Title title={titleProps.title} title2={titleProps.title2} />

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[600px]">
              <p className="text-black text-xl font-semibold flex flex-col items-center">
                <CiWarning className="text-blue-500 text-4xl" />
                판매중인 상품이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
