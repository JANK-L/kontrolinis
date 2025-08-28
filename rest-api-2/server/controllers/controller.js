import mongoose from "mongoose";
import Topic from "../models/topicsModel.js";

export const get_Topics = async (req, res) => {
  const topics = await Topic.find({}).sort({ createdAt: -1 });
  res.status(200).json(topics);
};

export const get_Topic = async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id });
    res.status(200).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const post_Topic = async (req, res) => {
  const { title, body } = req.body;

  try {
    const topic = await Topic.create({ title, body });
    res.status(200).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update_Topic = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Topic not found." });
  }

  const topic = await Topic.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!topic) {
    return res.status(404).json({ error: "Topic not found." });
  }
  res.status(200).json(topic);
};

export const delete_Topic = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Topic not found." });
  }

  const topic = await Topic.findOneAndDelete({ _id: id });

  if (!topic) {
    return res.status(404).json({ error: "Topic not found." });
  }

  res.status(200).json(topic);
};
