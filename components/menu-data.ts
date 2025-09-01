export type MenuItem = {
  id: string
  name: string
  price: number // rupees
  category: string
  desc?: string
  spicy?: boolean
  veg?: boolean
  imgQuery?: string
}

export type MenuCategory = {
  id: string
  label: string
}

export const categories: MenuCategory[] = [
  { id: "beverages", label: "Beverages" },
  { id: "breads", label: "Breads" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "rice", label: "Rice / Biryani" },
]

export const menu: MenuItem[] = [
  // beverages
  { id: "coke", name: "Coke", price: 50, category: "beverages", imgQuery: "Coke can", desc: "Chilled soft drink" },
  {
    id: "masala-chaas",
    name: "Masala Chaas",
    price: 60,
    category: "beverages",
    imgQuery: "Masala chaas glass",
    desc: "Spiced buttermilk",
    veg: true,
  },
  // breads
  {
    id: "butter-naan",
    name: "Butter Naan",
    price: 40,
    category: "breads",
    imgQuery: "Butter naan",
    desc: "Soft, buttery leavened bread",
    veg: true,
  },
  { id: "tandoori-roti", name: "Tandoori Roti", price: 30, category: "breads", imgQuery: "Tandoori roti", veg: true },
  // starters
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    price: 220,
    category: "starters",
    imgQuery: "Paneer tikka skewers",
    desc: "Char-grilled cottage cheese",
    veg: true,
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    price: 260,
    category: "starters",
    imgQuery: "Chicken tikka",
    spicy: true,
  },
  // mains
  {
    id: "veg-kolhapuri",
    name: "Veg Kolhapuri",
    price: 230,
    category: "mains",
    imgQuery: "Veg kolhapuri curry",
    desc: "Spicy mixed veg curry",
    veg: true,
    spicy: true,
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    price: 280,
    category: "mains",
    imgQuery: "Butter chicken curry",
    desc: "Creamy tomato gravy",
  },
  // rice / biryani
  {
    id: "veg-biryani",
    name: "Veg Biryani",
    price: 190,
    category: "rice",
    imgQuery: "Veg biryani",
    desc: "Fragrant basmati rice",
    veg: true,
  },
  { id: "chicken-biryani", name: "Chicken Biryani", price: 240, category: "rice", imgQuery: "Chicken biryani" },
]
