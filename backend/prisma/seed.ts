import { PrismaClient, Prisma } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

// create some sample users
const userData: Prisma.UserCreateInput[] = [
  {
    firstName: "Mufasa",
    lastName: "The Great",
    email: "mufasa@hotmail.com",
    role: "USER",
  },
  {
    firstName: "Aisha",
    lastName: "Patel",
    email: "aisha.patel@example.com",
    role: "USER",
  },
  {
    firstName: "Daniel",
    lastName: "Nguyen",
    email: "daniel.nguyen@example.com",
    role: "USER",
  },
  {
    firstName: "Sophia",
    lastName: "Martins",
    email: "sophia.martins@example.com",
    role: "ADMIN",
  },
  {
    firstName: "Malik",
    lastName: "Hassan",
    email: "malik.hassan@example.com",
    role: "USER",
  },
  {
    firstName: "Emily",
    lastName: "Zhao",
    email: "emily.zhao@example.com",
    role: "USER",
  },
  {
    firstName: "Noah",
    lastName: "Williams",
    email: "noah.williams@example.com",
    role: "USER",
  },
  {
    firstName: "Jade",
    lastName: "Singh",
    email: "jade.singh@example.com",
    role: "USER",
  },
  {
    firstName: "Priya",
    lastName: "Desai",
    email: "priya.desai@example.com",
    role: "USER",
  },
  {
    firstName: "Leo",
    lastName: "Kirk",
    email: "leo.kirk@example.com",
    role: "USER",
  },
];

// create some sample events
const eventData: Prisma.EventCreateInput[] = [
  {
    name: "Lion King Sing-Along at TIFF",
    dateTime: new Date("2024-06-15T23:30:00Z"),
    location: "TIFF Bell Lightbox, Toronto",
    mainURL: "https://en.wikipedia.org/wiki/The_Lion_King",
    price: new Prisma.Decimal(18.5),
    status: "ACTIVE",
  },
  {
    name: "Sunrise Yoga on Toronto Islands",
    dateTime: new Date("2024-06-22T10:00:00Z"),
    location: "Ward's Island Beach, Toronto",
    mainURL: "https://en.wikipedia.org/wiki/Toronto_Island_Park",
    price: new Prisma.Decimal(22.0),
    status: "ACTIVE",
  },
  {
    name: "Scarborough Bluffs Photo Walk",
    dateTime: new Date("2024-07-06T14:00:00Z"),
    location: "Bluffer's Park, Scarborough",
    mainURL: "https://en.wikipedia.org/wiki/Scarborough_Bluffs",
    price: new Prisma.Decimal(12.0),
    status: "ACTIVE",
  },
  {
    name: "Mississauga Startup Pitch Night",
    dateTime: new Date("2024-07-18T23:00:00Z"),
    location: "Square One Innovation Hub, Mississauga",
    mainURL: "https://en.wikipedia.org/wiki/Mississauga",
    price: new Prisma.Decimal(8.0),
    status: "ACTIVE",
  },
  {
    name: "Liberty Village Food Truck Rally",
    dateTime: new Date("2024-08-03T20:00:00Z"),
    location: "Liberty Village, Toronto",
    mainURL: "https://en.wikipedia.org/wiki/Liberty_Village",
    price: new Prisma.Decimal(5.0),
    status: "ACTIVE",
  },
  {
    name: "Brampton Cultural Parade",
    dateTime: new Date("2024-08-19T18:00:00Z"),
    location: "Downtown Brampton",
    mainURL: "https://en.wikipedia.org/wiki/Brampton",
    price: new Prisma.Decimal(0),
    status: "ADJOURNED",
  },
  {
    name: "Queen West Indie Concert",
    dateTime: new Date("2024-09-07T01:00:00Z"),
    location: "The Rivoli, Toronto",
    mainURL: "https://en.wikipedia.org/wiki/Queen_Street_West",
    price: new Prisma.Decimal(28.0),
    status: "ACTIVE",
  },
  {
    name: "Ajax Waterfront Cleanup",
    dateTime: new Date("2024-09-21T13:00:00Z"),
    location: "Rotary Park, Ajax",
    mainURL: "https://en.wikipedia.org/wiki/Ajax,_Ontario",
    price: new Prisma.Decimal(0),
    status: "ACTIVE",
  },
  {
    name: "Etobicoke River Trail Run",
    dateTime: new Date("2024-10-05T12:30:00Z"),
    location: "Humber River Trail, Etobicoke",
    mainURL: "https://en.wikipedia.org/wiki/Humber_River_(Ontario)",
    price: new Prisma.Decimal(35.0),
    status: "ACTIVE",
  },
  {
    name: "Downtown Toronto Social Impact Summit",
    dateTime: new Date("2024-10-18T19:00:00Z"),
    location: "MaRS Discovery District, Toronto",
    mainURL: "https://en.wikipedia.org/wiki/MaRS_Discovery_District",
    price: new Prisma.Decimal(60.0),
    status: "ACTIVE",
  },
  {
    name: "Markham Night Market",
    dateTime: new Date("2024-11-01T22:00:00Z"),
    location: "Downtown Markham",
    mainURL: "https://en.wikipedia.org/wiki/Markham,_Ontario",
    price: new Prisma.Decimal(10.0),
    status: "CANCELLED",
  },
  {
    name: "Yorkville Winter Lights Walk",
    dateTime: new Date("2024-12-07T00:30:00Z"),
    location: "Yorkville Village, Toronto",
    mainURL: "https://en.wikipedia.org/wiki/Yorkville,_Toronto",
    price: new Prisma.Decimal(18.0),
    status: "ACTIVE",
  },
];

// create seed script
async function main() {
  console.log(`Start seeding ...`);

  // add events to db first
  const createdEvents = [];
  for (const e of eventData) {
    const createdEvent = await prisma.event.create({
      data: e,
    });
    createdEvents.push(createdEvent.id);
    console.log(`Created new event with id ${createdEvent.id}`);
  }

  // add users to db
  for (const u of userData) {
    const createdUser = await prisma.user.create({
      data: u,
    });

    // for each user, sign them up for a random choice of events
    const eventsAttending = [];
    for (let i = 0; i < createdEvents.length; i++) {
      // randomly select attended events, by having a 20% chance of selecting each one
      if (Math.random() <= 0.2 && eventsAttending.length < 5) {
        eventsAttending.push(
          await prisma.attendance.create({
            data: {
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
              event: {
                connect: {
                  id: createdEvents[i],
                },
              },
            },
          }),
        );
      }
    }
    console.log(`Created user with id: ${createdUser.id}`);
    if (eventsAttending.length > 0) {
      console.log("They are attending the following events:");
      for (const attendance of eventsAttending) {
        console.log(`EventId: ${attendance.eventId}`);
      }
    }
    {
      console.log("They are not signed up for any events.");
    }
  }
  console.log(`Seeding finished.`);
}

// run main seed function
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
