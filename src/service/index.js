import fs from 'fs';
import path from 'path';
import { compare, hash } from 'bcryptjs';

const filePath = path.join(process.cwd(), "src", "data", "users.json");
// database sy data ko magnwane k liye
export function getAll () {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}
// ek ek item ko search karne k liye 
export function getById (id) {
    const data = getAll();
    return data.find(p => p.id === Number(id));
}

export function GetByEmail (email) {
    const data = getAll();
    return data.find(p => p.email.toLowerCase() === email.toLowerCase());
}
// login k liye hai
export async function verifyPassword (hashedPassword, password) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
}
// item or signup account create karne k liye

export async function save (email, password) {
    const found = GetByEmail(email);
    if (found) {
        throw new Error("User already exist.");
    }
    const data = getAll();
    const hashedPassword = await hash(password, 12);
    data.push({
        id: data.length + 1,
        email,
        password :hashedPassword
    });
    fs.writeFileSync(filePath, JSON.stringify(data));
}