/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from "@app/data-source/data-source";

export enum AnimalDoctorFieldName {
    AnimalId = 'animal_id',
    DoctorId = 'doctor_id'
}

export class AnimalDoctor {

    constructor(
        public animalId: number,
        public doctorId: number,
    ) {}

    public static async getById(entityId: number, fieldName: AnimalDoctorFieldName): Promise<AnimalDoctor[]> {
        const query = `SELECT * FROM public."doctor_has_animal" WHERE public."doctor_has_animal".${fieldName} = $1`;
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No connections with such id found');
        }
        return rows.map((row) => {
            const { animal_id, doctor_id } = row;
            return new AnimalDoctor(animal_id, doctor_id);
        });
    }

    public static async getAll(): Promise<AnimalDoctor[]> {
        const query = 'SELECT * FROM public."doctor_has_animal"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { animal_id, doctor_id } = row;
            return new AnimalDoctor(animal_id, doctor_id);
        });
    } 

    public static async create(animalId: number, doctorId: number): Promise<AnimalDoctor> {
        const query = `INSERT INTO public."doctor_has_animal" (doctor_id, animal_id) 
                        VALUES ($1, $2);`;
        await DataSource.getPool().query(query, [doctorId, animalId]);
        return new AnimalDoctor(animalId, doctorId);
    }

    public static async deleteOne(animalId: number, doctorId: number): Promise<void> {
        const query = `DELETE FROM public."doctor_has_animal" 
                        WHERE public."doctor_has_animal".animal_id = $1 AND public."doctor_has_animal".doctor_id = $2;`;
        const { rowCount } = await DataSource.getPool().query(query, [animalId, doctorId]);
        if(!rowCount) {
            throw new Error('No entities with such ids found');
        }
    }

    public static async generate(amount: number): Promise<void> {
        const query = `INSERT INTO public."doctor_has_animal" (doctor_id, animal_id)
                        WITH expanded AS (
                            SELECT RANDOM(), seq, d.id AS doctor_id, a.id AS animal_id
                            FROM GENERATE_SERIES(1, $1) seq, doctor d, animal a
                        ), shuffled AS (
                            SELECT e.*
                            FROM expanded e
                            INNER JOIN (
                                SELECT ei.seq, MIN(ei.random) FROM expanded ei GROUP BY ei.seq
                            ) em ON (e.seq = em.seq AND e.random = em.min)
                            ORDER BY e.seq
                        )
                        SELECT 
                            s.doctor_id,
                            s.animal_id
                        FROM shuffled s`
        console.time('doctor_has_animal')
        await DataSource.getPool().query(query, [amount]);
        console.timeEnd('doctor_has_animal')
    }
}