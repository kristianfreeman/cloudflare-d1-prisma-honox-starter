import { createRoute } from "honox/factory";

export const POST = createRoute(async (c) => {
  const id = Number(c.req.param("id"));

  const todo = await c.get("prisma").todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return c.text("Todo not found", 404)
  }

  await c.get("prisma").todo.update({
    where: {
      id,
    },
    data: {
      completed: !todo.completed,
    },
  });

  return c.redirect("/");
});
