import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({_id:req.body.userId});
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId])
       {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to add item to cart",
    });
  }
};

//remove ritems from user cart'
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to remove item from cart",
    });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Failed to get cart data",
    });
  }
};

export { addToCart, removeFromCart, getCart };
