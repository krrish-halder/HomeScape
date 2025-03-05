const Property = require('../../models/Property');
const PropertyType = require('../../models/PropertyType');

// Get all properties with filtering and pagination
exports.getProperties = async (req, res) => {
    try {
        const { state_id, district_id, city_id, page = 1 } = req.query;
        const limit = 12; // Number of properties per page

        const filters = {};
        if (state_id) filters.state_id = state_id;
        if (district_id) filters.district_id = district_id;
        if (city_id) filters.city_id = city_id;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const properties = await Property.find(filters)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const totalProperties = await Property.countDocuments(filters);

        res.json({
            properties,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProperties / limitNumber),
            totalProperties,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch properties', error: error.message });
    }
};

// Get all properties listed by the logged-in user
exports.getUserProperties = async (req, res) => {
    try {

        const userId = req.user._id;
        const userProperties = await Property.find({ user_id: userId });

        res.status(200).json(userProperties);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch user properties',
            error: error.message,
        });
    }
};
// Get property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property details', error: error.message });
    }
}

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            bedrooms,
            square_ft,
            state_id,
            district_id,
            city_id,
            selling_type,
            property_type_id
        } = req.body;

        if (!title || !description || !price || !bedrooms || !square_ft || !state_id || !district_id || !city_id || !selling_type || !property_type_id) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const user_id = req.user._id;

        const property = new Property({
            title,
            description,
            price,
            bedrooms,
            square_ft,
            state_id,
            district_id,
            city_id,
            selling_type,
            property_type_id,
            user_id,
        });

        const savedProperty = await property.save();

        res.status(201).json({
            message: 'Property created successfully.',
            property: savedProperty,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create property', error: error.message });
    }
}

// Update a property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this property' });
        }

        const {
            title,
            description,
            price,
            bedrooms,
            square_ft,
            state_id,
            district_id,
            city_id,
            selling_type,
            property_type_id
        } = req.body;

        if (!title || !description || !price || !bedrooms || !square_ft || !state_id || !district_id || !city_id || !selling_type || !property_type_id) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                price,
                bedrooms,
                square_ft,
                state_id,
                district_id,
                city_id,
                selling_type,
                property_type_id,
            },
            { new: true, runValidators: true }
        );

        res.json({
            message: 'Property updated successfully.',
            property: updatedProperty,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update property', error: error.message });
    }
}

// Delete a property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this property' });
        }

        await property.remove();

        res.json({ message: 'Property deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete property', error: error.message });
    }
}

exports.getPropertyTypes = async (req, res) => {
    try {
        const propertyTypes = await PropertyType.find();
        res.status(200).json(propertyTypes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property types', error: error.message });
    }
}

exports.uploadImages = async (req, res) => {
    try {
        const { propertyId } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const imagePaths = req.files.map((file) => file.path); // Array of file paths

        // Update the property with the uploaded image paths
        const property = await Property.findByIdAndUpdate(
            propertyId,
            { $push: { images: { $each: imagePaths } } },
            { new: true }
        );

        res.status(200).json({
            message: 'Images uploaded successfully',
            property,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload images', error: error.message });
    }
};
