import Swal from 'sweetalert2';

const useImageUpload = () => {
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
 

    formData.append('upload_preset', 'tourist_register'); 

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/de0qvoegz/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Swal.fire('Error', 'Image upload failed. Please try again.', 'error');
      return null;
    }
  };

  return { uploadImage };
};

export default useImageUpload;
