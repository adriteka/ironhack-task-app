import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

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

export const insertTask = async (task) => {
  const response = await supabase.from("tasks").insert(task);
  console.log("createTask", response);
  // leer la última tarea insertada para obtener su id
  await getLastTaskId();
};

export const selectLastTaskId = async () => {
  const response = await supabase
    .from("tasks")
    .select("id")
    .order("id", { ascending: false });
  console.log("getLastId", response);
};

export const selectTasks = async () => {
  const response = await supabase
    .from("tasks")
    .select("*")
    .order("priority", { ascending: false })
    .order("start_date", { ascending: false });
  console.log("readTasks", response);
};

// TODO
// select tareas Horizon paginadas

export const updateTask = async (task) => {
  const response = await supabase.from("tasks").update().eq("id", task.id);
  console.log("updateTask", response);
};

// TODO
// update tarea completada

// TODO
// delete tarea
