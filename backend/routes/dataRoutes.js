// routes/dataRoutes.js
const express = require("express");
const dataController = require("../controllers/dataController");
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

router.post("/loginAdmin", dataController.loginAdmin)
router.post("/insertProject", upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
    { name: 'image_4', maxCount: 1 },
    { name: 'image_5', maxCount: 1 }
]), dataController.insertProject)
router.get("/getAllProjects", dataController.getAllProjects)
router.post("/getOngoingProjects", dataController.getOngoingProjects)
router.post("/getCompletedProjects", dataController.getCompletedProjects)
router.post("/getProjectById", dataController.getProjectById)
router.post("/updateProject", upload.fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 },
    { name: 'image_4', maxCount: 1 },
    { name: 'image_5', maxCount: 1 }
]), dataController.updateProject)
router.post("/deleteProject", dataController.deleteProject)
router.post("/insertAdminUser", dataController.insertAdminUser)
router.post("/getAllAdminUsers", dataController.getAllAdminUsers)
router.post("/getAdminUserById", dataController.getAdminUserById)
router.post("/updateAdminUser", dataController.updateAdminUser)
router.post("/deleteAdminUser", dataController.deleteAdminUser)
router.post("/City_Customers_Insert",upload.single('logo'),dataController.City_Customers_Insert)
router.get("/City_Customers_SelectAll", dataController.City_Customers_SelectAll)
router.post("/City_Customers_SelectById", dataController.City_Customers_SelectById)
router.post("/City_Customers_Update", upload.single('logo'), dataController.City_Customers_Update)
router.post("/City_Customers_Delete", dataController.City_Customers_Delete)










module.exports = router;