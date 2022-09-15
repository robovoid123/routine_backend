// const TemplateModel = require("../model/template.model");

// const templateService = {
//   getAll: async () => {
//     try {
//       const templateInDB = await TemplateModel.find();
//       return templateInDB;
//     } catch (error) {}
//   },
//   getByID: async (id) => {
//     try {
//       const templateInDB = await TemplateModel.findById(id);
//       return templateInDB;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
//   create: async (data) => {
//     try {
//       const templateInDB = await TemplateModel.findOne({
//         name: data.name,
//         alias: data.alias,
//       });

//       if (templateInDB) throw new Error("template already exists");

//       const newTemplate = new templateModel({ ...data });
//       await newTemplate.save();

//       return newTemplate;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
//   update: async (id, data) => {
//     try {
//       const options = { new: true };
//       const templateInDB = await TemplateModel.findOneAndUpdate(
//         id,
//         { ...data },
//         options
//       );

//       return templateInDB;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
//   delete: async (id) => {
//     try {
//       const templateInDB = await TemplateModel.findByIdAndDelete(id);
//       return templateInDB;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
// };

// module.exports = templateService;
