const express = require("express");
const app = express();
const path = require("path");
const middleware = require("./middleware/image");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.post("/post", middleware.single("image"), (req, res) => {
	try {
		const url_image = `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`;

		res.status(200).json({ url_image });
	} catch (error) {
		res.status(500).json({ error });
	}
});
app.listen(3001, () => {
	console.log("running on port 3001");
});
