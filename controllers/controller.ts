import { View } from "@app/view/view";
import { Animal } from "@models/animal";
import { Hospital } from "@models/hospital";
import { Doctor } from "@models/doctor";
import { AnimalDoctor, AnimalDoctorFieldName } from "@models/animal-doctor";

export class Controller {

    public async init(): Promise<void> {
        let currentMenuItem = -1;

        while (currentMenuItem !== 0) {
            View.printMainMenu();
            currentMenuItem = View.readInteger("Enter your choice: ");

            switch(currentMenuItem) {
                case 1: {
                    await this.getAllEntities();
                    break;
                }
                case 2: {
                    await this.getEntityById();
                    break;
                }
                case 3: {
                    await this.createEntity();
                    break;
                }
                case 4: {
                    await this.updateEntity();
                    break;
                }
                case 5: {
                    await this.deleteEntity();
                    break;
                }
                case 6: {
                    await this.workWithManyToManyConnection();
                    break;
                }
                case 7: {
                    await this.search1();
                    break;
                }
                case 8: {
                    await this.search2();
                    break;
                }
                case 9: {
                    await this.search3();
                    break;
                }
                case 10: {
                    await this.generateRandomEntity();
                    break;
                }
            }
        }
    }

    private async getAllEntities(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    View.printEntities(await Animal.getAll());
                    break;
                }
                case 2: {
                    View.printEntities(await Hospital.getAll());
                    break;
                }
                case 3: {
                    View.printMapEntities(await Doctor.getAll());
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async getEntityById(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch(option) {
                case 1: {
                    View.printEntities([await Animal.getById(id)]);
                    break;
                }
                case 2: {
                    View.printEntities([await Hospital.getById(id)]);
                    break;
                }
                case 3: {
                   const [ doctor, hospital ] = await Doctor.getById(id)
                    View.printEntities(doctor);
                    View.printEntities(hospital);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async createEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    const nickname = View.readString('Enter nickname of the animal: ');
                    const kind = View.readString('Enter kind of the animal: ');
                    const problem = View.readString('Enter problem of the animal: ');
                    View.printEntities([await Animal.create(nickname, kind, problem)]);
                    break;
                }
                case 2: {
                    const address = View.readString('Enter address of the clinic: ');
                    const averageScore = View.readInteger('Enter number of average score in the clinic: ');
                    View.printEntities([await Hospital.create(address, averageScore)]);
                    break;
                }
                case 3: {
                    const hospitalId = View.readInteger('Enter id of the hospital associated with doctor: ');
                    await Hospital.getById(hospitalId);
                    const name = View.readString('Enter the name of the doctor: ');
                    const surname = View.readString('Enter the surname of the doctor: ');
                    const specialization = View.readString('Enter the specialization of the doctor: ');
                    const birthdate = View.readDate('Enter date of birth of the animal in format YYYY-MM-DD: ');
                    View.printEntities([await Doctor.create(hospitalId, name, surname, specialization, birthdate)]);
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async updateEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch(option) {
                case 1: {
                    const nickname = View.readString('Enter nickname of the animal: ');
                    const kind = View.readString('Enter kind of the animal: ');
                    const problem = View.readString('Enter problem of the animal: ');
                    await Animal.update({id, nickname, kind, problem});
                    break;
                }
                case 2: {
                    const address = View.readString('Enter address of the clinic: ');
                    const averageScore = View.readInteger('Enter number of average score in the clinic: ');
                    await Hospital.update({id, address, averageScore});
                    break;
                }
                case 3: {
                    const hospitalId = View.readInteger('Enter id of the hospital associated with doctor: ');
                    await Hospital.getById(hospitalId);
                    const name = View.readString('Enter the name of the doctor: ');
                    const surname = View.readString('Enter the surname of the doctor: ');
                    const specialization = View.readString('Enter the specialization of the doctor: ');
                    const birthdate = View.readDate('Enter date of birth of the animal in format YYYY-MM-DD: ');
                    await Doctor.update({id, hospitalId, name, surname, specialization, birthdate});
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async deleteEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const id = View.readInteger("Enter id of the entity: ");

            switch(option) {
                case 1: {
                    await Animal.delete(id);
                    View.printLine("Success");
                    break;
                }
                case 2: {
                    await Hospital.delete(id);
                    View.printLine("Success");
                    break;
                }
                case 3: {
                    await Doctor.delete(id);
                    View.printLine("Success");
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async search2(): Promise<void> {
        try{
            const text = View.readString("Enter information to search for it: ");
            View.printEntities(await Doctor.search2(text));
        } catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        View.pressToReturn();
    }

    private async search1(): Promise<void> {
        try{
            const name = View.readString("Enter name of doctors you wish to look for: ");
            const speciality = View.readString("Enter specialization of doctors you wish to look for: ");
            const minAverageScore = View.readInteger("Enter min average score of clinic this doctor works in: ");
            const maxAverageScore = View.readInteger("Enter max average score of clinic this doctor works in: ");
            View.printEntities(await Doctor.search1(name, speciality, minAverageScore, maxAverageScore));
        } catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        View.pressToReturn();
    }

    private async search3(): Promise<void> {
        try {
            const name = View.readString("Enter name of doctors you wish to look for: ");
            const surname = View.readString('Enter the surname of the doctor: ');
            const problem = View.readString('Enter problem of the animal: ');
            View.printEntities(await Doctor.search3(name, surname, problem))
        } catch(error) { 
            View.printLine(`Error: ${error.message}`);
        }
        View.pressToReturn();
    }

    private async generateRandomEntity(): Promise<void> {
        try {
            View.printOptionsMenu();
            const option = View.readInteger("Enter your choice: ");
            const amount = View.readInteger("Enter amount of data: ");

            switch(option) {
                case 1: {
                    await Animal.generate(amount);
                    View.printLine("Success");
                    break;
                }
                case 2: {
                    await Hospital.generate(amount);
                    View.printLine("Success");
                    break;
                }
                case 3: {
                    await Doctor.generate(amount);
                    View.printLine("Success")
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }

    private async workWithManyToManyConnection(): Promise<void> {
        try {
            View.printManyToManyMenu();
            const option = View.readInteger("Enter your choice: ");

            switch(option) {
                case 1: {
                    View.printEntities(await AnimalDoctor.getAll());
                    break;
                }
                case 2: {
                    const doctorId = View.readInteger("Enter doctor id: ");
                    View.printEntities(await AnimalDoctor.getById(doctorId, AnimalDoctorFieldName.DoctorId));
                    break;
                }
                case 3: {
                    const animalId = View.readInteger("Enter animal id: ");
                    View.printEntities(await AnimalDoctor.getById(animalId, AnimalDoctorFieldName.AnimalId));
                    break;
                }
                case 4: {
                    const animalId = View.readInteger("Enter animal id: ");
                    await Animal.getById(animalId);
                    const doctorId = View.readInteger("Enter doctor id: ");
                    await Doctor.getById(doctorId);
                    View.printEntities([await AnimalDoctor.create(animalId, doctorId)]);
                    break;
                }
                case 5: {
                    const animalId = View.readInteger("Enter animal id: ");
                    const doctorId = View.readInteger("Enter doctor id: ");
                    await AnimalDoctor.deleteOne(animalId, doctorId);
                    View.printLine("Success");
                    break;
                }
                case 6: {
                    const amount = View.readInteger("Enter amount of data: ");
                    await AnimalDoctor.generate(amount);
                    View.printLine("Success");
                    break;
                }
                default: {
                    View.printLine("Wrong choice");
                }
            }
        }
        catch(error) {
            View.printLine(`Error: ${error.message}`);
        }
        
        View.pressToReturn();
    }
}