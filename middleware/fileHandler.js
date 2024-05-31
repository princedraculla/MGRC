import multer from "multer";

// setting up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    console.log(req)
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    console.log(req)
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname );
  },
});

const upload = multer({ storage: storage });

export default upload 