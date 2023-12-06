const Joi = require("joi");
const categoryModel = require("../model/categoryModel");

module.exports = {
  create: async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(6).max(10).required(),
      description: Joi.string().min(5).required(),
      image: Joi.string(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "error" + error, data: null });
    }


    try {
//requesting image 
      req.body["image"]= (!req.file)? null : req.file.filename

      console.log(req.body["image"])
      const newCategory = new categoryModel(req.body); // prends tout le body

      await newCategory.save();
      res
        .status(201)
        .json({ message: " created successfuly ", data: newCategory });
    } catch (error) {
      res.status(400).json({ message: "error" + error, data: error });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await categoryModel.find();
      console.log(categories);
      res.status(200).json({ message: "the categories are", data: categories });
    } catch (error) {
      res.status(400).json({ message: "error" + error, data: error });
    }
  },

  getOneCategory: async (req, res) => {
    const id = req.params.id;
    try {
      const category = await categoryModel.findOne({ _id: id });
      console.log(category);
      if (!category) {
        return res
          .status(404)
          .json({ message: "category not found", data: null });
      }
      res.status(200).json({ message: "category found ", data: category });
    } catch (error) {
      res.status(400).json({ message: "error" + error, data: error });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deletedCat = await categoryModel.deleteOne({ _id: req.params.id });

      if (deletedCat.deletedCount === 0) {
        return res.status(404).json({ message: "already deleted", data: null });
      }

      return res
        .status(204)
        .json({ message: "successfully deleted", data: deletedCat });
    } catch (error) {
      res.status(400).json({ message: "error" + error, data: error });
    }
  },

  /*   updatedCategory: async (req, res) => {
    const updatedData =  req.body
    try {
      const updatedcat = await categoryModel.findByIdAndUpdate(
        { _id: req.params.id },
        updatedData ,
        { new: true }
      );
        if(!updatedcat) {
          return res.status(404).json({message:"category not found"})
        }
      res
        .status(200)
        .json({ message: "successfully updated", data: updatedcat });
    } catch (error) {
      res.status(500).json({ message: "error" + error, data: error });
    }
  }, */
  updateCategory: async (req, res) => {
    const updatedData = req.body;
    try {
      req.body["image"]=  req.file?.filename

      const updatedCat = await categoryModel.findByIdAndUpdate(
        { _id: req.params.id },
        // { $set: req.body },
        updatedData,
        { new: true }
      );
      if (!updatedCat) {
        return res
          .status(404)
          .json({ message: "category not found", data: null });
      }
      res.status(200).json({ message: "category updated", data: updatedCat });
    } catch (error) {
      res.status(500).json({ message: "error" + error, data: error });
    }
  },


  searchCategorybyName: async (req,res)=> {
    const namedata = req.query.name
    console.log(namedata)

    try {
       const dataCat = await categoryModel.find({name:namedata})
       if(!namedata) {
        return res.status(404).json({message:"category not found", data:null})

       }
       res.status(200).json({message:"the category results are found", dataCat:dataCat})
    } catch (error) {
      res.status(400).json({message:"error"+error,data:error})
    }
  }
};
