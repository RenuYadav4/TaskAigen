import Category from "../models/Category.js";

// get all categories for user
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
        res.status(500).json({ message: "Server error" });
    }
};

export const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name ) {
        return res.status(400).json({ message: "Category name is required" });
      }
    
      try {
        const existing = await Category.findOne({ name, userId: req.user._id });
        if (existing) {
          return res.status(400).json({ message: "Category already exists" });
        }

        const category = new Category({
          name: name.trim(),
          user: req.user._id,
        });
    
        await category.save();
    
        res.status(201).json(category);
      } catch (err) {
        // Handle duplicate category name per user (compound index)
        if (err.code === 11000) {
          return res.status(400).json({ message: "You already have a category with this name" });
        }
        res.status(500).json({ message: err.message });
      }
    };

// delete
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        }); 
        
        if(!category){
            return res.status(404).json({message: "Category not found or unauthorized"});
        }

        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};