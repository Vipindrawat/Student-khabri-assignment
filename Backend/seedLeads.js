
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Lead from "./Model/LeadModel.js";

mongoose.connect("mongodb+srv://vipinrawat7500_db_user:fmjIVzaWaRugFqSe@cluster0.stcln2a.mongodb.net/studentkhabri_assignment");


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
    console.log("Connected to MongoDB");

    const total = 500; // number of dummy leads
    const leads = [];
    const statuses = ["New", "Contacted", "Qualified", "Converted", "Lost"];
    const sources = ["Website", "Referral", "Ads", "Cold Call"];

    for (let i = 0; i < total; i++) {
        leads.push({
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email(),
            phone: faker.phone.number(),
            company: faker.company.name(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            assignedTo: `${faker.person.firstName()} ${faker.person.lastName()}`,
        });
    }

    await Lead.insertMany(leads);
    console.log(`${total} dummy leads inserted!`);
    process.exit(0);
});
