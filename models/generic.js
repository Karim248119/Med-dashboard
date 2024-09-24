module.exports = class genericModel {
  #Model;
  constructor(model) {
    this.#Model = model;
  }

  async create(data) {
    const instance = new this.#Model(data);
    return await instance.save();
  }
  async getAll(filters = {}, populateObj = { ref: "", fields: [] }) {
    return await this.#Model
      .find(filters)
      .populate(populateObj.ref, populateObj.fields.join(" "));
  }

  async getById(id) {
    return await this.#Model.findById(id);
  }

  async update(id, data) {
    return await this.#Model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.#Model.findByIdAndDelete(id);
  }
};
