import db from '../../db/connection.js';

class PetrolPumpDetailRepository {
  async getAll() {
    const query = 'SELECT * FROM `Petrol Pump Detail`';
    const [rows] = await db.promise().query(query);
    return rows;
  }

  async getByPetrolPumpID(petrolPumpID) {
    const query = 'SELECT * FROM `Petrol Pump Detail` WHERE petrolPumpID = ?';
    const [rows] = await db.promise().query(query, [petrolPumpID]);
    return rows;
  }

  async getByPetrolPumpIDAndNumber(petrolPumpID, petrolPumpNumber) {
    const query = 'SELECT * FROM `Petrol Pump Detail` WHERE petrolPumpID = ? AND petrolPumpNumber = ?';
    const [rows] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber]);
    return rows;
  }

  async getByPetrolPumpIDNumberAndVehicleID(petrolPumpID, petrolPumpNumber, vehicleID) {
    const query = 'SELECT * FROM `Petrol Pump Detail` WHERE petrolPumpID = ? AND petrolPumpNumber = ? AND VehicleID = ?';
    const [rows] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber, vehicleID]);
    return rows[0];
  }

  async add(petrolPumpDetail) {
    const query = 'INSERT INTO `Petrol Pump Detail` SET ?';
    const [result] = await db.promise().query(query, [petrolPumpDetail]);
    return { insertId: result.insertId, generatedVehicleID: petrolPumpDetail.VehicleID };
  }

  async updateByPetrolPumpIDAndVehicleID(petrolPumpID, vehicleID, fieldsToUpdate) {
    let setClause = Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ');
    let values = Object.values(fieldsToUpdate);
    values.push(petrolPumpID, vehicleID);
    const query = `UPDATE \`Petrol Pump Detail\` SET ${setClause} WHERE petrolPumpID = ? AND VehicleID = ?`;
    const [result] = await db.promise().query(query, values);
    return result.affectedRows > 0;
  }

  async delete(petrolPumpID, petrolPumpNumber, vehicleID) {
    const query = 'DELETE FROM `Petrol Pump Detail` WHERE petrolPumpID = ? AND petrolPumpNumber = ? AND VehicleID = ?';
    const [result] = await db.promise().query(query, [petrolPumpID, petrolPumpNumber, vehicleID]);
    return result.affectedRows > 0;
  }
}

export default new PetrolPumpDetailRepository();
