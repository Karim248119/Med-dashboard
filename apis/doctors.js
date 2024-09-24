const doctorsModel = require("../models/Doctor");
const specialityModel = require("../models/speciality");
const genericMethod = require("../models/generic.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const docMethod = new genericMethod(doctorsModel);
const spMethod = new genericMethod(specialityModel);

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/doctors");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]; // Get file extension
    cb(null, `doctor-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({ storage: multerStorage });

const uploadMiddleware = uploader.single("img");

// GET all doctors (JSON response)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await docMethod.getAll(
      {},
      { ref: "sp_id", fields: ["title"] }
    );
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch doctors", error });
  }
};

// GET a single doctor by ID (JSON response)
const getDoctorById = async (req, res) => {
  try {
    const doctor = await docMethod.getById(req.params.id);
    if (doctor) {
      res.status(200).json({ success: true, doctor });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch doctor", error });
  }
};

// POST (create) a new doctor (JSON response)
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      sp_id,
      "contacts.phone": phone,
      "contacts.facebook": facebook,
      "contacts.linkedin": linkedin,
      "contacts.instagram": instagram,
      resume,
    } = req.body;

    const contacts = { phone, facebook, linkedin, instagram };

    const doctorData = {
      name,
      img: `/images/doctors/${req.file.filename}`,
      sp_id,
      contacts,
      resume,
    };

    const newDoctor = await docMethod.create(doctorData);
    res.status(201).json({ success: true, doctor: newDoctor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create doctor", error });
  }
};

// PUT (update) a doctor by ID (JSON response)
const updateDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      name,
      sp_id,
      "contacts.phone": phone,
      "contacts.facebook": facebook,
      "contacts.linkedin": linkedin,
      "contacts.instagram": instagram,
      resume,
    } = req.body;

    const updateData = {
      name,
      sp_id,
      contacts: { phone, facebook, linkedin, instagram },
      resume,
    };

    // Update the image if a new file is uploaded
    if (req.file) {
      updateData.img = `/images/doctors/${req.file.filename}`;
    }

    const updatedDoctor = await docMethod.update(id, updateData);

    if (updatedDoctor) {
      res.status(200).json({ success: true, doctor: updatedDoctor });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update doctor", error });
  }
};

// DELETE a doctor by ID (JSON response)
const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDoctor = await docMethod.delete(id);
    if (deletedDoctor) {
      res
        .status(200)
        .json({
          success: true,
          message: "Doctor deleted",
          doctor: deletedDoctor,
        });
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete doctor", error });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  addDoctor,
  uploadMiddleware,
  updateDoctor,
  deleteDoctor,
};
