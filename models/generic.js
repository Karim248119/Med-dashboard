module.exports = class genericModel {
  #Model;
  constructor(model) {
    this.#Model = model;
  }

  async create(data) {
    const instance = new this.#Model(data);
    return await instance.save();
  }

  async getAll(
    filters = {},
    populateObj = { ref: "", fields: [] },
    page,
    limit
  ) {
    const populateFields = Array.isArray(populateObj.fields)
      ? populateObj.fields.join(" ")
      : "";
    const totalCount = await this.#Model.countDocuments(filters);

    const totalPages = Math.ceil(totalCount / limit);

    const results = await this.#Model
      .find(filters)
      .populate(populateObj.ref, populateFields)
      .skip((page - 1) * limit)
      .limit(limit);
    return {
      data: results,
      totalPages,
    };
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
