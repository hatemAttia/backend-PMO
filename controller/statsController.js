const fileModel = require("../models/file");
const teamModel = require("../models/team");
const subscribeModel = require("../models/subscribe");
const newsModel = require("../models/news");
const opportunityModel = require("../models/opportunity");

const mongoose = require("mongoose");

exports.statscount = async (req, res, next) => {
  const membreCount = await teamModel.countDocuments((count) => count);
  const fileCount = await fileModel.countDocuments((count) => count);
  const subscribeCount = await subscribeModel.countDocuments((count) => count);
  const newsCount = await newsModel.countDocuments((count) => count);
  const opportunityCount = await opportunityModel.countDocuments(
    (count) => count
  );

  if (
    !membreCount ||
    !fileCount ||
    !subscribeCount ||
    !newsCount ||
    !opportunityCount
  ) {
    res.status(400).json("Error getting objet");
  }
  res.status(200).json({
       teamcount: membreCount,
       filecount: fileCount,
       subscribecount: subscribeCount,
       newscount: newsCount,
       opportunitycount: opportunityCount,
     });
};
