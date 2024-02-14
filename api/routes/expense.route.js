const ExpenseService = require("../service/db.services");
module.exports = async (fastify) => {
  const expenseService = new ExpenseService(fastify);
  fastify.get("/expenses", async (request, reply) => {
    let responseObejct = {};
    try {
      const dailyExpenses = await expenseService.getDailyExpenses();
      const monthlyExpenses = await expenseService.getMonthlyExpenses();
      responseObejct = { dailyExpenses, monthlyExpenses };
      console.log("Get Requested");
      reply.send(responseObejct);
    } catch (err) {
      console.log(err.message);
      reply.status(500).send(err.message);
    }
  });

  fastify.post("/expenses", async (request, reply) => {
    try {
      const dailyExpense = await expenseService.addDailyExpenses(request.body);
      const monthlyExpense = await expenseService.addMonthlyExpenses(
        request.body
      );
      console.log(monthlyExpense);
      const expense = {
        dailyExpenses: dailyExpense.expense,
        monthlyExpenses: monthlyExpense.expenses,
      };
      console.log("POST Requested");
      reply.status(201).send(expense);
    } catch (err) {
      reply.status(500).send(err.message);
    }
  });
};
