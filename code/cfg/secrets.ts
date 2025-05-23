import dotenv from 'dotenv';

dotenv.config({ path: './code/cfg/.env' });

// "!" -> undefined나 null이 아니다. 값이 들어 있다.
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_SECRET = process.env.COOKIE_SECRET!;

export { PORT, JWT_SECRET, COOKIE_SECRET };
