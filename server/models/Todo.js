const mongoose = require("mongoose");

const Priority = ["low", "medium", "high"];

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
      default: undefined,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: {
        values: Priority,
        message: "Priority must be one of: low, medium, high",
      },
      default: "medium",
    },
    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: undefined,
    },
    dueDate: {
      type: Date,
      default: undefined,
      validate: {
        validator: (value) =>
          value === undefined || !Number.isNaN(value.getTime()),
        message: "dueDate must be a valid date",
      },
    },
    tags: {
      type: [String],
      default: [],
      set: (arr) =>
        Array.isArray(arr)
          ? arr.map((tag) => String(tag).trim()).filter(Boolean)
          : [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

const Todo = mongoose.model("Todo", todoSchema);

const toApiTodo = (doc) => (doc ? doc.toJSON() : null);

const getTodos = async (options) => {
  const {
    offset = 1,
    limit = 10,
    completed,
    priority,
    search,
    category,
    sort,
  } = options;

  const filter = {};
  if (completed !== undefined) filter.completed = completed;
  if (priority !== undefined) filter.priority = priority;
  if (category !== undefined) {
    filter.category = { $regex: category.trim(), $options: "i" };
  }
  if (search) {
    filter.text = { $regex: search.trim(), $options: "i" };
  }

  const total = await Todo.countDocuments({});
  const filtered = await Todo.countDocuments(filter);

  let query = Todo.find(filter);

  if (sort) {
    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    const sortDirection = sort.startsWith("-") ? -1 : 1;
    query = query.sort({ [sortField]: sortDirection });
  }

  const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const safeOffset = Math.max(Number(offset) || 1, 1);
  const skip = (safeOffset - 1) * safeLimit;

  const docs = await query.skip(skip).limit(safeLimit).exec();

  return {
    todos: docs.map(toApiTodo),
    total,
    filtered,
  };
};

const getTodoById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const doc = await Todo.findById(id).exec();
  return toApiTodo(doc);
};

const createTodo = async (input) => {
  const doc = await Todo.create({
    text: input.text,
    description: input.description,
    priority: input.priority,
    category: input.category,
    dueDate: input.dueDate,
    tags: input.tags,
  });
  return toApiTodo(doc);
};

const updateTodo = async (id, input) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const updates = {};
  if (input.text !== undefined) updates.text = input.text;
  if (input.description !== undefined) updates.description = input.description;
  if (input.completed !== undefined) updates.completed = input.completed;
  if (input.priority !== undefined) updates.priority = input.priority;
  if (input.category !== undefined) updates.category = input.category;
  if (input.dueDate !== undefined) updates.dueDate = input.dueDate;
  if (input.tags !== undefined) updates.tags = input.tags;

  const doc = await Todo.findByIdAndUpdate(
    id,
    { $set: updates },
    {
      new: true, 
      runValidators: true, 
      context: "query", 
    },
  ).exec();

  return toApiTodo(doc);
};

const deleteTodo = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  const result = await Todo.findByIdAndDelete(id).exec();
  return result !== null;
};

const getStats = async () => {
  const [total, completed] = await Promise.all([
    Todo.countDocuments({}),
    Todo.countDocuments({ completed: true }),
    Todo.countDocuments({ priority: Priority }),
  ]);

  return {
    total,
    completed,
    pending: total - completed,
    byPriority: { low, medium, high },
  };
};

module.exports = {
  Todo,
  Priority,
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getStats,
};
