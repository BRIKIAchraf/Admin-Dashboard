import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME - Uncomment this when seeding data */
    // Add mock data to the database (Only do this once or for seeding purposes)
    seedData();
  })
  .catch((error) => console.log(`${error} did not connect`));

/* SEEDING FUNCTION */
const seedData = async () => {
  try {
    console.log("🚀 Seeding data...");

    // Clear the existing collections if needed
    await User.deleteMany();
    await Product.deleteMany();
    await ProductStat.deleteMany();
    await Transaction.deleteMany();
    await OverallStat.deleteMany();
    await AffiliateStat.deleteMany();

    // Insert mock data
    await User.insertMany(dataUser);
    await Product.insertMany(dataProduct);
    await ProductStat.insertMany(dataProductStat);
    await Transaction.insertMany(dataTransaction);
    await OverallStat.insertMany(dataOverallStat);
    await AffiliateStat.insertMany(dataAffiliateStat);

    console.log("✅ Data seeded successfully!");
  } catch (error) {
    console.error("❌ Error during data seeding:", error);
  }
};
