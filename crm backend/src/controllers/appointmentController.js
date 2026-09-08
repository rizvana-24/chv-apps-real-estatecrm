import Appointment from "../models/Appointment.js";

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("customer", "name email phone")
      .populate("agent", "name email phone")
      .populate("property", "name code price")
      .sort({ when: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single appointment
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("agent", "name email phone")
      .populate("property", "name code price");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      when,
      type,
      customer,
      agent,
      property,
      status,
      notes,
      durationMinutes,
    } = req.body;

    if (!when || !customer) {
      return res.status(400).json({
        success: false,
        message: "Date/time and customer are required",
      });
    }

    const appointment = await Appointment.create({
      when,
      type,
      customer,
      agent,
      property,
      status,
      notes,
      durationMinutes,
    });

    const result = await appointment.populate(
      "customer agent property"
    );

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("customer agent property");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
