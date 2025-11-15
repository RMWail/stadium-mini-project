import swal from 'sweetalert2';


export const confirmAction = async (title, text, icon = 'question') => {
    const result = await swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        popup: "my-swal-popup"
      }
    });
    return result;
  };

  export const showSuccess = async (title, text, icon = 'success') => {
    await swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  export const showError = async (title, text, icon = 'error') => {
    await swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 3500,
    });
  };

  
  export const statusInfo = (s) => {
    switch (s) {
      case 0: return { label: 'On queue', color: '#f59e0b' };
      case -1: return { label: 'Cancelled', color: '#ef4444' };
      case 1: return { label: 'Completed', color: '#10b981' };
      default: return { label: 'Unknown', color: '#6b7280' };
    }
  };