/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from "@app/data-source/data-source";

export class Animal {

    constructor(
        public id: number,
        public nickname: string,
        public kind: string,
        public problem: string,
    ) {}

    public static async getById(entityId: number): Promise<Animal> {
        const query = 'SELECT * FROM public."animal" WHERE public."animal".id = $1';
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No entity with such id found');
        }
        const { id, nickname, kind, problem } = rows[0];
        return new Animal(id, nickname, kind, problem);
    }

    public static async getAll(): Promise<Animal[]> {
        const query = 'SELECT * FROM public."animal"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { id, nickname, kind, problem } = row;
            return new Animal(id, nickname, kind, problem);
        });
    } 

    public static async create(nickname: string, kind: string, problem: string): Promise<Animal> {
        const query = `INSERT INTO public."animal" (nickname, kind, problem) 
                        VALUES ($1, $2, $3) RETURNING id;`;
        const { rows } = await DataSource.getPool().query(query, [nickname, kind, problem]);
        const { id } = rows[0];
        return new Animal(id, nickname, kind, problem);
    }

    public static async update(animal: Animal): Promise<void> {
        const query = `UPDATE public."animal" 
                        SET nickname = $2, kind = $3, problem = $4
                        WHERE public."animal".id = $1`;
        const { id, nickname, kind, problem } = animal;
        const { rowCount } = await DataSource.getPool().query(query, [id, nickname, kind, problem]);
        if(!rowCount) {
            throw new Error('No entity with such id found');
        }
    }


    public static async delete(id: number): Promise<void> {
        const query = `DELETE FROM public."animal" WHERE public."animal".id = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [id]);
        if(!rowCount) {
            throw new Error('No entity with such id found');
        }
    }

    public static async generate(amount: number): Promise<void> {
        const query = `INSERT INTO public."animal" (nickname, kind, problem)
                       SELECT 
                             LEFT(MD5(seq::text), 10),
                             LEFT(MD5(RANDOM()::text), 10),
                             LEFT(MD5(RANDOM()::text), 10)
                             FROM GENERATE_SERIES(1, $1) seq`;
        console.time('animals')
        await DataSource.getPool().query(query, [amount]);
        console.timeEnd('animals')
    }
}