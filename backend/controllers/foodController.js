// import foodModel from "../models/foodModel.js";
// import fs from "fs";

// //add food item

// const addFood = async (req, res) => {
//   let image_filename = `${req.file.filename}`;

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename,
//   });
//   try {
//     await food.save();
//     res.json({
//       success: true,
//       message: "Food item added successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// //all food list
// const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({});
//     res.json({
//       success: true,
//       data: foods,
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// // remove food item
// const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id);
//     fs.unlink(`uploads/${food.image}`, () => {});
//     await foodModel.findByIdAndDelete(req.body.id);
//     res.json({
//       success: true,
//       message: "Food item removed successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// export { addFood, listFood, removeFood };
import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink); // Promisify fs.unlink for better error handling

// Add Food Item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename, // Safely using req.file.filename
    });

    await food.save();
    res.json({
      success: true,
      message: "Food item added successfully",
    });
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// List All Food Items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error("Error listing food items:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Remove the image file if it exists
    const filePath = path.join("uploads", food.image);
    if (fs.existsSync(filePath)) {
      await unlinkAsync(filePath);
    }

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { addFood, listFood, removeFood };
