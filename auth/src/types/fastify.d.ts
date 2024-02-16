export {}; // Make an import or export to turn the file into a module augmentation only

declare module 'fastify' {
  interface FastifyRequest {
    user?: string;
  }
}
