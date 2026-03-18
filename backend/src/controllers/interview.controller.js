const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * Helper: Converts AI flat array into array of objects
 * AI sometimes gives: ["question", "...", "intention", "...", "answer", "..."]
 * keys = ["question","intention","answer"]
 */
function convertFlatArrayToObjects(arr, keys) {
  const result = [];
  for (let i = 0; i < arr.length; i += keys.length) {
    const obj = {};
    keys.forEach((k, idx) => {
      obj[k] = arr[i + idx] || "";
    });
    result.push(obj);
  }
  return result;
}

async function generateInterViewReportController(req, res) {
  try {
    // 1️⃣ Check file
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // 2️⃣ Parse PDF
    const data = await pdfParse(req.file.buffer);
    const resumeContent = data.text;

    // 3️⃣ Get form data
    const { selfDescription, jobDescription } = req.body;

    // 4️⃣ Call AI
    const aiReport = await generateInterviewReport({
      resume: resumeContent,
      selfDescription,
      jobDescription
    });

    console.log("AI Response:", aiReport); // Debug: check AI output

    // 5️⃣ Map AI data to Mongoose format

    // Technical Questions
    const technicalQuestions = convertFlatArrayToObjects(aiReport.technicalQuestions || [], ["question","intention","answer"])
      .map(q => ({
        question: q.question || "TBD",
        intention: q.intention || "TBD",
        answer: q.answer || "TBD"
      }));

    // Behavioral Questions
    const behavioralQuestions = convertFlatArrayToObjects(aiReport.behavioralQuestions || [], ["question","intention","answer"])
      .map(q => ({
        question: q.question || "TBD",
        intention: q.intention || "TBD",
        answer: q.answer || "TBD"
      }));

    // Skill Gaps
    const skillGaps = convertFlatArrayToObjects(aiReport.skillGaps || [], ["skill","severity"])
      .map(s => ({
        skill: s.skill || "TBD",
        severity: ["low","medium","high"].includes(s.severity?.toLowerCase()) ? s.severity.toLowerCase() : "medium"
      }));

    // Preparation Plan
    const preparationPlan = convertFlatArrayToObjects(aiReport.preparationPlan || [], ["day","focus","tasks"])
      .map(p => ({
        day: parseInt(p.day?.replace(/\D/g,'')) || 1,
        focus: p.focus || "TBD",
        tasks: Array.isArray(p.tasks) ? p.tasks : [p.tasks || "TBD"]
      }));

    // 6️⃣ Save to DB
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent,
      selfDescription,
      jobDescription,
      title: aiReport.title || "TBD",
      matchScore: aiReport.matchScore || 0,
      technicalQuestions,
      behavioralQuestions,
      skillGaps,
      preparationPlan
    });

    // 7️⃣ Success response
    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport
    });

  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}

module.exports = { generateInterViewReportController };