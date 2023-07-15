"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAnimate, usePresence } from "framer-motion";
import { Pokemon } from "@prisma/client";

type Props = {
  poke: Pokemon;
  index: number;
};

const PokemonItem = ({ poke, index }: Props) => {
  const [isPresent, safeToRemoce] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      animate(
        scope.current,
        {
          opacity: [0, 1],
          x: [-60, 0],
        },
        { duration: 0.3, delay: 0.2 * index }
      );
    }
  });

  return (
    <div
      ref={scope}
      className={"flex flex-col items-center justify-center text-center"}
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
};

export default PokemonItem;
