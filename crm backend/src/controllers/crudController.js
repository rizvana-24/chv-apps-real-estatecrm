export const getAll = (Model, populate = "") =>
  async (req, res) => {

    try {

      const items =
        await Model
          .find()
          .populate(populate)
          .sort({
            createdAt: -1
          });

      res.json(items);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };


export const getOne = (Model, populate = "") =>
  async (req, res) => {

    try {

      const item =
        await Model
          .findById(req.params.id)
          .populate(populate);

      if (!item) {

        return res.status(404).json({
          message: "Data not found"
        });
      }

      res.json(item);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };


export const createOne = (Model) =>
  async (req, res) => {

    try {

      const item =
        await Model.create(req.body);

      res.status(201).json(item);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });
    }
  };


export const updateOne = (Model) =>
  async (req, res) => {

    try {

      const item =
        await Model.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

      if (!item) {

        return res.status(404).json({
          message: "Data not found"
        });
      }

      res.json(item);

    } catch (error) {

      res.status(400).json({
        message: error.message
      });
    }
  };


export const deleteOne = (Model) =>
  async (req, res) => {

    try {

      const item =
        await Model.findByIdAndDelete(
          req.params.id
        );

      if (!item) {

        return res.status(404).json({
          message: "Data not found"
        });
      }

      res.json({
        message: "Deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });
    }
  };
  