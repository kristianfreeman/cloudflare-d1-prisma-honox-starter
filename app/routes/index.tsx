import { createRoute } from "honox/factory";
import { zValidator } from "@hono/zod-validator";

import { TodoCreateInputSchema } from "@/generated/zod";

export default createRoute(async (c) => {
  const todo = await c.get("prisma").todo.findMany();

  return c.render(
    <>
      <div class="bg-white md:shadow p-4">
        <div class="flex items-center mb-4">
          <h1 class="flex-1 font-bold text-xl">Tracking {todo.length} {todo.length == 1 ? 'task' : 'tasks'}</h1>
          <form method="POST" action={`/todos/clear_completed`}>
            <button class="text-blue-600 hover:underline" type="submit">Clear completed tasks</button>
          </form>
        </div>

        {todo.length == 0 ? <p class="text-gray-600">No tasks yet. Create one below.</p> : null}

        <ul>
          {todo.map((todo) => (
            <li>
              <form method="POST" action={`/todos/${todo.id}/toggle`}>
                <input
                  type="checkbox"
                  name="completed"
                  checked={todo.completed}
                  // @ts-ignore
                  onChange="this.form.submit()"
                />{" "}
                {todo.description}
              </form>
            </li>
          ))}
        </ul>
      </div>

      <div class="rounded bg-white shadow">
        <form class="flex-1 flex space-y-4" method="post">
          <input
            type="text"
            name="description"
            class="p-4 w-full"
            placeholder="📝 Write a new task. Press enter/return to submit"
          />
        </form>
      </div>
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
