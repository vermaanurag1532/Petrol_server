import petrolPumpDetailRepository from '../../repository/PetrolPump/detail.repository.js';

class PetrolPumpDetailService {
    async getAllDetails() {
        return await petrolPumpDetailRepository.getAll();
    }

    async getDetailsByPetrolPumpID(petrolPumpID) {
        return await petrolPumpDetailRepository.getByPetrolPumpID(petrolPumpID);
    }

    async getDetailsByPetrolPumpIDAndNumber(petrolPumpID, petrolPumpNumber) {
        return await petrolPumpDetailRepository.getByPetrolPumpIDAndNumber(petrolPumpID, petrolPumpNumber);
    }

    async getDetailByPetrolPumpIDNumberAndVehicleID(petrolPumpID, petrolPumpNumber, vehicleID) {
        return await petrolPumpDetailRepository.getByPetrolPumpIDNumberAndVehicleID(petrolPumpID, petrolPumpNumber, vehicleID);
    }

    async addDetail(petrolPumpDetail) {
        // The VehicleID in petrolPumpDetail will be used as the suffix
        const result = await petrolPumpDetailRepository.add(petrolPumpDetail);
        return {
            ...petrolPumpDetail,
            VehicleID: result.generatedVehicleID,
            id: result.insertId
        };
    }

    async updateDetailByPetrolPumpIDAndVehicleID(petrolPumpID, vehicleID, updateFields) {
        // Check if record exists
        const existingRecords = await petrolPumpDetailRepository.getByPetrolPumpID(petrolPumpID);
        const existing = existingRecords.find(record => record.VehicleID === vehicleID);
        
        if (!existing) {
            throw new Error('Record not found');
        }
        
        // Only update fields that are provided in the request
        const fieldsToUpdate = {};
        Object.keys(updateFields).forEach(key => {
            if (updateFields[key] !== undefined) {
                fieldsToUpdate[key] = updateFields[key];
            }
        });
        
        return await petrolPumpDetailRepository.updateByPetrolPumpIDAndVehicleID(
            petrolPumpID, 
            vehicleID, 
            fieldsToUpdate
        );
    }

    async deleteDetail(petrolPumpID, petrolPumpNumber, vehicleID) {
        // Check if record exists
        const existing = await petrolPumpDetailRepository.getByPetrolPumpIDNumberAndVehicleID(petrolPumpID, petrolPumpNumber, vehicleID);
        if (!existing) {
            throw new Error('Record not found');
        }
        return await petrolPumpDetailRepository.delete(petrolPumpID, petrolPumpNumber, vehicleID);
    }
}

export default new PetrolPumpDetailService();