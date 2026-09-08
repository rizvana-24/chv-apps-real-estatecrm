import Lead from "../models/Lead.js";

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const {
      stage,
      source,
      owner,
      search,
    } = req.query;

    const filter = {};

    if (stage) {
      filter.stage = stage;
    }

    if (source) {
      filter.source = source;
    }

    if (owner) {
      filter.owner = owner;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          code: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const leads = await Lead.find(filter)
      .populate("owner", "name email phone")
      .populate("customer", "name email phone")
      .populate("property", "name code price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single lead
export const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("owner", "name email phone")
      .populate("customer", "name email phone")
      .populate("property", "name code price");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create lead
export const createLead = async (req, res) => {
  try {
    const {
      code,
      name,
      source,
      score,
      owner,
      stage,
      nextAction,
      customer,
      property,
      email,
      phone,
      notes,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Lead name is required",
      });
    }

    const lead = await Lead.create({
      code,
      name,
      source,
      score,
      owner,
      stage,
      nextAction,
      customer,
      property,
      email,
      phone,
      notes,
    });

    const result = await lead.populate(
      "owner customer property"
    );

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update lead
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("owner customer property");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Change lead stage
export const updateLeadStage = async (req, res) => {
  try {
    const { stage } = req.body;

    if (!stage) {
      return res.status(400).json({
        success: false,
        message: "Stage is required",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        stage,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("owner customer property");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead stage updated successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign lead to agent
export const assignLead = async (req, res) => {
  try {
    const { owner } = req.body;

    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        owner,
      },
      {
        new: true,
      }
    ).populate("owner customer property");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      data: lead,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(
      req.params.id
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
