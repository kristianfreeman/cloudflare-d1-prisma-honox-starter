import { createRoute } from "honox/factory";

export const POST = createRoute(async (c) => {
  await c.get("prisma").todo.deleteMany({
    where: {
      completed: true
    },
  });

  return c.redirect("/");
});
