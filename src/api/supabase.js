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

const camelToSnake = (obj) => {
  const newObj = {};
  for (let key in obj) {
    newObj[camelToSnakeStr(key)] = obj[key];
    // console.log(
    //   `camelToSnake | ${key}: ${obj[key]} | ${camelToSnakeStr(key)}: ${
    //     newObj[camelToSnakeStr(key)]
    //   }`
    // );
  }
  return newObj;
};

const snakeToCamel = (obj) => {
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

  if (error) console.log("signUp error", error.message, error.status);
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

export const selectAllTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("priority", { ascending: false })
    // TODO .order("is_archived")
    .order("start_date", { ascending: false })
    .order("refreshed_at", { ascending: false });

  // TODO remove throw ¿?
  if (error) throw error.message;
  console.log("API selectAllTasks");
  return data.map((elem) => snakeToCamel(elem));
};

export const insertTask = async (fieldValues) => {
  fieldValues.refreshedAt = Date.now();
  console.log("insertTask camelToSnake", camelToSnake(fieldValues));
  const { data, error } = await supabase
    .from("tasks")
    .insert(camelToSnake(fieldValues))
    .select()
    .single();
  if (error) console.log("Insert error", error.message);
  else console.log("Insert data", data);
  return snakeToCamel(data);
};

export const updateTask = async (id, fieldValues) => {
  console.log("updateTask fieldValues", camelToSnake(fieldValues));
  const { error } = await supabase
    .from("tasks")
    .update(camelToSnake(fieldValues))
    .eq("id", id);
  console.log("updateTask", error);
};

export const deleteTask = async (id) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) console.log("deleteTask", error.message);
};

// TODO
// select tareas Horizon paginadas

// TODO
// update tarea completada

// TODO
// delete tarea
