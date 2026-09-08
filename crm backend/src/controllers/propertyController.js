import Property from "../models/Property.js";

export const getProperties = async (
  req,
  res
) => {

  try {

    const {
      search,
      status,
      city,
      type
    } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

    if (city) {
      filter.city =
        new RegExp(city, "i");
    }

    if (search) {

      filter.$or = [
        {
          name:
            new RegExp(search, "i")
        },
        {
          code:
            new RegExp(search, "i")
        },
        {
          locality:
            new RegExp(search, "i")
        }
      ];
    }

    const properties =
      await Property
        .find(filter)
        .populate(
          "agent",
          "name email"
        )
        .sort({
          createdAt: -1
        });

    res.json(properties);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const getProperty = async (
  req,
  res
) => {

  const property =
    await Property
      .findById(req.params.id)
      .populate("agent");

  if (!property) {

    return res.status(404).json({
      message: "Property not found"
    });
  }

  res.json(property);
};

export const createProperty = async (
  req,
  res
) => {

  try {

    const property =
      await Property.create(req.body);

    res.status(201).json(property);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });
  }
};

export const updateProperty = async (
  req,
  res
) => {

  const property =
    await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

  if (!property) {

    return res.status(404).json({
      message: "Property not found"
    });
  }

  res.json(property);
};

export const deleteProperty = async (
  req,
  res
) => {

  const property =
    await Property.findByIdAndDelete(
      req.params.id
    );

  if (!property) {

    return res.status(404).json({
      message: "Property not found"
    });
  }

  res.json({
    message: "Property deleted successfully"
  });
};
