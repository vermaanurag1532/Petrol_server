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
      LIMIT 1
    `;
    const [rows] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber, vehicleID]);
    return rows[0];
  }

  async add(petrolPumpDetail) {
    // Get current date and time
    const now = new Date();
  
    // Format time as HHMMSS
    const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
  
    // Format date as DDMMYYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    const dateStr = `${day}${month}${year}`;
  
    // Create new VehicleID string
    const newVehicleID = `${timeStr}-${dateStr}-${petrolPumpDetail.VehicleID}`;
  
    // Override the VehicleID with the new one
    petrolPumpDetail.VehicleID = newVehicleID;
  
    const query = 'INSERT INTO `Petrol Pump Detail` SET ?';
    const [result] = await db.promise().query(query, [petrolPumpDetail]);
  
    return { insertId: result.insertId, generatedVehicleID: newVehicleID };
  }
  

  async updateByPetrolPumpIDAndVehicleID(petrolPumpID, vehicleID, fieldsToUpdate) {
    const setClause = Object.keys(fieldsToUpdate)
      .map(key => `\`${key}\` = ?`)
      .join(', ');
    const values = Object.values(fieldsToUpdate);
    values.push(petrolPumpID, vehicleID);

    const query = `
      UPDATE \`Petrol Pump Detail\`
      SET ${setClause}
      WHERE petrolPumpID = ? AND VehicleID = ?
    `;
    const [result] = await db.promise().query(query, values);
    return result.affectedRows > 0;
  }

  async delete(petrolPumpID, petrolPumpNumber, vehicleID) {
    const query = `
      DELETE FROM \`Petrol Pump Detail\`
      WHERE petrolPumpID = ? AND PetrolPumpNumber = ? AND VehicleID = ?
    `;
    const [result] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber, vehicleID]);
    return result.affectedRows > 0;
  }
}

export default new PetrolPumpDetailRepository();
