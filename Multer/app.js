const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const middleware = require("./middleware/image");

const cors = require("cors");
const imagePath = path.join(__dirname, "images");

app.use(cors());
app.use(express.json());
app.use("/images", express.static(imagePath));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

//POST IMAGES
app.post("/images", middleware.single("image"), (req, res) => {
	try {
		//READ IMAGE FOLDER
		fs.readdir(imagePath, function (err, images) {
			if (err) {
				throw err;
			}
			//MAKE URL WITH IMAGE IN THE FOLDER
			const urlImages = images.map((image) => {
				return `${req.protocol}://${req.get("host")}/images/${image}`;
			});

			res.status(200).json({ url: urlImages });
		});
	} catch (error) {
		res.status(500).json({ error });
	}
});

app.get("/images", (req, res) => {
	try {
		//READ IMAGE FOLDER
		fs.readdir(imagePath, function (err, images) {
			if (err) {
				throw err;
			}
			//MAKE URL WITH IMAGE IN THE FOLDER
			const urlImages = images.map((image) => {
				return `${req.protocol}://${req.get("host")}/images/${image}`;
			});

			res.status(200).json({ url: urlImages });
		});
	} catch (error) {
		res.status(500).json({ error });
	}
});
app.listen(3001, "0.0.0.0", () => {
	console.log("running on port 8080");
});
