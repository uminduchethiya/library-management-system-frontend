import Swal from "sweetalert2";

export const showErrorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonColor: "#830823",
  });
};

export const showSuccessAlert = (message: string) => {
  return Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
