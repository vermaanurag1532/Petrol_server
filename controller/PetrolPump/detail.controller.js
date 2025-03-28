import petrolPumpDetailService from '../../service/PetrolPump/detail.service.js';

const petrolPumpDetailController = {
    getAllDetails: async (req, res) => {
        try {
            const details = await petrolPumpDetailService.getAllDetails();
            res.json(details);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDetailsByPetrolPumpID: async (req, res) => {
        try {
            const details = await petrolPumpDetailService.getDetailsByPetrolPumpID(req.params.petrolPumpID);
            res.json(details);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDetailsByPetrolPumpIDAndNumber: async (req, res) => {
        try {
            const { petrolPumpID, petrolPumpNumber } = req.params;
            const details = await petrolPumpDetailService.getDetailsByPetrolPumpIDAndNumber(petrolPumpID, petrolPumpNumber);
            res.json(details);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getDetailByPetrolPumpIDNumberAndVehicleID: async (req, res) => {
        try {
            const { petrolPumpID, petrolPumpNumber, vehicleID } = req.params;
            const detail = await petrolPumpDetailService.getDetailByPetrolPumpIDNumberAndVehicleID(petrolPumpID, petrolPumpNumber, vehicleID);
            if (!detail) {
                return res.status(404).json({ message: 'Record not found' });
            }
            res.json(detail);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addDetail: async (req, res) => {
        try {
            const newDetail = await petrolPumpDetailService.addDetail(req.body);
            res.status(201).json(newDetail);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateDetailByPetrolPumpIDAndVehicleID: async (req, res) => {
        try {
            const { petrolPumpID, vehicleID } = req.params;
            const updated = await petrolPumpDetailService.updateDetailByPetrolPumpIDAndVehicleID(
                petrolPumpID, 
                vehicleID, 
                req.body
            );
            
            if (!updated) {
                return res.status(404).json({ message: 'Record not found or not updated' });
            }
            
            // Return the updated record
            const updatedRecord = await petrolPumpDetailService.getDetailByPetrolPumpIDNumberAndVehicleID(
                petrolPumpID,
                req.body.PetrolPumpNumber || undefined, // Use updated number if provided
                vehicleID
            );
            
            res.json({
                message: 'Record updated successfully',
                data: updatedRecord
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteDetail: async (req, res) => {
        try {
            const { petrolPumpID, petrolPumpNumber, vehicleID } = req.params;
            const deleted = await petrolPumpDetailService.deleteDetail(petrolPumpID, petrolPumpNumber, vehicleID);
            if (!deleted) {
                return res.status(404).json({ message: 'Record not found or not deleted' });
            }
            res.json({ message: 'Record deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export default petrolPumpDetailController;