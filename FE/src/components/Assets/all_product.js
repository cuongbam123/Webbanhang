import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";

// ... existing code ...
let all_product = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "dien-thoai",
    image: p1_img,
    new_price: 999.0,
    old_price: 1099.0,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    category: "dien-thoai",
    image: p2_img,
    new_price: 1199.0,
    old_price: 1299.0,
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    category: "dien-thoai",
    image: p3_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    category: "laptop",
    image: p4_img,
    new_price: 1999.0,
    old_price: 2199.0,
  },
  {
    id: 5,
    name: "Dell XPS 15",
    category: "laptop",
    image: p5_img,
    new_price: 1799.0,
    old_price: 1999.0,
  },
  {
    id: 6,
    name: "Lenovo ThinkPad X1",
    category: "laptop",
    image: p6_img,
    new_price: 1599.0,
    old_price: 1799.0,
  },
  {
    id: 7,
    name: "AirPods Pro 2",
    category: "phu-kien",
    image: p7_img,
    new_price: 249.0,
    old_price: 299.0,
  },
  {
    id: 8,
    name: "Samsung Galaxy Watch 6",
    category: "phu-kien",
    image: p8_img,
    new_price: 349.0,
    old_price: 399.0,
  },
  {
    id: 9,
    name: "iPhone 15",
    category: "dien-thoai",
    image: p9_img,
    new_price: 799.0,
    old_price: 899.0,
  },
  {
    id: 10,
    name: "Samsung Galaxy S24",
    category: "dien-thoai",
    image: p10_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 11,
    name: "MacBook Air M2",
    category: "laptop",
    image: p11_img,
    new_price: 1299.0,
    old_price: 1499.0,
  },
  {
    id: 12,
    name: "HP Spectre x360",
    category: "laptop",
    image: p12_img,
    new_price: 1399.0,
    old_price: 1599.0,
  },
  {
    id: 13,
    name: "Apple Watch Series 9",
    category: "phu-kien",
    image: p13_img,
    new_price: 399.0,
    old_price: 449.0,
  },
  {
    id: 14,
    name: "Sony WH-1000XM5",
    category: "phu-kien",
    image: p14_img,
    new_price: 399.0,
    old_price: 449.0,
  },
  {
    id: 15,
    name: "Google Pixel 8 Pro",
    category: "dien-thoai",
    image: p15_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 16,
    name: "OnePlus 12",
    category: "dien-thoai",
    image: p16_img,
    new_price: 799.0,
    old_price: 899.0,
  },
  {
    id: 17,
    name: "ASUS ROG Zephyrus",
    category: "laptop",
    image: p17_img,
    new_price: 1999.0,
    old_price: 2199.0,
  },
  {
    id: 18,
    name: "MSI Stealth 16",
    category: "laptop",
    image: p18_img,
    new_price: 1899.0,
    old_price: 2099.0,
  },
  {
    id: 19,
    name: "Jabra Elite 85t",
    category: "phu-kien",
    image: p19_img,
    new_price: 229.0,
    old_price: 279.0,
  },
  {
    id: 20,
    name: "Samsung Galaxy Buds2 Pro",
    category: "phu-kien",
    image: p20_img,
    new_price: 229.0,
    old_price: 279.0,
  },
  {
    id: 21,
    name: "Nothing Phone 2",
    category: "dien-thoai",
    image: p21_img,
    new_price: 599.0,
    old_price: 699.0,
  },
  {
    id: 22,
    name: "ASUS Zenfone 10",
    category: "dien-thoai",
    image: p22_img,
    new_price: 699.0,
    old_price: 799.0,
  },
  {
    id: 23,
    name: "Motorola Razr 40",
    category: "dien-thoai",
    image: p23_img,
    new_price: 999.0,
    old_price: 1099.0,
  },
  {
    id: 24,
    name: "Vivo X100 Pro",
    category: "dien-thoai",
    image: p24_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 25,
    name: "Acer Swift 5",
    category: "laptop",
    image: p25_img,
    new_price: 1299.0,
    old_price: 1499.0,
  },
  {
    id: 26,
    name: "Microsoft Surface Laptop 5",
    category: "laptop",
    image: p26_img,
    new_price: 1599.0,
    old_price: 1799.0,
  },
  {
    id: 27,
    name: "Razer Blade 15",
    category: "laptop",
    image: p27_img,
    new_price: 2499.0,
    old_price: 2699.0,
  },
  {
    id: 28,
    name: "Alienware x17",
    category: "laptop",
    image: p28_img,
    new_price: 2999.0,
    old_price: 3299.0,
  },
  {
    id: 29,
    name: "Logitech MX Master 3S",
    category: "phu-kien",
    image: p29_img,
    new_price: 99.0,
    old_price: 129.0,
  },
  {
    id: 30,
    name: "Keychron K8 Pro",
    category: "phu-kien",
    image: p30_img,
    new_price: 149.0,
    old_price: 179.0,
  },
  {
    id: 31,
    name: "Samsung 49-inch Odyssey G9",
    category: "phu-kien",
    image: p31_img,
    new_price: 999.0,
    old_price: 1199.0,
  },
  {
    id: 32,
    name: "DJI Mini 3 Pro",
    category: "phu-kien",
    image: p32_img,
    new_price: 759.0,
    old_price: 899.0,
  },
  {
    id: 33,
    name: "GoPro Hero 11",
    category: "phu-kien",
    image: p33_img,
    new_price: 499.0,
    old_price: 599.0,
  },
  {
    id: 34,
    name: "iPad Pro M2",
    category: "phu-kien",
    image: p34_img,
    new_price: 899.0,
    old_price: 999.0,
  },
  {
    id: 35,
    name: "Samsung Galaxy Tab S9 Ultra",
    category: "phu-kien",
    image: p35_img,
    new_price: 1199.0,
    old_price: 1299.0,
  },
  {
    id: 36,
    name: "Microsoft Surface Pro 9",
    category: "phu-kien",
    image: p36_img,
    new_price: 1299.0,
    old_price: 1499.0,
  },
];

export default all_product;
