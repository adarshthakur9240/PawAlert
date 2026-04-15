import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const { reporterName, animalType, urgency, location, description, photo, aiAdvice, aiMeds } = req.body;
    
    const newReport = new Report({
      reporterName,
      animalType,
      urgency,
      location,
      description,
      photo,
      aiAdvice: aiAdvice || "",
      aiMeds: aiMeds || "",
      userId: req.user?._id, // Clerk mapped user
      status: "pending"
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error("Report Create Error:", error);
    res.status(500).json({ message: "Server error while creating report" });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
