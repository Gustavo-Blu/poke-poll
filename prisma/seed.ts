import { Prisma, User } from "@prisma/client";
import { prisma } from "../src/server/db";
import fetch from "node-fetch";

const user: Prisma.UserCreateInput[] = [
  {
    name: "Gus",
    email: "gustavoallen92@gmail.com",
    image: "https://media.tenor.com/RtJifRTjOHEAAAAC/dancing-random.gif",
  },
  {
    name: "Johan",
    email: "johan@gmail.com",
    image: "https://i1.sndcdn.com/avatars-000508491087-32hktm-t500x500.jpg",
  },
  {
    name: "Luis",
    email: "luis@gmail.com",
    image:
      "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1000",
  },
  {
    name: "Sabian",
    email: "sabian@gmail.com",
    image:
      "https://thechive.com/wp-content/uploads/2019/12/person-hilariously-photoshops-animals-onto-random-things-xx-photos-25.jpg?attachment_cache_bust=3136487&quality=85&strip=info&w=400",
  },
];

async function main() {
  await prisma.pokemon.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userOnPokemon.deleteMany();

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

  // await prisma.user.createMany({
  //   data: user
  // })

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
