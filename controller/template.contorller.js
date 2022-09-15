// const templateService = require("../service/template.service");

// const templateController = {
//   add: async (req, res) => {
//     try {
//       const dataToSave = await templateService.create(req.body);
//       res.status(200).json(dataToSave);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },

//   getAll: async (req, res) => {
//     try {
//       const data = await templateService.getAll();
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },

//   getByID: async (req, res) => {
//     try {
//       const data = await templateService.getByID(req.params.id);
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },

//   update: async (req, res) => {
//     try {
//       const result = await templateService.update(req.params.id, req.body);

//       res.send(result);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       const templateInDB = await templateService.delete(req.params.id);

//       res.send(`Document with ${templateInDB.name} has been deleted..`);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },
// };

// module.exports = templateController;
