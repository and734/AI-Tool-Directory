const mongoose = require('mongoose');
const Tool = require('../models/Tool');

describe('Database Tests', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create and retrieve a tool', async () => {
    const tool = new Tool({
      name: "Test Tool",
      url: "https://test.com",
      category: "Testing",
      icon: "https://test.com/favicon.ico"
    });

    await tool.save();
    const found = await Tool.findById(tool._id);
    expect(found.name).toBe("Test Tool");

    await Tool.findByIdAndDelete(tool._id);
  });
});