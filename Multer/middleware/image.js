const multer = require("multer");

const TYPE_IMAGES = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/jpg": "jpg",
};

const storage = multer.diskStorage({
	// STORAGE OF IMAGE
	destination: (req, file, callback) => {
		callback(null, "images");
	},

	//MAKE EACH IMAGE UNIQUE
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = TYPE_IMAGES[file.mimetype];
		callback(null, name + Date.now() + "." + extension);
	},
});

module.exports = multer({ storage: storage });
