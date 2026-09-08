import Message from "../models/Message.js";

// Get messages
export const getMessages = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const { withUser } = req.query;

    let filter;

    if (withUser) {
      filter = {
        $or: [
          {
            sender: currentUser,
            receiver: withUser,
          },
          {
            sender: withUser,
            receiver: currentUser,
          },
        ],
      };
    } else {
      filter = {
        $or: [
          {
            sender: currentUser,
          },
          {
            receiver: currentUser,
          },
        ],
      };
    }

    const messages = await Message.find(filter)
      .populate("sender", "name email role")
      .populate("receiver", "name email role")
      .populate("property", "name code")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const {
      receiver,
      text,
      property,
    } = req.body;

    if (!receiver || !text) {
      return res.status(400).json({
        success: false,
        message:
          "Receiver and message text are required",
      });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver,
      text,
      property,
    });

    const result = await message.populate(
      "sender receiver property"
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: req.params.id,
        receiver: req.user._id,
      },
      {
        read: true,
      },
      {
        new: true,
      }
    ).populate("sender receiver property");

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(
      req.params.id
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (
      message.sender.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own messages",
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
