import { createContext, useState, useEffect, useContext } from "react";
import { getCategories, addCategory as addCategoryService, deleteCategory as deleteCategoryService } from "../services/categoryService";
import { AuthContext } from "./AuthContext";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {token} = useContext(AuthContext);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        console.log(res.data);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [token]);
 

  return (
    <CategoryContext.Provider value={{ categories, setCategories, newCategory,setNewCategory,isLoading, }}>
      {children}
    </CategoryContext.Provider>
  );
};
