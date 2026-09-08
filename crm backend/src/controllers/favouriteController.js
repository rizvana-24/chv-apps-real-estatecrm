import Favorite from "../models/Favorite.js";

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    const customerId = req.user._id;

    const favorites = await Favorite.find({
      customer: customerId,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add property to favorites
export const addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const customerId = req.user._id;

    const existing = await Favorite.findOne({
      customer: customerId,
      property: propertyId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Property already added to favorites",
      });
    }

    const favorite = await Favorite.create({
      customer: customerId,
      property: propertyId,
      note: req.body.note || "",
    });

    const result = await favorite.populate("property");

    res.status(201).json({
      success: true,
      message: "Property added to favorites",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove property from favorites
export const removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const customerId = req.user._id;

    const favorite = await Favorite.findOneAndDelete({
      customer: customerId,
      property: propertyId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Check whether property is favorite
export const checkFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      customer: req.user._id,
      property: req.params.propertyId,
    });

    res.status(200).json({
      success: true,
      isFavorite: !!favorite,
      data: favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
