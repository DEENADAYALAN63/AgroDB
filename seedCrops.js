// backend/seedCrops.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Crop from "./models/Crop.js";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

async function seedCrops() {
  try {
    // ✅ Find or create a demo farmer
    let farmer = await User.findOne({ role: "farmer" });
    if (!farmer) {
      farmer = await User.create({
        name: "Demo Farmer",
        email: "farmer@example.com",
        password: "123456",
        role: "farmer",
      });
      console.log("🌾 Created demo farmer:", farmer.email);
    }

    // ✅ Local image paths inside backend/uploads
    const uploadsDir = "uploads"; // no leading slash needed

    const crops = [
      {
        name: "Tomato",
        category: "Vegetable",
        description: "Fresh red farm tomatoes",
        price: 30,
        quantity: 100,
        image: `/${uploadsDir}/tomato.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Onion",
        category: "Vegetable",
        description: "Organic small onions",
        price: 25,
        quantity: 120,
        image: `/${uploadsDir}/onion.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Potato",
        category: "Vegetable",
        description: "Natural golden potatoes",
        price: 20,
        quantity: 200,
        image: `/${uploadsDir}/potato.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Wheat",
        category: "Grain",
        description: "High-quality wheat grains",
        price: 45,
        quantity: 250,
        image: `/${uploadsDir}/wheat.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Rice",
        category: "Grain",
        description: "Premium basmati rice",
        price: 55,
        quantity: 300,
        image: `/${uploadsDir}/rice.jpg`,
        farmer: farmer._id,
      },
      
      {
        name: "Coriander",
        category: "Spice",
        description: "Farm-fresh coriander leaves",
        price: 15,
        quantity: 160,
        image: `/${uploadsDir}/coriander.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Banana",
        category: "Fruit",
        description: "Ripe yellow bananas",
        price: 40,
        quantity: 90,
        image: `/${uploadsDir}/banana.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Apple",
        category: "Fruit",
        description: "Fresh Himachal apples",
        price: 80,
        quantity: 70,
        image: `/${uploadsDir}/apple.jpg`,
        farmer: farmer._id,
      },
      {
        name: "Groundnut",
        category: "Nut",
        description: "Farm-grown protein-rich groundnuts",
        price: 100,
        quantity: 110,
        image: `/${uploadsDir}/groundnut.jpg`,
        farmer: farmer._id,
      },
    ];

    // ✅ Clean and insert
    await Crop.deleteMany();
    await Crop.insertMany(crops);

    console.log("✅ Crops inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed crops:", err);
    process.exit(1);
  }
}

seedCrops();
