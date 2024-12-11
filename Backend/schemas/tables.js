const mongoose = require('mongoose');

// Define the simplified Table schema
const tableSchema = new mongoose.Schema(
  {
    table_num: {
      type: String,
      required: true, // Table number (e.g., "Table 1")
      unique: true,   // Ensures that each table number is unique
    },
    availability: {
      type: Boolean,
      default: true,  // Default to 'true' (table is available)
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create and export the Table model
const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
