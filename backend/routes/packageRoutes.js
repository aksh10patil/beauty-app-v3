const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `package-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({});
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single package
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a package
router.post('/', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Upload image for a package
router.post('/upload/:id', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    package.image = imageUrl;
    const updatedPackage = await package.save();
    
    res.json({
      message: 'Image uploaded successfully',
      imageUrl,
      package: updatedPackage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a package
router.put('/:id', async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a package
router.delete('/:id', async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ message: 'Package removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;