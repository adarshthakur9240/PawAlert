import Report from "../models/Report.js";

/**
 * @desc    Create a new emergency report
 * @route   POST /api/reports
 */
export const createReport = async (req, res) => {
  try {
    const {
      reporterName,
      phone,
      animalType,
      urgency,
      location,
      coordinates,
      description,
      photo,
      aiAdvice,
      aiMeds,
    } = req.body;

    const report = await Report.create({
      userId: req.userId || null,
      reporterName,
      phone,
      animalType,
      urgency,
      location,
      coordinates,
      description,
      photo,
      aiAdvice,
      aiMeds,
      status: "pending",
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all reports sorted by newest first
 * @route   GET /api/reports
 */
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update/Edit report details (Pencil Icon Action)
 * @route   PUT /api/reports/:id
 * @access  Owner or Admin
 */
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found!" });
    }

    // Role-based access logic for editing
    const role = req.userRole?.toLowerCase();
    const isAdmin = role === "admin";
    const isOwner = report.userId && report.userId.toString() === req.userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "Access Denied: You can only edit your own reports.",
      });
    }

    const updatedReport = await Report.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      returnDocument: "after",
    });

    res.json({ message: "Report updated successfully! ✅", updatedReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Upvote a report for higher priority
 */
export const upvoteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true },
    );
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update animal status with linear lifecycle validation
 * @route   PUT /api/reports/:id/status
 */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const role = req.userRole?.toLowerCase();

    // Standard lifecycle statuses
    const validStatuses = [
      "pending",
      "rescued",
      "sheltered",
      "adopted",
      "zoo",
      "failed",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value provided." });
    }

    // Role-based authority checks
    const goiAdminOnly = ["rescued", "zoo", "failed"];
    const ngoAdminOnly = ["sheltered", "adopted"];

    if (
      goiAdminOnly.includes(status) &&
      !["admin", "government", "gov"].includes(role)
    ) {
      return res
        .status(403)
        .json({ message: "Authority Error: GOI/Admin clearance required." });
    }

    if (ngoAdminOnly.includes(status) && !["admin", "ngo"].includes(role)) {
      return res
        .status(403)
        .json({ message: "Authority Error: NGO/Admin clearance required." });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true, returnDocument: "after" },
    );

    if (!report) return res.status(404).json({ message: "Report not found." });

    res.json({
      message: `Status updated to ${status.toUpperCase()}! 🐾`,
      report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
