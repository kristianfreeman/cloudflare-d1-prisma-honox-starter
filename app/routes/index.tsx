import { createRoute } from "honox/factory";
import { zValidator } from "@hono/zod-validator";

import { TodoCreateInputSchema } from "@/generated/zod";

export default createRoute(async (c) => {
  const todo = await c.get("prisma").todo.findMany();

  return c.render(
    <>
      <h1>Tracking {todo.length} todos</h1>

      <ul>
        {todo.map((todo) => (
          <li>
            <form method="POST" action={`/todo/${todo.id}/toggle`}>
              <input
                type="checkbox"
                name="completed"
                checked={todo.completed}
                onChange="this.form.submit()"
              />{" "}
              {todo.description}
            </form>
          </li>
        ))}
      </ul>

      <form method="post">
        <input type="text" name="description" />
        <button type="submit">Create</button>
      </form>
    </>,
  );
});

export const POST = createRoute(
  zValidator("form", TodoCreateInputSchema),
  async (c) => {
    const data = c.req.valid("form");

    await c.get("prisma").todo.create({
      data,
    });

    return c.redirect("/");
  },
);
