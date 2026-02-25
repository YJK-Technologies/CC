// controllers/dataController.js
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const dbConfig = require("../config/dbConfig");

const loginAdmin = async (req, res) => {
  const { email, password, company_code } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "AA")
      .input("email", sql.NVarChar, email)
      .input("password_hash", sql.NVarChar, "")
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_AdminUsers @mode, NULL, @email, @password_hash, '', @company_code, '', '', '', ''`);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const admin = result.recordset[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin.id,
        email: admin.email,
        company_code: admin.company_code,
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const insertProject = async (req, res) => {
  const { title, location, description, start_date, completion_date, completion_percentage, project_type,
    status, created_by, company_code } = req.body;

  let image_1 = req.files['image_1'] ? req.files['image_1'][0].buffer : null;
  let image_2 = req.files['image_2'] ? req.files['image_2'][0].buffer : null;
  let image_3 = req.files['image_3'] ? req.files['image_3'][0].buffer : null;
  let image_4 = req.files['image_4'] ? req.files['image_4'][0].buffer : null;
  let image_5 = req.files['image_5'] ? req.files['image_5'][0].buffer : null;

  console.log(req.body)
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("mode", sql.NVarChar, "I")
      .input("title", sql.NVarChar, title)
      .input("location", sql.NVarChar, location)
      .input("description", sql.NVarChar, description)
      .input("start_date", sql.NVarChar, start_date)
      .input("completion_date", sql.NVarChar, completion_date)
      .input("completion_percentage", sql.Int, completion_percentage)
      .input("project_type", sql.NVarChar, project_type)
      .input("status", sql.NVarChar, status)
      .input("company_code", sql.NVarChar, company_code)
      .input("image_1", sql.VarBinary, image_1)
      .input("image_2", sql.VarBinary, image_2)
      .input("image_3", sql.VarBinary, image_3)
      .input("image_4", sql.VarBinary, image_4)
      .input("image_5", sql.VarBinary, image_5)
      .input("created_by", sql.NVarChar, created_by)
      .query(`EXEC sp_Projects @mode,NULL,@title,@location,@description,@start_date,@completion_date,@completion_percentage,@project_type,@status,@company_code,@image_1,@image_2,@image_3,@image_4,@image_5,@created_by,''`);

    res.status(200).json({ message: "Project inserted successfully" });
  } catch (err) {
    console.error("Insert Project Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all projects
const getAllProjects = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "S")
      .query(`EXEC sp_Projects @mode,NULL,'','','','','',0,'','','','','','','','','',''`);

    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Get All Projects Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get ongoing projects
const getOngoingProjects = async (req, res) => {
  const { company_code } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "O")
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_Projects @mode,NULL,'','','','','',0,'','',@company_code,'','','','','','',''`);

    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Get Ongoing Projects Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get completed projects
const getCompletedProjects = async (req, res) => {
  const { company_code } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "C")
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_Projects @mode,NULL,'','','','','',0,'','',@company_code,'','','','','','',''`);

    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Get Completed Projects Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get project by ID
const getProjectById = async (req, res) => {
  const { id, company_code } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "ID")
      .input("id", sql.UniqueIdentifier, id)
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_Projects @mode,@id,'','','','','',0,'','',@company_code,'','','','','','',''`);

    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Get Project by ID Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a project
const updateProject = async (req, res) => {
  const { id, title, location, description, start_date, completion_date, completion_percentage, project_type,
    status, modified_by, company_code } = req.body;

  let image_1 = req.files['image_1'] ? req.files['image_1'][0].buffer : null;
  let image_2 = req.files['image_2'] ? req.files['image_2'][0].buffer : null;
  let image_3 = req.files['image_3'] ? req.files['image_3'][0].buffer : null;
  let image_4 = req.files['image_4'] ? req.files['image_4'][0].buffer : null;
  let image_5 = req.files['image_5'] ? req.files['image_5'][0].buffer : null;

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("mode", sql.NVarChar, "U")
      .input("id", sql.UniqueIdentifier, id)
      .input("title", sql.NVarChar, title)
      .input("location", sql.NVarChar, location)
      .input("description", sql.NVarChar, description)
      .input("start_date", sql.NVarChar, start_date)
      .input("completion_date", sql.NVarChar, completion_date)
      .input("completion_percentage", sql.Int, completion_percentage)
      .input("project_type", sql.NVarChar, project_type)
      .input("status", sql.NVarChar, status)
      .input("company_code", sql.NVarChar, company_code)
      .input("image_1", sql.VarBinary, image_1)
      .input("image_2", sql.VarBinary, image_2)
      .input("image_3", sql.VarBinary, image_3)
      .input("image_4", sql.VarBinary, image_4)
      .input("image_5", sql.VarBinary, image_5)
      .input("modified_by", sql.NVarChar, modified_by)
      .query(`EXEC sp_Projects @mode,@id,@title,@location,@description,@start_date,@completion_date,@completion_percentage,@project_type,@status,@company_code,@image_1,@image_2,@image_3,@image_4,@image_5,'',@modified_by`);

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    console.error("Update Project Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete a project
const deleteProject = async (req, res) => {
  const { id, company_code } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("mode", sql.NVarChar, "D")
      .input("id", sql.UniqueIdentifier, id)
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_Projects @mode,@id,'','','','','',0,'','',@company_code,'','','','','','',''`);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete Project Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ INSERT admin user
const insertAdminUser = async (req, res) => {
  const { email, password_hash, company_code, created_by } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("mode", sql.NVarChar, "I")
      .input("email", sql.NVarChar, email)
      .input("password_hash", sql.NVarChar, password_hash)
      .input("company_code", sql.NVarChar, company_code)
      .input("created_by", sql.NVarChar, created_by)
      .query(`EXEC sp_AdminUsers @mode, NULL, @email, @password_hash, '', @company_code, @created_by, '', 
        '', ''`);

    res.status(200).json({ message: "Admin user inserted successfully" });
  } catch (err) {
    console.error("Error inserting admin user:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ SELECT ALL admin users
const getAllAdminUsers = async (req, res) => {
  const { company_code } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("mode", sql.NVarChar, "S")
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_AdminUsers @mode, NULL, '', '', '', @company_code, '', '', '', ''`);

    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Error fetching admin users:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ SELECT BY ID
const getAdminUserById = async (req, res) => {
  const { id, company_code } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("mode", sql.NVarChar, "ID")
      .input("id", sql.UniqueIdentifier, id)
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_AdminUsers @mode, @id, '', '', '', @company_code, '', '', '', ''`);

    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Error fetching admin user:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE admin user
const updateAdminUser = async (req, res) => {
  const { id, email, password_hash, company_code, modified_by } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("mode", sql.NVarChar, "U")
      .input("id", sql.UniqueIdentifier, id)
      .input("email", sql.NVarChar, email)
      .input("password_hash", sql.NVarChar, password_hash)
      .input("company_code", sql.NVarChar, company_code)
      .input("modified_by", sql.NVarChar, modified_by)
      .query(`EXEC sp_AdminUsers @mode, @id, @email, @password_hash, '', @company_code, '', '', @modified_by, ''`);

    res.status(200).json({ message: "Admin user updated successfully" });
  } catch (err) {
    console.error("Error updating admin user:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE admin user
const deleteAdminUser = async (req, res) => {
  const { id, company_code } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("mode", sql.NVarChar, "D")
      .input("id", sql.UniqueIdentifier, id)
      .input("company_code", sql.NVarChar, company_code)
      .query(`EXEC sp_AdminUsers @mode, @id, '', '', '', @company_code, '', '', '', ''`);

    res.status(200).json({ message: "Admin user deleted successfully" });
  } catch (err) {
    console.error("Error deleting admin user:", err);
    res.status(500).json({ message: err.message });
  }
};

//Insert Customer
const City_Customers_Insert = async (req, res) => {
  const { id, name, Company_code, Created_by } = req.body;
  let logo = null;
  if (req.file) {
    logo = req.file.buffer; // File buffer if uploaded
  }

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("mode", sql.NVarChar, "I")
      .input("id", sql.UniqueIdentifier, id)
      .input("name", sql.NVarChar, name)
      .input("logo", sql.VarBinary, logo)
      .input("company_code", sql.NVarChar, Company_code)
      .input("created_by", sql.NVarChar, Created_by)
      .query(`EXEC sp_Customers @mode, @id, @name, @logo, @company_code, @created_by, '', '', ''`);
    res.status(200).json({ message: "Customers inserted successfully" });
  } catch (err) {
    console.error("Insert Customers Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Select All Customers
const City_Customers_SelectAll = async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "S")
      .query(`EXEC sp_Customers @mode, NULL, '', '', '', '', '', '', ''`);
    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Get All Customers Error:", err);
    res.status(500).json({ message: err.message });
  }
};

//Select Customer by ID
const City_Customers_SelectById = async (req, res) => {
  const { id, Company_code } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input("mode", sql.NVarChar, "ID")
      .input("id", sql.UniqueIdentifier, id)
      .input("company_code", sql.NVarChar, Company_code)
      .query(`EXEC sp_Customers @mode, @id, '', '', @company_code, '', '', '', ''`);
    const records = result?.recordset || [];
    if (records.length > 0) {
      res.status(200).json(records);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("Get Customers by ID Error:", err);
    res.status(500).json({ message: err.message });
  }
};

//Update Customer
const City_Customers_Update = async (req, res) => {
  const { id, name, Company_code, modified_by } = req.body;
  let logo = null;
  if (req.file) {
    logo = req.file.buffer;
  }

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("mode", sql.NVarChar, "U")
      .input("id", sql.UniqueIdentifier, id)
      .input("name", sql.NVarChar, name)
      .input("logo", sql.VarBinary, logo)
      .input("company_code", sql.NVarChar, Company_code)
      .input("modified_by", sql.NVarChar, modified_by)
      .query(`EXEC sp_Customers @mode, @id, @name, @logo, @company_code, '', '', @modified_by, ''`);
    res.status(200).json({ message: "Customers updated successfully" });
  } catch (err) {
    console.error("Update Customers Error:", err);
    res.status(500).json({ message: err.message });
  }
};

//Delete Customer
const City_Customers_Delete = async (req, res) => {
  const { id, Company_code } = req.body;
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input("mode", sql.NVarChar, "D")
      .input("id", sql.UniqueIdentifier, id)
      .input("company_code", sql.NVarChar, Company_code)
      .query(`EXEC sp_Customers @mode, @id, '', '', @company_code, '', '', '', ''`);
    res.status(200).json({ message: "Customers deleted successfully" });
  } catch (err) {
    console.error("Delete Customers Error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  loginAdmin,
  insertProject,
  getAllProjects,
  getOngoingProjects,
  getCompletedProjects,
  getProjectById,
  updateProject,
  deleteProject,
  insertAdminUser,
  getAllAdminUsers,
  getAdminUserById,
  updateAdminUser,
  deleteAdminUser,
  City_Customers_Insert,
  City_Customers_SelectAll,
  City_Customers_SelectById,
  City_Customers_Update,
  City_Customers_Delete
};