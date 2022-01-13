const Info = require("../models/infoModel");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHander = require("../utils/errorHander");
const cloudinary = require("cloudinary");

// create
exports.createInfo = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "infos",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const info = await Info.create(req.body);

  res.status(200).json({ success: true, info });
});

// all
exports.getAllInfos = catchAsyncErrors(async (req, res, next) => {
  const infos = await Info.find();

  res.status(200).json({ success: true, infos });
});

// all admin
exports.getAdminInfos = catchAsyncErrors(async (req, res, next) => {
  const infos = await Info.find();

  res.status(200).json({ success: true, infos });
});

// detail
exports.getInfoDetails = catchAsyncErrors(async (req, res, next) => {
  const info = await Info.findById(req.params.id);

  if (!info) {
    return next(ErrorHander("info not found"));
  }
  res.status(200).json({ success: true, info });
});

// update

exports.updateInfo = catchAsyncErrors(async (req, res, next) => {
  let info = await Info.findById(req.params.id);

  if (!info) {
    return next(new ErrorHander("info not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < info.images.length; i++) {
      await cloudinary.v2.uploader.destroy(info.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "infos",
      });

      imagesLinks.push({ 
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  info = await Info.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    info,
  });
});

// delete
exports.deleteInfo = catchAsyncErrors(async (req, res, next) => {
  const info = await Info.findById(req.params.id);
  if (!info) {
    return next(ErrorHander("info not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < info.images.length; i++) {
    await cloudinary.v2.uploader.destroy(info.images[i].public_id);
  }

  await info.remove();

  res.status(200).json({
    success: true,
    message: "About Delete Successfully",
  });
});
