"use client";

import Image from "next/image";

import { api } from "~/utils/api";
import PokemonItem from "~/components/pokemonItem";

const container = {
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const Pokemon = () => {
  const { data: pokemon, isLoading, isError } = api.pokemon.getAll.useQuery();

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <section>
        <h1
          className={`text-center transition-all duration-1000 ${
            !isLoading ? " text-blue-300" : " text-blue-900"
          }`}
        >
          All Pokemon
        </h1>
        {isLoading && <div>Pokemon are loading</div>}
        {isError && <div>Failed to get pokemon</div>}

        <div className="flex flex-wrap justify-evenly gap-3 p-5">
          {pokemon?.map((poke, index) => (
            <PokemonItem key={poke.name} poke={poke} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Pokemon;
