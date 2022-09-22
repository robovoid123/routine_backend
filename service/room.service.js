const RoomModel = require("../model/room.model");

const roomService = {
  getAll: async () => {
    try {
      const roomInDB = await RoomModel.find();
      return roomInDB;
    } catch (error) {}
  },
  getByID: async (id) => {
    try {
      const roomInDB = await RoomModel.findById(id);
      return roomInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (data) => {
    try {
      const roomInDB = await RoomModel.findOne({
        roomNumber: data.roomNumber,
      });

      if (roomInDB) throw new Error("room already exists");

      const newRoom = new RoomModel({ ...data });
      await newRoom.save();

      return newRoom;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (id, data) => {
    try {
      const options = { new: true };
      const roomInDB = await RoomModel.findByIdAndUpdate(
        id,
        { ...data },
        options
      );

      return roomInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
  delete: async (id) => {
    try {
      const roomInDB = await RoomModel.findByIdAndDelete(id);
      return roomInDB;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = roomService;
