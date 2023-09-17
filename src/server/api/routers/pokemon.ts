import { userAgent } from "next/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getOne: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.pokemon.findFirst({
      where: {
        id: input,
      },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pokemon.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  pokeCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        types: z.string().array(),
        imageUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const pokemon = await ctx.prisma.pokemon.create({
        data: input,
      });
      return pokemon;
    }),
});
