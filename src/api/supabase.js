import { createClient } from "@supabase/supabase-js";

// Aux methods to convert bw camelCase & snake_case

const camelToSnakeStr = (str) => {
  if (str === str.toLowerCase()) return str;
  else return str.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase());
};

const snakeToCamelStr = (str) => {
  if (!str.includes("_")) return str;
  else return str.replace(/_./g, (x) => x[1].toUpperCase());
};

const camelToSnakeObj = (obj) => {
  const newObj = {};
  for (let key in obj) {
    newObj[camelToSnakeStr(key)] = obj[key];
    console.log(
      `camelToSnake | ${key}: ${obj[key]} | ${camelToSnakeStr(key)}: ${
        newObj[camelToSnakeStr(key)]
      }`
    );
  }
  console.log("camelToSnake isComplete", obj.isComplete);
  return newObj;
};

const snakeToCamelObj = (obj) => {
  const newObj = {};
  for (let key in obj) {
    newObj[snakeToCamelStr(key)] = obj[key];
  }
  return newObj;
};

// Database management

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

// Auth

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw `${error.message} (${error.status})`;
  return data.user.id;
};

export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw `${error.message} (${error.status})`;
  return data.user.id;
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw `${error.message} (${error.status})`;
};

// Tasks

export const insertTask = async (task) => {
  const snakeTask = camelToSnakeObj(task);
  const { data, error } = await supabase
    .from("tasks")
    .insert(snakeTask)
    .select()
    .single();
  if (error) throw error.message;
  return data.id;
};

// export const selectLastTaskId = async () => {
//   const { data, error } = await supabase
//     .from("tasks")
//     .select("id")
//     .order("id", { ascending: false })
//     .limit(1)
//     .single();
//   if (error) throw error.message;
//   console.log("selectLastId", data);
//   return data.id;
// };

export const selectTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("priority", { ascending: false })
    .order("is_complete")
    .order("start_date", { ascending: false });
  if (error) throw error.message;

  const camelData = data.map((elem) => {
    return snakeToCamelObj(elem);
  });
  return camelData;
};

export const updateTask = async (task) => {
  console.log("updateTask", task, task.isComplete, typeof task.isComplete);
  // console.log("updateTask.isComplete", task.isComplete, task.id);
  // const snakeTask = camelToSnakeObj(task);
  const { error } = await supabase
    .from("tasks")
    .update(snakeTask)
    .eq("id", task.id);
  // if (error) throw error.message;
};

export const deleteTask = async (id) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error.message;
};

// TODO
// select tareas Horizon paginadas

// TODO
// update tarea completada

// TODO
// delete tarea
