const { PrismaClient } = require("@prisma/client");


const  db = new PrismaClient();


async function main () {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous People"},
                { name: "Movies & TV"},
                { name: "Musicians"},
                { name: "Games"},
                { name: "Animal"},
                { name: "Philosophy"},
                { name: "Scientists"},
                { name: "Athletes"},
            ]
        })

    } catch (error) {
        console.error ("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
    
};

main();