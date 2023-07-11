import { api } from "~/utils/api";

const Pokemon = () => {
  // const { data: pokemon, isLoading } = api.pokemon.getAll.useQuery();

  const ctx = api.useContext();

  const { mutate, isLoading: pokeLoading } = api.pokemon.pokeCreate.useMutation(
    {
      onSuccess: () => {
        void ctx.pokemon.getAll.invalidate();
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.context;

        if (errorMessage && errorMessage[0]) {
          console.error(errorMessage[0]);
        } else {
          console.error("Failed to add pokemon");
        }
      },
    }
  );

  const uploadPokemon = () => {};

  return (
    <main className=" min-h-screen w-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <section>
        <h1 className="text-center">All Pokemon</h1>
      </section>
    </main>
  );
};

export default Pokemon;
