import { PrismaClient } from "../src/lib/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // TempImage
/*   const tempImages = [];
  for (let i = 0; i < 5; i++) {
    tempImages.push(
      prisma.tempImage.create({
        data: {
          key: faker.string.uuid(),
          url: faker.internet.url(),
          expireAt: faker.date.future(),
        },
      })
    );
  } */

  // Users
  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push(
      prisma.user.create({
        data: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          emailVerified: faker.datatype.boolean(),
          image: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      })
    );
  }
  const createdUsers = await Promise.all(users);

  // Sessions
  const sessions = [];
  for (const user of createdUsers) {
    sessions.push(
      prisma.session.create({
        data: {
          id: faker.string.uuid(),
          userId: user.id,
          token: faker.string.uuid(),
          expiresAt: faker.date.future(),
          createdAt: new Date(),
          updatedAt: new Date(),
          ipAddress: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
        },
      })
    );
  }

  // Accounts
  const accounts = [];
  for (const user of createdUsers) {
    accounts.push(
      prisma.account.create({
        data: {
          id: faker.string.uuid(),
          accountId: faker.string.uuid(),
          providerId: "google",
          userId: user.id,
          accessToken: faker.string.uuid(),
          refreshToken: faker.string.uuid(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    );
  }

  // Verification
  const verifications = [];
  for (let i = 0; i < 3; i++) {
    verifications.push(
      prisma.verification.create({
        data: {
          id: faker.string.uuid(),
          identifier: faker.internet.email(),
          value: faker.string.alpha(6),
          expiresAt: faker.date.future(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    );
  }

  // Categories
  const categories = [];
  for (let i = 0; i < 3; i++) {
    categories.push(
      prisma.category.create({
        data: {
          description: faker.commerce.department(),
        },
      })
    );
  }
  const createdCategories = await Promise.all(categories);



  // Events & Locations
  for (let i = 0; i < 5; i++) {
    const event = await prisma.event.create({
      data: {
        userId: createdUsers[faker.number.int({ min: 0, max: createdUsers.length - 1 })].id,
        title: faker.commerce.productName(),
        id_category:
          createdCategories[
            faker.number.int({ min: 0, max: createdCategories.length - 1 })
          ].id,
        organizer: faker.person.fullName(),
        age: `${faker.number.int({ min: 18, max: 50 })}+`,
        startAt: faker.date.future(),
        endAt: faker.date.future(),
        description: faker.lorem.paragraph(),
        email: faker.internet.email(),
        image: faker.image.url(),
        phone: faker.phone.number(),
        price: parseFloat(faker.commerce.price()),
        capacity: faker.number.int({ min: 10, max: 500 }),
        website: faker.internet.url(),
      },
    });

    await prisma.eventLocation.create({
      data: {
        eventId: event.id,
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
        address_name: faker.location.streetAddress(),
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        countryCode: faker.location.countryCode(),
        place_id: faker.string.uuid(),
        mapUrl: faker.internet.url(),
        locationNotes: "Ingresso principale",
      },
    });
  }

  await Promise.all([
    ...sessions,
    ...accounts,
    ...verifications,
  ]);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
