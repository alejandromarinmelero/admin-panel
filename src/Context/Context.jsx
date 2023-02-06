import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Peticion } from "../utils/peticion";
export const NewContext = createContext();

const Context = ({ children }) => {
  //////////////////// LOGIN Y AUTENTICACION DE USUARIOS /////////////////////////

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [checkNotes, setCheckNotes] = useState(0);

  // Chequear si el usuario está o no logueado
  useEffect(() => {
    const checkUserLoged = async () => {
      const checkStorage = localStorage.getItem("user");
      const userInStorage = JSON.parse(checkStorage);
      if (userInStorage) {
        try {
          const getAuthenticatedUser = await fetch(
            `http://localhost:3900/api/users/profile/${userInStorage.userLogedId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: userInStorage.token,
              },
            }
          );
          const dataLogin = await getAuthenticatedUser.json();
          const userLoged = dataLogin.authenticatedUser;
          if (userLoged) {
            if (!isAuthenticated) {
              setIsAuthenticated(true);
            }
            const userToSet = {
              date: new Date().toLocaleString(),
              ...userLoged,
            };
            setUser(userToSet);
          }
        } catch (error) {
          console.log(`Se produjo un error: ${error}`);
          throw new Error("no se pudo realizar la petición");
        }
      }
    };
    checkUserLoged();
  }, [isAuthenticated, checkNotes]);

  //Login

  const login = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);

    let objetoCompleto = {};

    for (const [name, value] of formData) {
      objetoCompleto[name] = value;
    }

    if (
      objetoCompleto.username === "" ||
      objetoCompleto.email === "" ||
      objetoCompleto.password === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "You must complete the login form",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Close session",
      });
    } else {
      try {
        const { data } = await Peticion(
          "http://localhost:3900/api/users/login",
          "POST",
          objetoCompleto
        );
        if (data.code === "001") {
          Swal.fire({
            icon: "error",
            title: "Fatal error",
            text: `Conection refused`,
            confirmButtonText: "Ok!",
          });
        } else if (data.code === "002") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `el usuario no existe`,
            confirmButtonText: "Ok!",
          });
        } else if (data.code === "003") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Invalid password`,
            confirmButtonText: "Ok!",
          });
        } else {
          const userLogedId = data.user.user._id;
          const generatedToken = data.user.token;
          if (userLogedId) {
            const userToLocalStorage = {
              userLogedId: userLogedId,
              token: generatedToken,
            };
            localStorage.setItem("user", JSON.stringify(userToLocalStorage));
            setIsAuthenticated(true);
            setUser(data.user.user);
            form.reset();
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2500,
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully!!",
            });
          }
        }
      } catch (error) {
        console.log(`Se produjo un error: ${error}`);
        throw new Error("No se pudo realizar la petición");
      }
    }
  };

  //Logout

  const logout = () => {
    Swal.fire({
      icon: "warning",
      title: "Close session",
      text: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Close session",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        const userSession = localStorage.getItem("user");
        if (userSession === null) {
          setIsAuthenticated(false);
          setUser({});
        }
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
        });
        Toast.fire({
          icon: "success",
          title: "see you soon! :)",
        });
      }
    });
  };

  // Edit Profile

  const editProfile = (e) => {
    const form = e.target;

    const formData = new FormData(form);

    let editedUser = {};

    for (const [name, value] of formData) {
      editedUser[name] = value;
    }

    editedUser = { _id: user._id, ...editedUser };

    Swal.fire({
      title: "Do you want to update your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const editUserProfile = await Peticion(
            `http://localhost:3900/api/users/editar-usuario/${user._id}`,
            "PUT",
            editedUser
          );
          if (editUserProfile) {
            if (
              editedUser.username !== user.username ||
              editedUser.password !== user.password ||
              editedUser.email !== user.email
            ) {
              localStorage.clear();
              setIsAuthenticated(false);
              Swal.fire({
                title:
                  "You have modified your access data. Please re-enter them to continue",
                icon: "info",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok!",
              });
            } else {
              Swal.fire("Your profile has been edited.", "success");
            }
          }
        } catch (error) {
          console.log(error);
          throw new Error("no se pudo realizar la petición");
        }
      }
    });
  };

  // Eliminar cuenta
  const deleteAccount = async (username, id) => {
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputValidator: (value) => {
        if (!value) {
          return "Debes introducir tu contraseña para eliminar la cuenta";
        }
      },
    });

    if (password) {
      const passwordToSend = {
        password: password,
      };
      Swal.fire({
        icon: "warning",
        title: "Delete Account",
        text: `${username}, you are going to delete yor account. Are you sure?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete account",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const deleteUser = await fetch(
              `http://localhost:3900/api/users/eliminar-usuario/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(passwordToSend),
              }
            );
            const response = await deleteUser.json();
            const status = response.status;
            if (status === "error") {
              Swal.fire({
                icon: "error",
                title: "Invalid password",
                confirmButtonText: "Ok!",
              });
            } else {
              localStorage.clear();
              setIsAuthenticated(false);
              setUser({});
              Swal.fire({
                icon: "success",
                title: "Account deleted",
              });
            }
          } catch (error) {
            // throw new Error(`Ha ocurrido un error: ${error}`);
            alert("La contraseña no coincide" + error);
          }
        }
      });
    }
  };

  ///////////////////////////// Lógica notas de usuario /////////////////////////////////

  const [notes, setNotes] = useState([]);
  const [notesFound, setNotesFound] = useState([]);

  const [noteToEdit, setNoteToEdit] = useState({});

  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);

  const handleAddNote = () => {
    if (showAddNote) {
      setShowAddNote(false);
    } else {
      setShowAddNote(true);
    }
  };

  const handleEditNote = (note) => {
    if (showEditNote) {
      setShowEditNote(false);
    } else {
      setNoteToEdit(note);
      setShowEditNote(true);
    }
  };

  // Listar notas
  useEffect(() => {
    if (isAuthenticated) {
      const getNotes = async () => {
        try {
          const { data } = await Peticion(
            `http://localhost:3900/api/notes/listar-notas/${user._id}`,
            "GET"
          );
          setNotes(data.userFoundNotes);
          setNotesFound(data.userFoundNotes);
        } catch (error) {
          throw new Error(`Ocurrió un error: ${error}`);
        }
      };
      getNotes();
    }
  }, [isAuthenticated, user]);

  const findNote = async (e) => {
    const searchValue = e.target.value;
    let searchNote = notes.filter((note) => note.title.includes(searchValue));
    setNotesFound(searchNote);
  };

  // Eliminar una nota

  const removeNote = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this note`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed && id) {
        let noteId = {
          id: id,
        };
        try {
          const { data } = await Peticion(
            `http://localhost:3900/api/notes/eliminar-una-nota/${user._id}`,
            "PUT",
            noteId
          );
          if (data) {
            setCheckNotes(checkNotes + 1);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2500,
            });
            Toast.fire({
              icon: "success",
              title: "Your post has been deleted!!",
            });
          }
        } catch (error) {
          console.log(error);
          throw new Error("no se pudo realizar la petición");
        }
      }
    });
  };

  // Eliminar todas las notas

  const deleteAll = () => {
    notes.length === 0
      ? Swal.fire({
          text: "There are no notes to delete",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Create your first note",
          cancelButtonText: "ok",
        }).then((result) => {
          if (result.isConfirmed) {
            handleAddNote();
          }
        })
      : Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete All!",
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2500,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              Toast.fire({
                icon: "success",
                title: "Deleting all notes!!",
              }).then(async (result) => {
                if (result) {
                  const { data } = await Peticion(
                    `http://localhost:3900/api/notes/eliminar-notas/${user._id}`,
                    "PUT"
                  );
                  if (data) {
                    setCheckNotes(checkNotes + 1);
                    const Toast = Swal.mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 2500,
                    });
                    Toast.fire({
                      icon: "success",
                      title: "All post has been deleted!!",
                    });
                  }
                }
              });
            } catch (error) {
              console.log(error);
              throw new Error("no se pudo realizar la petición");
            }
          }
        });
  };

  return (
    <NewContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        user,
        setIsAuthenticated,
        editProfile,
        deleteAccount,
        notes,
        notesFound,
        findNote,
        removeNote,
        deleteAll,
        noteToEdit,
        showAddNote,
        setShowAddNote,
        showEditNote,
        setShowEditNote,
        handleAddNote,
        handleEditNote,
        checkNotes,
        setCheckNotes,
      }}
    >
      {children}
    </NewContext.Provider>
  );
};

export default Context;
