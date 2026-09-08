import siteVisit from "../models/sitevisit.js";

// Get all site visits
export const getSiteVisit = async (req, res) => {
  try {
    const siteVisit = await siteVisit.find()
      .populate("customer", "name email phone")
      .populate("agent", "name email phone")
      .populate("property", "name code price")
      .sort({ when: 1 });

    res.status(200).json({
      success: true,
      count: siteVisits.length,
      data: siteVisits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single site visit
export const getSiteVisit = async (req, res) => {
  try {
    const siteVisit = await siteVisit.findById(
      req.params.id
    )
      .populate("customer", "name email phone")
      .populate("agent", "name email phone")
      .populate("property", "name code price");

    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found",
      });
    }

    res.status(200).json({
      success: true,
      data: siteVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create site visit
export const createSiteVisit = async (req, res) => {
  try {
    const {
      when,
      customer,
      agent,
      property,
      location,
      status,
      feedback,
    } = req.body;

    if (!when || !customer || !property) {
      return res.status(400).json({
        success: false,
        message:
          "Date/time, customer and property are required",
      });
    }

    const siteVisit = await siteVisit.create({
      when,
      customer,
      agent,
      property,
      location,
      status,
      feedback,
    });

    const result = await siteVisit.populate(
      "customer agent property"
    );

    res.status(201).json({
      success: true,
      message: "Site visit created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update site visit
export const updateSiteVisit = async (req, res) => {
  try {
    const siteVisit =
      await SiteVisit.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate("customer agent property");

    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Site visit updated successfully",
      data: siteVisit,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update site visit status
export const updateSiteVisitStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const siteVisit =
      await SiteVisit.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      ).populate("customer agent property");

    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Site visit status updated",
      data: siteVisit,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete site visit
export const deleteSiteVisit = async (req, res) => {
  try {
    const siteVisit =
      await SiteVisit.findByIdAndDelete(
        req.params.id
      );

    if (!siteVisit) {
      return res.status(404).json({
        success: false,
        message: "Site visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Site visit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
