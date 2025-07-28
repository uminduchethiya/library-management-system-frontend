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

// Confirm Alert (returns true/false)

export const showDeleteConfirmAlert = async (): Promise<boolean> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#830823",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
  
    return result.isConfirmed;
  };