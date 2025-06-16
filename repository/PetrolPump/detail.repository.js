import db from '../../db/connection.js';

class PetrolPumpDetailRepository {
    async getAll() {
        const query = `
            SELECT * FROM \`Petrol Pump Detail\` 
            ORDER BY Date DESC, EnteringTime DESC
        `;
        const [rows] = await db.promise().query(query);
        return rows;
    }
    
    async getByPetrolPumpID(petrolPumpID) {
        const query = `
            SELECT * FROM \`Petrol Pump Detail\` 
            WHERE petrolPumpID = ?
            ORDER BY Date DESC, EnteringTime DESC
        `;
        const [rows] = await db.promise().query(query, [petrolPumpID]);
        return rows;
    }
    
    async getByPetrolPumpIDAndNumber(petrolPumpID, petrolPumpNumber) {
        const query = `
            SELECT * FROM \`Petrol Pump Detail\` 
            WHERE petrolPumpID = ? AND PetrolPumpNumber = ?
            ORDER BY Date DESC, EnteringTime DESC
        `;
        const [rows] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber]);
        return rows;
    }
    
    async getByPetrolPumpIDNumberAndVehicleID(petrolPumpID, petrolPumpNumber, vehicleID) {
        const query = `
            SELECT * FROM \`Petrol Pump Detail\` 
            WHERE petrolPumpID = ? AND PetrolPumpNumber = ? AND VehicleID = ?
            ORDER BY Date DESC, EnteringTime DESC
        `;
        const [rows] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber, vehicleID]);
        return rows[0] || null;
    }    

    async add(petrolPumpDetail) {
        // Generate the custom VehicleID
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const currentTime = `${hours}${minutes}${seconds}`;
        
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const currentDate = `${year}${month}${day}`;
        
        // Generate the new VehicleID
        const generatedVehicleID = `${currentTime}-${currentDate}-${petrolPumpDetail.VehicleID}`;
        
        // Create the complete record with generated ID
        const completeRecord = {
            ...petrolPumpDetail,
            VehicleID: generatedVehicleID
        };

        const query = 'INSERT INTO `Petrol Pump Detail` SET ?';
        const [result] = await db.promise().query(query, [completeRecord]);
        return {
            insertId: result.insertId,
            generatedVehicleID: generatedVehicleID
        };
    }

    async updateByPetrolPumpIDAndVehicleID(petrolPumpID, vehicleID, petrolPumpDetail) {
        const query = 'UPDATE `Petrol Pump Detail` SET ? WHERE petrolPumpID = ? AND VehicleID = ?';
        const [result] = await db.promise().query(query, [petrolPumpDetail, petrolPumpID, vehicleID]);
        return result.affectedRows > 0;
    }

    async delete(petrolPumpID, petrolPumpNumber, vehicleID) {
        const query = 'DELETE FROM `Petrol Pump Detail` WHERE petrolPumpID = ? AND PetrolPumpNumber = ? AND VehicleID = ?';
        const [result] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber, vehicleID]);
        return result.affectedRows > 0;
    }
}

export default new PetrolPumpDetailRepository();