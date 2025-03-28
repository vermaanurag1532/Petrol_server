import express from 'express';
import PetrolPumpController from '../controller/PetrolPump/petrolPump.controller.js';
import PetrolPumpDetailController from '../controller/PetrolPump/detail.controller.js'

const PetrolPumpRouter = express.Router();

PetrolPumpRouter.get('/details', PetrolPumpDetailController.getAllDetails);
PetrolPumpRouter.get('/details/:petrolPumpID', PetrolPumpDetailController.getDetailsByPetrolPumpID);
PetrolPumpRouter.get('/details/:petrolPumpID/:petrolPumpNumber', PetrolPumpDetailController.getDetailsByPetrolPumpIDAndNumber);
PetrolPumpRouter.get('/details/:petrolPumpID/:petrolPumpNumber/:vehicleID', PetrolPumpDetailController.getDetailByPetrolPumpIDNumberAndVehicleID);
PetrolPumpRouter.post('/details/', PetrolPumpDetailController.addDetail);
PetrolPumpRouter.put('/details/:petrolPumpID/vehicle/:vehicleID', PetrolPumpDetailController.updateDetailByPetrolPumpIDAndVehicleID);
PetrolPumpRouter.delete('/details/:petrolPumpID/:petrolPumpNumber/:vehicleID', PetrolPumpDetailController.deleteDetail);

PetrolPumpRouter.post('/', PetrolPumpController.createPetrolPump); 
PetrolPumpRouter.get('/', PetrolPumpController.getAllPetrolPumps); 
PetrolPumpRouter.get('/:id', PetrolPumpController.getPetrolPumpById); 
PetrolPumpRouter.put('/:id', PetrolPumpController.updatePetrolPump); 
PetrolPumpRouter.delete('/:id', PetrolPumpController.deletePetrolPumpById); 

export default PetrolPumpRouter;
