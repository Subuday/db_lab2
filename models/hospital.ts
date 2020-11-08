/* eslint-disable @typescript-eslint/camelcase */
import { DataSource } from "@app/data-source/data-source";

export class Hospital {
    constructor(
        public id: number,
        public address: string,
        public averageScore: number,
    ) {}

    public static async getById(entityId: number): Promise<Hospital> {
        const query = 'SELECT * FROM public."hospital" WHERE public."hospital".id = $1';
        const { rows } = await DataSource.getPool().query(query, [entityId]);
        if (!rows.length) {
            throw Error('No entity with such id found');
        }
        const { id, address, average_score } = rows[0];
        return new Hospital(id, address, average_score);
    }

    public static async getAll(): Promise<Hospital[]> {
        const query = 'SELECT * FROM public."hospital"';
        const { rows } = await DataSource.getPool().query(query);
        return rows.map((row) => {
            const { id, address, average_score } = row;
            return new Hospital(id, address, average_score);
        });
    } 

    public static async create(address: string, averageScore: number): Promise<Hospital> {
        const query = `INSERT INTO public."hospital" (address, average_score) 
                        VALUES ($1, $2) RETURNING id;`;
        const { rows } = await DataSource.getPool().query(query, [address, averageScore]);
        const { id } = rows[0];
        return new Hospital(id, address, averageScore);
    }

    public static async update(hospital: Hospital): Promise<void> {
        const query = `UPDATE public."hospital" 
                        SET address = $2, average_score = $3
                        WHERE public."hospital".id = $1`;
        const { id, address, averageScore } = hospital;
        const { rowCount } = await DataSource.getPool().query(query, [id, address, averageScore]);
        if(!rowCount) {
            throw new Error('No entity with such id found');
        }
    }

    public static async delete(id: number): Promise<void> {
        const query = `DELETE FROM public."hospital" WHERE public."hospital".id = $1;`;
        const { rowCount } = await DataSource.getPool().query(query, [id]);
        if(!rowCount) {
            throw new Error('No entity with such id found');
        }
    }

    public static async generate(amount: number): Promise<void> {
        const query = `INSERT INTO public."hospital" (address, average_score)
                       SELECT 
                            (LEFT(MD5(seq::text), 10)),
                            (RANDOM()*5)::int
                        FROM GENERATE_SERIES(1, $1) seq`
        console.time('doctors')
        await DataSource.getPool().query(query, [amount]);
        console.timeEnd('doctors')
    }

}