import { createRoute } from "honox/factory";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const ToggleTodoRouteSchema = z.object({ id: z.string() })

export const POST = createRoute(zValidator("param", ToggleTodoRouteSchema), async (c) => {
  const { id: idParam } = c.req.valid("param")
  const id = Number(idParam);

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
