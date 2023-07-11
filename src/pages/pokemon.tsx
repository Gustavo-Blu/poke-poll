import Image from "next/image";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { api } from "~/utils/api";

const Pokemon = () => {
  const [rendered, setRendered] = useState(false);

  const { data: pokemon, isLoading, isError } = api.pokemon.getAll.useQuery();

  useEffect(() => {
    let timer = setTimeout(() => setRendered(true), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
          {pokemon?.map((poke, index) => {
            const duration = index * 1000;
            // console.log(duration);
            return (
              <div
                key={poke.name}
                className={`flex flex-col items-center justify-center text-center transition-all duration-[${duration}ms] ease-in-out ${
                  rendered
                    ? " text-blue-300 opacity-100"
                    : " text-blue-900 opacity-0"
                }`}
              >
                <Image
                  src={poke.imageUrl}
                  alt={`${poke.name} official artwork`}
                  width={80}
                  height={80}
                />
                <p className="w-auto">{poke.name}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Pokemon;
