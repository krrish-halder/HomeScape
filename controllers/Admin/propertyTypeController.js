const PropertyType = require('../../models/PropertyType');

exports.getAllPropertyTypes = async (req, res) => {
    try {
        const propertyTypes = await PropertyType.find();
        res.status(200).json(propertyTypes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.addPropertyType = async (req, res) => {
    const { property_type_name } = req.body;

    try {
        const existingPropertyType = await PropertyType.findOne({ property_type_name });
        if (existingPropertyType) {
            return res.status(400).json({ message: 'Property type already exists' });
        }

        const newPropertyType = new PropertyType({ property_type_name });
        await newPropertyType.save();
        res.status(201).json({ message: 'Property type added successfully', propertyType: newPropertyType });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updatePropertyType = async (req, res) => {
    const { property_type_name } = req.body;
    const { id } = req.params;

    try {
        const propertyType = await PropertyType.findById(id);

        if (!propertyType) {
            return res.status(404).json({ message: 'Property type not found' });
        }

        propertyType.property_type_name = property_type_name;
        await propertyType.save();
        res.status(200).json({ message: 'Property type updated successfully', propertyType });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.deletePropertyType = async (req, res) => {
    const { id } = req.params;

    try {
        const propertyType = await PropertyType.findById(id);
        if (!propertyType) {
            return res.status(404).json({ message: 'Property type not found' });
        }
        await PropertyType.deleteOne({ _id: id });
        res.status(200).json({ message: 'Property type deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}