import { PrismaClient } from "../src/lib/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

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
  const categoryNames = ["Spese fisse", "Alimentazione", "Trasporti"];
  const categories = categoryNames.map((name) =>
    prisma.category.create({
      data: { name },
    })
  );
  const createdCategories = await Promise.all(categories);

  // SubCategories
  const subCategoriesData = [
    { name: "Affitto", category: "Spese fisse" },
    { name: "Mutuo", category: "Spese fisse" },
    { name: "Ristoranti", category: "Alimentazione" },
    { name: "Spesa supermercato", category: "Alimentazione" },
    { name: "Carburante", category: "Trasporti" },
    { name: "Taxi", category: "Trasporti" },
  ];

  const subCategories = [];
  for (const sub of subCategoriesData) {
    const category = createdCategories.find((c) => c.name === sub.category);
    subCategories.push(
      prisma.subCategory.create({
        data: { name: sub.name },
      })
    );
  }
  const createdSubCategories = await Promise.all(subCategories);

  // Currencies
  const currenciesData = [
    { title: "Euro", symbol: "€" },
    { title: "Dollaro USA", symbol: "$" },
    { title: "Sterlina UK", symbol: "£" },
  ];

  const currencies = currenciesData.map((c) =>
    prisma.currency.create({ data: c })
  );
  const createdCurrencies = await Promise.all(currencies);

  // Transactions
  const transactions = [];
  for (const user of createdUsers) {
    for (let i = 0; i < 5; i++) {
      const subCat =
        createdSubCategories[
          faker.number.int({ min: 0, max: createdSubCategories.length - 1 })
        ];
      const currency =
        createdCurrencies[
          faker.number.int({ min: 0, max: createdCurrencies.length - 1 })
        ];
      transactions.push(
        prisma.transaction.create({
          data: {
            id: faker.string.uuid(),
            userId: user.id,
            amount: parseFloat(faker.commerce.price()),
            type: faker.helpers.arrayElement(["INCOME", "EXPENSE"]),
            subcategoryId: subCat.id,
            date: faker.date.recent(),
            note: faker.lorem.sentence(),
            currencyId: currency.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        })
      );
    }
  }

  await Promise.all([
    ...sessions,
    ...accounts,
    ...verifications,
    ...transactions,
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
