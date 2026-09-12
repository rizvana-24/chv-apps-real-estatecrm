import User from "../models/User.js";
import Property from "../models/Property.js";
import Lead from "../models/Lead.js";
import Appointment from "../models/Appointment.js";
import Enquiry from "../models/Enquiry.js";
import Sitevisit from "../models/Sitevisit.js";
export const dashboard = async (
  req,
  res
) => {

  const [
    users,
    agents,
    customers,
    properties,
    leads,
    appointments,
    enquiries,
    visits
  ] = await Promise.all([

    User.countDocuments(),

    User.countDocuments({
      role: "agent"
    }),

    User.countDocuments({
      role: "customer"
    }),

    Property.countDocuments(),

    Lead.countDocuments(),

    Appointment.countDocuments(),

    Enquiry.countDocuments(),

    Sitevisit.countDocuments()
  ]);

  res.json({
    users,
    agents,
    customers,
    properties,
    leads,
    appointments,
    enquiries,
    siteVisits: visits
  });
};

export const leadPipeline = async (
  req,
  res
) => {

  const result =
    await Lead.aggregate([
      {
        $group: {
          _id: "$stage",
          count: {
            $sum: 1
          }
        }
      }
    ]);

  res.json(result);
};
