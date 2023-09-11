const express = require("express");
const user = require("../models/user");
const db = require("../util/expense");
const bcrypt = require("bcrypt");

//signup
exports.createSignupController = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    console.log(
      "this is req data>>>>>>>>>>>>>>>>>>>>",
      name,
      phone,
      email,
      password
    );
    if (
      name === undefined ||
      name.length === 0 ||
      phone === undefined ||
      phone.length === 0 ||
      email === undefined ||
      email.length === 0 ||
      password === undefined ||
      password.length === 0
    ) {
      return res
        .status(400)
        .json({ err: "bad parameters something is missing" });
    }
    //pwd encryption
    let saltround = 10;
    bcrypt.hash(password, saltround, async (err, hash) => {
      const data = await user.create({
        name: name,
        phone: phone,
        email: email,
        password: hash,
      });
      console.log("this is created data", data);
      return res.status(200).json({ sign_up: data, message: "posted data" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user." });
  }
};

// Login Controller
exports.createloginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email>>>>>>>>", email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "Email or password is missing" });
    }

    // Get user data
    const User = await user.findAll({ where: { email: email } });
    console.log("user>>>>>>>>>>>>>>>>>>>>>>>>", User);

    if (User.length > 0) {
      // Compare hashed password with provided password
      bcrypt.compare(password, User[0].password, (err, result) => {
        if (err) {
          console.error("bcrypt error");
          return res.status(500).json({ message: "Internal server error" });
        }
        if (result) {
          return res
            .status(200)
            .json({ message: "User logged in successfully" });
        } else {
          return res.status(400).json({ message: "Password is not correct" });
        }
      });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createExpenseController = async (req, res) => {
  const { amount, description, category } = req.body;
  try {
    if (
      amount === undefined ||
      description === undefined ||
      category === undefined
    ) {
      console.log(amount, description, category);
      return res.status(400).json({ error: "Fill all fields" });
    } else {
      const ExpenseData = await Expense.create({
        amount: amount,
        description: description,
        category: category,
      });
      res.status(201).json({ expense: ExpenseData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

exports.getExpenseController = async (req, res) => {
  try {
    const data = await Expense.findAll();
    res.status(200).json({ expense: data });
  } catch (err) {
    console.log("something went wrong", err);
  }
};
exports.deleteExpense = async (req, res) => {
  const uId = req.params.id;
  // console.log(uId, "id is>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  try {
    if (uId === undefined) {
      console.log("id is missing");
      res.status(400).json({ error: "ID is missing" });
      return;
    }
    await Expense.destroy({ where: { id: uId } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
