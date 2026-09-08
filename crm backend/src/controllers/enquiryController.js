import Enquiry from "../models/Enquiry.js";

// Get all enquiries
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("customer", "name email phone")
      .populate("agent", "name email phone")
      .populate("property", "name code price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single enquiry
export const getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("agent", "name email phone")
      .populate("property", "name code price");

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create enquiry
export const createEnquiry = async (req, res) => {
  try {
    const {
      code,
      customer,
      agent,
      property,
      status,
      message,
      latestUpdate,
    } = req.body;

    if (!code || !customer || !property) {
      return res.status(400).json({
        success: false,
        message:
          "Code, customer and property are required",
      });
    }

    const enquiry = await Enquiry.create({
      code,
      customer,
      agent,
      property,
      status,
      message,
      latestUpdate,
    });

    const result = await enquiry.populate(
      "customer agent property"
    );

    res.status(201).json({
      success: true,
      message: "Enquiry created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update enquiry
export const updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("customer agent property");

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(
      req.params.id
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
