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

// AUTH

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) console.log(error.message, error.status);
};

export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error.message;
  return data.user.id;
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error.message, error.status);
};

// TASKS

export const selectAllTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*");
    // .order("priority", { ascending: false })
    // .order("is_archived")
    // .order("start_date", { ascending: false })
    // .order("refreshed_at", { ascending: false });

  if (error) console.log(error.message, error.status);
  else return data.map((elem) => snakeToCamel(elem));
};

export const insertTask = async (fieldValues) => {
  fieldValues.refreshedAt = Date.now();
  const { data, error } = await supabase
    .from("tasks")
    .insert(camelToSnake(fieldValues))
    .select()
    .single();
  if (error) console.log(error.message, error.status);
  else return snakeToCamel(data);
};

export const updateTask = async (id, fieldValues) => {
  const { error } = await supabase
    .from("tasks")
    .update(camelToSnake(fieldValues))
    .eq("id", id);
    if (error) console.log(error.message, error.status);
};

export const deleteTask = async (id) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) console.log(error.message, error.status);
};
