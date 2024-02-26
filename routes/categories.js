var express = require("express");
var router = express.Router();
//khai bao bien fs
var fs = require("fs");

const categories = require("../data/categories.json");
const fileName = "./data/categories.json";

/* GET*/
router.get("/", function (req, res, next) {
  res.send(categories);
});

// get by id
// /* GET*/
// trả về Object id tìm thấy
router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const found = categories.find((category) => {
    return category.id == id;
  });

  // nếu không tìm thấy trả về thông báo
  if (!found) {
    return res.status(404).json({ message: "Category is not found" });
  }
  res.send(found);
});

// get nhieu id
router.get("/:id/:name", function (req, res, next) {
  const { id, name } = req.params;
  res.send("OK");
});

// lệnh post

router.post("/", function (req, res, next) {
  const data = req.body;
  console.log("Data = ", data);

  // bổ sung hoặc là thêm data mới thêm vào categories
  categories.push(data); // nhưng mới chỉ lưu vào Ram, chưa lưu vào database

  //save to file
  fs.writeFileSync(fileName, JSON.stringify(categories), function (err) {
    if (err) {
      throw err;
    }
  });
  res.status(201).json({ message: "Create category is successful" });
});

// lệnh patch :
// dùng để sửa, cập nhật dữ liệu có id nào nên phải thêm : id vào router.patch("/:id"

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const data = req.body;
  console.log("Data = ", data);

  // tìm data để sửa
  let found = categories.find((p) => {
    return p.id == id;
  });

  if (found) {
    // cập nhật những data nào
    for (let x in found) {
      if (data[x]) {
        found[x] = data[x];
      }
    }
    fs.writeFileSync(fileName, JSON.stringify(categories), function (err) {
      if (err) throw err;
      console.log("Saved");
    });
    res.status(200).json({ message: "Update category is successful" });
  }
  // database
  // code here ,,,,

  return res.sendStatus(404).json({ message: "category is not found" });
});

// Delete
router.delete("/:id", function (req, res, next) {
  const id = req.params.id;
  const found = categories.find((p) => {
    return p.id == id;
  });

  // nếu không tìm thấy trả về thông báo
  if (!found) {
    return res.status(404).json({ message: "Category is not found" });
  }
  // khi đã tìm thấy
  let remainCategories = categories.filter((p) => {
    return p.id != id;
  });

  fs.writeFileSync(fileName, JSON.stringify(remainCategories), function (err) {
    if (err) throw err;
    console.log("Saved");
  });
  res.sendStatus(200);
});

module.exports = router;
