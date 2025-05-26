import { faker } from '@faker-js/faker';
import pkg from 'pg';
const { Pool } = pkg;

// const pool = new Pool({
//     user: 'postgres',
//     host: 'marketplace-db-eu.cxcg6c6kc91u.eu-central-1.rds.amazonaws.com',
//     database: 'postgres',
//     password: 'Aws23aaa',
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// const pool = new Pool({
//     user: 'maraielciu',
//     host: 'localhost',
//     database: 'marketplace_db',
//     password: '',
//     port: 5432,
// });

const pool = new Pool({
    connectionString: 'postgresql://marketdb_owner:npg_cRLwHQjP7lu9@ep-fragrant-salad-a2a5ho74-pooler.eu-central-1.aws.neon.tech/marketdb?sslmode=require',
    ssl: { rejectUnauthorized: false }
});


// const insertProducts = async () => {
//     const client = await pool.connect();
//     try {
//         await client.query('BEGIN');

//         for (let i = 0; i < 100; i++) {
//             const query = `
//                 INSERT INTO products (user_id, name, description, price, category, sub_category, bestseller)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7)
//             `;
//             await client.query(query, [
//                 faker.number.int({ min: 1, max: 3 }),
//                 faker.commerce.productName(),
//                 faker.commerce.productDescription(),
//                 faker.number.float({ min: 10, max: 300 }),
//                 faker.helpers.arrayElement(['Men', 'Women', 'Kids']),
//                 faker.helpers.arrayElement(['Topwear', 'Bottomwear', 'Outerwear']),
//                 faker.datatype.boolean()
//             ]);
//         }

//         await client.query('COMMIT');
//     } catch (err) {
//         await client.query('ROLLBACK');
//         console.error(err);
//     } finally {
//         client.release();
//     }
// };

// insertProducts();

export default pool;
