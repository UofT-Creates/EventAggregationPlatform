import { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // creates a route to display sample data from dev db.
  fastify.get("/", async function (request, reply) {
    // construct a message
    let message = "";
    // Get all users, along with all events they're attending.
    const users = await fastify.prisma.user.findMany({
      include: {
        attendance: {
          include: {
            event: true,
          },
        },
      },
    });

    message += "Here are the retrieved users:\n";
    for (const user of users) {
      message += `User: firstName = ${user.firstName}, lastName = ${user.lastName}, email = ${user.email}\n`;

      for (const attendance of user.attendance) {
        message += `\tAttending event: ${attendance.event.name} @ ${attendance.event.location}\n`;
      }
    }
    return message;
  });
};

export default example;
