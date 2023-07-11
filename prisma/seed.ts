import { prisma } from "../src/server/db";
import fetch from "node-fetch";

async function main() {
  const pokemon = [];

  for (let i = 0; i < 151; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);

    const data: any = await response.json();
    const types = [data.types[0].type.name];

    if (data.types[1]) types.push(data.types[1].type.name);

    pokemon.push({
      name: data.name,
      types,
      imageUrl: data.sprites.other["official-artwork"].front_default,
    });
  }

  // console.log(pokemon);

  await prisma.pokemon.createMany({
    data: pokemon,
  });

  console.log("finished seeding");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
