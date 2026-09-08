import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import User from "./models/User.js";
import Property from "./models/Property.js";
import Lead from "./models/Lead.js";

dotenv.config();

await connectDB();

console.log("Clearing old data...");

await User.deleteMany({});
await Property.deleteMany({});
await Lead.deleteMany({});

const password =
  await bcrypt.hash(
    "Password@123",
    12
  );


const users =
  await User.insertMany([
    {
      code: "USR-0001",
      name: "Super Admin",
      email:
        "superadmin@chvapps.com",
      password,
      role: "super-admin",
      status: "Active",
    },

    {
      code: "ADM-001",
      name: "Neha Verma",
      email:
        "neha@chvapps.com",
      password,
      role: "admin",
      region: "Mumbai West",
      status: "Active",
    },

    {
      code: "AGT-001",
      name: "Kabir Shah",
      email:
        "kabir@chvapps.com",
      password,
      role: "agent",
      region: "Mumbai West",
      status: "Verified",
    },

    {
      code: "AGT-002",
      name: "Tanvi Desai",
      email:
        "tanvi@chvapps.com",
      password,
      role: "agent",
      region: "Pune",
      status: "Verified",
    },

    {
      code: "CUS-001",
      name: "Ananya Rao",
      email:
        "ananya@example.com",
      password,
      role: "customer",
      region: "Bengaluru",
      status: "Verified",
    },

    {
      code: "CUS-002",
      name: "Rohit Menon",
      email:
        "rohit@example.com",
      password,
      role: "customer",
      region: "Mumbai West",
      status: "Verified",
    },
  ]);


const agent =
  users.find(
    (user) =>
      user.role === "agent"
  );


const properties =
  await Property.insertMany([
    {
      code: "PRP-2201",
      name:
        "Skyline Residences 14B",
      type: "Apartment",
      bhk: "3 BHK",
      areaSqft: 1840,
      city: "Mumbai",
      locality:
        "Mumbai West",
      price: 34000000,
      priceLabel:
        "₹3.4 Cr",
      status: "Available",
      tag: "Verified",
      verified: true,
      agent: agent._id,
      enquiriesCount: 24,
      visitsCount: 6,
    },

    {
      code: "PRP-2206",
      name:
        "Cyber Heights 19F",
      type: "Apartment",
      bhk: "2 BHK",
      areaSqft: 1180,
      city: "Hyderabad",
      price: 19000000,
      priceLabel:
        "₹1.9 Cr",
      status: "Reserved",
      tag: "Verified",
      verified: true,
      agent: agent._id,
      enquiriesCount: 18,
      visitsCount: 4,
    },

    {
      code: "PRP-2211",
      name:
        "Marine Terrace 8C",
      type: "Apartment",
      bhk: "4 BHK",
      areaSqft: 2610,
      city: "Mumbai",
      locality:
        "Mumbai West",
      price: 72000000,
      priceLabel:
        "₹7.2 Cr",
      status: "Available",
      tag: "New",
      verified: true,
      agent: agent._id,
      enquiriesCount: 31,
      visitsCount: 9,
    },

    {
      code: "PRP-2219",
      name:
        "Orchid Row House 4",
      type: "Villa",
      areaSqft: 3200,
      city: "Pune",
      price: 41000000,
      priceLabel:
        "₹4.1 Cr",
      status: "Draft",
      tag: "Draft",
      agent: agent._id,
    },
  ]);


const customer =
  users.find(
    (user) =>
      user.role === "customer"
  );


await Lead.insertMany([
  {
    code: "LEAD-001",
    name: "Ananya Rao",
    source: "Website",
    score: 92,
    owner: agent._id,
    stage: "Qualified",
    nextAction:
      "Schedule site visit",
    customer: customer._id,
    property:
      properties[0]._id,
  },

  {
    code: "LEAD-002",
    name: "Rohit Menon",
    source: "Referral",
    score: 76,
    owner: agent._id,
    stage: "Contacted",
    nextAction:
      "Follow-up call",
    customer: customer._id,
    property:
      properties[1]._id,
  },
]);


console.log(
  "Database seeded successfully"
);

console.log("");
console.log(
  "Test login accounts:"
);

console.log(
  "Super Admin: superadmin@chvapps.com"
);

console.log(
  "Admin: neha@chvapps.com"
);

console.log(
  "Agent: kabir@chvapps.com"
);

console.log(
  "Customer: ananya@example.com"
);

console.log(
  "Password: Password@123"
);

process.exit(0);
