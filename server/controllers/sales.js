import OverallStat from "../models/OverallStat.js";
import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    const OverallStat = await OverallStat.find();
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
